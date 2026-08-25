#!/usr/bin/env python3
"""
Build verification test - Runtime regression testing after next.config.js changes
Tests all backend endpoints to ensure no runtime breakage from the build configuration changes
"""

import requests
import json
import time
import sys

BASE_URL = "http://localhost:3000"

def test_forms_working_session():
    """Test POST /api/forms/working-session with valid submission"""
    print("\n=== TEST: POST /api/forms/working-session (valid submission) ===")
    
    url = f"{BASE_URL}/api/forms/working-session"
    payload = {
        "name": "Jane Smith",
        "email": "jane.smith@healthcareclinic.com",
        "organisation": "Healthcare Clinic Group",
        "role": "Practice Manager",
        "region": "United States",
        "systems": "Dentrix, Weave",
        "organisation_website": "",  # honeypot must be empty
        "message": "We are interested in discussing how Rumiq can help us improve our patient engagement and reduce no-shows.",
        "consent": True,
        "startedAt": int(time.time() * 1000) - 3000  # 3 seconds ago
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True and data.get("delivered") == False:
                print("✅ PASS: Valid working-session submission returns 200 {ok:true, delivered:false}")
                return True
            else:
                print(f"❌ FAIL: Unexpected response structure: {data}")
                return False
        else:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred: {e}")
        return False


def test_forms_insights():
    """Test POST /api/forms/insights with valid submission"""
    print("\n=== TEST: POST /api/forms/insights (valid submission) ===")
    
    url = f"{BASE_URL}/api/forms/insights"
    payload = {
        "email": "marketing.director@dentalgroup.com",
        "organisation_website": "",  # honeypot must be empty
        "consent": True,
        "startedAt": int(time.time() * 1000) - 3000  # 3 seconds ago
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True and data.get("delivered") == False:
                print("✅ PASS: Valid insights submission returns 200 {ok:true, delivered:false}")
                return True
            else:
                print(f"❌ FAIL: Unexpected response structure: {data}")
                return False
        else:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred: {e}")
        return False


def test_scorecard():
    """Test POST /api/scorecard with valid submission"""
    print("\n=== TEST: POST /api/scorecard (valid submission with 10 answers) ===")
    
    url = f"{BASE_URL}/api/scorecard"
    payload = {
        "email": "operations@healthsystem.org",
        "consent": True,
        "answers": [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],  # total = 15, should be 'partial' band
        "organisation_website": "",  # honeypot must be empty
        "startedAt": int(time.time() * 1000) - 3000  # 3 seconds ago
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("ok") == True and 
                data.get("delivered") == False and
                "result" in data and
                data["result"].get("total") == 15 and
                data["result"].get("max") == 30 and
                len(data["result"].get("weakest", [])) == 5):
                print("✅ PASS: Valid scorecard submission returns 200 with correct result structure")
                print(f"   Total: {data['result']['total']}, Max: {data['result']['max']}, Band: {data['result']['band']['id']}")
                return True
            else:
                print(f"❌ FAIL: Unexpected response structure: {data}")
                return False
        else:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred: {e}")
        return False


def test_policy_sandbox_verify():
    """Test GET /api/policy-sandbox/verify"""
    print("\n=== TEST: GET /api/policy-sandbox/verify ===")
    
    url = f"{BASE_URL}/api/policy-sandbox/verify"
    
    try:
        response = requests.get(url, timeout=10)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if "evaluations" in data and len(data["evaluations"]) == 72:
                print(f"✅ PASS: Policy sandbox verify returns 200 with 72 evaluations")
                return True
            else:
                print(f"❌ FAIL: Expected 72 evaluations, got {len(data.get('evaluations', []))}")
                return False
        else:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred: {e}")
        return False


def test_opengraph_image():
    """Test GET /opengraph-image (reads brand PNG from disk)"""
    print("\n=== TEST: GET /opengraph-image (filesystem read test) ===")
    
    url = f"{BASE_URL}/opengraph-image"
    
    try:
        response = requests.get(url, timeout=10)
        print(f"Status: {response.status_code}")
        print(f"Content-Type: {response.headers.get('content-type')}")
        print(f"Content-Length: {len(response.content)} bytes")
        
        if (response.status_code == 200 and 
            'image/png' in response.headers.get('content-type', '') and
            len(response.content) > 1000):  # non-trivial size
            print("✅ PASS: OG image returns 200 with image/png and non-trivial body")
            return True
        else:
            print(f"❌ FAIL: Expected 200 with image/png and >1000 bytes")
            return False
    except Exception as e:
        print(f"❌ FAIL: Exception occurred: {e}")
        return False


def test_frontend_routes():
    """Test key frontend routes"""
    print("\n=== TEST: Frontend routes (/, /approach, /insights/the-unattributable-share, /demo) ===")
    
    routes = [
        "/",
        "/approach",
        "/insights/the-unattributable-share",
        "/demo"
    ]
    
    all_passed = True
    for route in routes:
        url = f"{BASE_URL}{route}"
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                print(f"✅ {route}: 200")
            else:
                print(f"❌ {route}: {response.status_code}")
                all_passed = False
        except Exception as e:
            print(f"❌ {route}: Exception - {e}")
            all_passed = False
    
    return all_passed


def main():
    print("=" * 80)
    print("BUILD VERIFICATION - Runtime Regression Testing")
    print("Testing backend endpoints after next.config.js changes")
    print("=" * 80)
    
    results = []
    
    # Test all endpoints
    results.append(("POST /api/forms/working-session", test_forms_working_session()))
    results.append(("POST /api/forms/insights", test_forms_insights()))
    results.append(("POST /api/scorecard", test_scorecard()))
    results.append(("GET /api/policy-sandbox/verify", test_policy_sandbox_verify()))
    results.append(("GET /opengraph-image", test_opengraph_image()))
    results.append(("Frontend routes", test_frontend_routes()))
    
    # Summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n✅ ALL RUNTIME REGRESSION TESTS PASSED")
        return 0
    else:
        print(f"\n❌ {total - passed} TEST(S) FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(main())
