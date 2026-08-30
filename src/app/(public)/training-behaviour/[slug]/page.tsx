import { notFound } from "next/navigation";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";
import { serviceContent } from "@/data/serviceContent";

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

/* ─────────────────────────────────────────────
   Server component — resolves params, calls
   notFound(), then passes data to client UI
───────────────────────────────────────────── */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = serviceContent[slug];

  // notFound() is safe here — this is a server component
  if (!content) notFound();

  return <ServiceDetailClient slug={slug} content={content} />;
}
