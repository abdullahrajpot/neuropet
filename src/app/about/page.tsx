import { PageHeader } from "@/components/layout/PageHeader";
import { Container, BlobImage } from "@/components/ui/shared";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Award, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={
          <>
            Dedicated to <em className="not-italic text-primary-700">better</em>{" "}
            bonds
          </>
        }
        description="NeuroPet brings decades of veterinary behaviour expertise to families who want compassionate, evidence-based support."
      />
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <BlobImage
                src="/images/abouttab1.jpg"
                alt="NeuroPet behaviour consultant"
                className="aspect-[4/5] w-full"
              />
            </div>
            <div className="space-y-6 lg:col-span-7">
              <p className="text-lg leading-relaxed text-ink-600">
                Founded on the belief that behaviour problems are solvable with
                patience, science, and the right guidance, NeuroPet works with
                dogs, cats, and their people across the UK and internationally
                via virtual sessions.
              </p>
              <p className="text-ink-600">
                Our approach is force-free and welfare-first. We never recommend
                aversive tools or methods that compromise trust between you and
                your pet.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "Certified behaviourist" },
                  { icon: Award, label: "12+ accreditations" },
                  { icon: BookOpen, label: "Published researcher" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-card border border-ink-300/50 bg-cream p-4 text-center"
                  >
                    <Icon
                      className="mx-auto h-6 w-6 text-accent-600"
                      strokeWidth={1.5}
                    />
                    <p className="mt-2 text-sm font-medium text-primary-900">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <Button href="/book">Book a Consultation</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
