import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/shared";

const mediaLogos = ["BBC", "The Guardian", "Podcast Weekly", "Vet Times", "Radio 4"];

export default function MediaSpeakingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media & Speaking"
        title="As seen & heard"
        description="Press features, podcast appearances, and speaking engagements."
      />
      <section className="bg-white py-14 md:py-20">
        <Container>
          <h2 className="font-display text-2xl text-primary-900">In the media</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {mediaLogos.map((name) => (
              <div
                key={name}
                className="rounded-card border border-ink-300/50 bg-cream px-8 py-6 font-label text-sm font-semibold uppercase tracking-wider text-ink-600"
              >
                {name}
              </div>
            ))}
          </div>

          <div id="speaking" className="mt-16">
            <h2 className="font-display text-2xl text-primary-900">
              Speaking topics
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Force-free behaviour modification in clinical practice",
                "Cat welfare in multi-pet households",
                "Expert witness standards in animal behaviour cases",
                "Puppy socialisation — evidence vs. myths",
              ].map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-3 rounded-card bg-primary-100 p-4 text-ink-900"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-600" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
