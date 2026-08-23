import { LegalScaffold } from '@/components/rumiq';
import { legalPages } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

const page = legalPages.cookies;

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.description,
  path: '/cookies',
});

export default function CookiesPage() {
  return <LegalScaffold page={page} />;
}
