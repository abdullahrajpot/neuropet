import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site-config";

const serviceContent: Record<
  string,
  { title: string; description: string; details: string[] }
> = {
  "dog-behaviour": {
    title: "Dog Behavioural Consultation",
    description:
      "Comprehensive assessment and tailored behaviour modification for dogs of all ages.",
    details: [
      "Reactivity, aggression, and fear-based behaviours",
      "Separation anxiety and destructive behaviour",
      "Multi-dog household dynamics",
      "Home visit or virtual assessment options",
    ],
  },
  "cat-behaviour": {
    title: "Cat Behavioural Consultation",
    description:
      "Specialist support for indoor cats, multi-cat homes, and stress-related issues.",
    details: [
      "Litter box problems and marking",
      "Inter-cat aggression and introduction protocols",
      "Environmental enrichment planning",
      "Anxiety and hiding behaviours",
    ],
  },
  "puppy-training": {
    title: "Puppy Training",
    description:
      "Foundation skills and socialisation during the critical early months.",
    details: [
      "Bite inhibition and gentle play",
      "House training and crate comfort",
      "Socialisation checklists",
      "Basic cues: sit, recall, leave it",
    ],
  },
  "virtual-consultation": {
    title: "Virtual/Online Consultation",
    description:
      "Remote sessions with video review — perfect for follow-ups and busy schedules.",
    details: [
      "Video behaviour assessment",
      "Flexible scheduling across time zones",
      "Recorded session summaries",
      "Ideal for follow-up support",
    ],
  },
  "expert-witness": {
    title: "Pet Behaviour Expert Witness",
    description:
      "Independent expert reports and testimony for legal proceedings.",
    details: [
      "Detailed written behaviour reports",
      "Court-ready documentation",
      "Case review and consultation",
      "Professional standards compliance",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = serviceContent[slug];
  const service = services.find((s) => s.href.endsWith(slug));

  if (!content) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Training & Behaviour"
        title={content.title}
        description={content.description}
      />
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {service && (
              <div className="lg:col-span-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={content.title}
                  className="w-full rounded-card object-cover shadow-card"
                />
              </div>
            )}
            <div className={service ? "lg:col-span-7" : "lg:col-span-12 max-w-3xl"}>
              <h2 className="font-display text-2xl text-primary-900">
                What we cover
              </h2>
              <ul className="mt-6 space-y-3">
                {content.details.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-ink-600"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href="/book">Book this service</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
