import { LegalScaffold } from '@/components/rumiq';
import { legalPages } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

const page = legalPages.terms;

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.description,
  path: '/terms',
});

export default function TermsPage() {
  return <LegalScaffold page={page} />;
}
