import { LegalScaffold } from '@/components/rumiq';
import { legalPages } from '@/content/legal';
import { pageMetadata } from '@/lib/seo';

const page = legalPages.privacy;

export const metadata = pageMetadata({
  title: page.metaTitle,
  description: page.description,
  path: '/privacy',
});

export default function PrivacyPage() {
  return <LegalScaffold page={page} />;
}
