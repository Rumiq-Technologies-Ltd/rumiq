import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/rumiq';
import { RolePage } from '@/components/landing/role-page';
import { landing } from '@/content/landing';
import { roleDetails } from '@/content/landing/careers';
import { roleJsonLd } from '@/lib/landing/structured-data';
import { pageMetadata } from '@/lib/seo';

/* TEMPORARY LANDING PAGE — one page per open role, built from content/landing. */

export function generateStaticParams() {
  return landing.careers.roles.map((role) => ({ slug: role.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = landing.careers.roles.find((item) => item.id === slug);
  if (!role) return {};
  return pageMetadata({
    title: `${role.title} – Islamabad`,
    description: role.summary,
    path: `/careers/${role.id}`,
  });
}

const closesLabel = new Date(`${landing.careers.applicationsClose}T12:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export default async function CareerRolePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = landing.careers.roles.find((item) => item.id === slug);
  const detail = roleDetails[slug];
  if (!role || !detail) notFound();

  return (
    <>
      <JsonLd data={roleJsonLd(role)} />
      <RolePage
        role={role}
        detail={detail}
        otherRoles={landing.careers.roles.filter((item) => item.id !== slug)}
        facts={landing.careers.facts}
        email={landing.careersEmail}
        applicationsNote={landing.careers.applicationsNote}
        closes={closesLabel}
      />
    </>
  );
}
