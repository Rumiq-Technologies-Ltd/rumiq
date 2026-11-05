import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { SourceTextModule, SyntheticModule, createContext } from 'node:vm';

// Exercise the actual route with isolated driver/framework boundaries. No
// production credentials, external writes, or Next server are needed.
async function loadRoute({ rows = [], failFirst = false, delay = 0 } = {}) {
  const state = { connections: 0, closes: 0, writes: [], limit: 0 };
  const context = createContext({
    process: { env: { MONGO_URL: 'mongodb://fixture', DB_NAME: 'fixture', CORS_ORIGINS: 'https://example.test' } },
    console: { error() {} }, Date, setTimeout,
  });
  class MongoClient {
    async connect() {
      state.connections++;
      if (delay) await new Promise(resolve => setTimeout(resolve, delay));
      if (failFirst && state.connections === 1) throw new Error('connection failed');
    }
    async close() { state.closes++; }
    db() {
      return { collection(name) {
        assert.equal(name, 'status_checks');
        return {
          async insertOne(value) { state.writes.push(value); },
          find() { return { limit(value) {
            state.limit = value;
            return { async toArray() { return rows; } };
          } }; },
        };
      } };
    }
  }
  class NextResponse extends Response {
    static json(value, init) {
      return new NextResponse(JSON.stringify(value), { ...init, headers: { 'Content-Type': 'application/json' } });
    }
  }
  const imports = {
    mongodb: { MongoClient }, uuid: { v4: () => 'fixture-id' }, 'next/server': { NextResponse },
  };
  const source = await readFile(new URL('../app/api/[[...path]]/route.js', import.meta.url), 'utf8');
  const module = new SourceTextModule(source, { context });
  await module.link(specifier => {
    const values = imports[specifier];
    return new SyntheticModule(Object.keys(values), function () {
      for (const [name, value] of Object.entries(values)) this.setExport(name, value);
    }, { context });
  });
  await module.evaluate();
  return {
    state,
    call(method, path, body) {
      return module.namespace[method]({ method, async json() { return body; } }, { params: Promise.resolve({ path }) });
    },
    options: () => module.namespace.OPTIONS(),
  };
}

test('root endpoints return their existing payload and CORS without MongoDB', async () => {
  const route = await loadRoute({ failFirst: true });
  for (const path of [[], ['root']]) {
    const response = await route.call('GET', path);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { message: 'Hello World' });
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://example.test');
  }
  assert.equal(route.state.connections, 0);
});

test('unknown paths and unsupported methods return 404 without MongoDB', async () => {
  const route = await loadRoute();
  for (const [method, path] of [['GET', ['scanner']], ['POST', ['root']], ['PUT', ['status']], ['DELETE', ['status']], ['PATCH', ['status']]]) {
    const response = await route.call(method, path);
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error, `Route /${path.join('/')} not found`);
  }
  assert.equal(route.state.connections, 0);
});

test('invalid status input returns 400 before connecting', async () => {
  const route = await loadRoute();
  const response = await route.call('POST', ['status'], {});
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'client_name is required' });
  assert.equal(route.state.connections, 0);
});

test('status reads preserve the row limit and remove MongoDB IDs', async () => {
  const route = await loadRoute({ rows: [{ _id: 'private', id: 'existing', client_name: 'Example' }] });
  const response = await route.call('GET', ['status']);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), [{ id: 'existing', client_name: 'Example' }]);
  assert.equal(route.state.limit, 1000);
  assert.equal(route.state.connections, 1);
});

test('valid status writes preserve the response and insertion', async () => {
  const route = await loadRoute();
  const response = await route.call('POST', ['status'], { client_name: 'Example' });
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.id, 'fixture-id');
  assert.equal(body.client_name, 'Example');
  assert.ok(!Number.isNaN(Date.parse(body.timestamp)));
  assert.equal(route.state.writes.length, 1);
});

test('concurrent status requests share one pending connection', async () => {
  const route = await loadRoute({ delay: 20 });
  const responses = await Promise.all([route.call('GET', ['status']), route.call('GET', ['status'])]);
  assert.deepEqual(responses.map(response => response.status), [200, 200]);
  assert.equal(route.state.connections, 1);
});

test('a failed connection returns 500 and a later request can retry', async () => {
  const route = await loadRoute({ failFirst: true });
  assert.equal((await route.call('GET', ['status'])).status, 500);
  assert.equal((await route.call('GET', ['status'])).status, 200);
  assert.equal(route.state.connections, 2);
  assert.equal(route.state.closes, 1);
});

test('OPTIONS remains database-free and retains CORS headers', async () => {
  const route = await loadRoute();
  const response = await route.options();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Access-Control-Allow-Methods'), 'GET, POST, PUT, DELETE, OPTIONS');
  assert.equal(route.state.connections, 0);
});
