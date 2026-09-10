import { notFound } from "next/navigation";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";
import { serviceDetailContent } from "@/data/serviceDetailContent";

export function generateStaticParams() {
  return Object.keys(serviceDetailContent).map((slug) => ({ slug }));
}

/* ─────────────────────────────────────────────
   Server component — resolves params, calls
   notFound(), then passes data to client UI
───────────────────────────────────────────── */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = serviceDetailContent[slug];

  // notFound() is safe here — this is a server component
  if (!content) notFound();

  return <ServiceDetailClient slug={slug} content={content} />;
}
