import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/shared";
import { services } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

export default function TrainingBehaviourPage() {
  return (
    <>
      <PageHeader
        eyebrow="Training & Behaviour"
        title="Services tailored to your pet"
        description="From puppy foundations to complex behaviour cases — explore our consultation options."
      />
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex gap-6 rounded-card border border-ink-300/50 bg-cream p-6 transition-shadow hover:shadow-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-32 w-32 shrink-0 rounded-2xl object-cover"
                />
                <div>
                  <h2 className="font-display text-2xl text-primary-900 group-hover:text-primary-700">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-600">{service.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-700">
                    Learn more <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
            <Link
              href="/training-behaviour/expert-witness"
              className="group flex flex-col justify-center rounded-card border border-ink-300/50 bg-primary-100 p-8 md:col-span-2"
            >
              <h2 className="font-display text-2xl text-primary-900">
                Pet Behaviour Expert Witness
              </h2>
              <p className="mt-2 max-w-2xl text-ink-600">
                Independent expert reports and court testimony for legal cases
                involving animal behaviour.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700">
                Learn more <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
