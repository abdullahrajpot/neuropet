import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/shared";
import { Calendar, MapPin } from "lucide-react";

const events = [
  {
    title: "Puppy Socialisation Workshop",
    date: "2026-04-18",
    location: "London, UK",
    type: "Workshop",
  },
  {
    title: "Understanding Cat Anxiety — Talk",
    date: "2026-05-09",
    location: "Virtual",
    type: "Webinar",
  },
  {
    title: "Force-Free Training Conference",
    date: "2026-06-14",
    location: "Manchester, UK",
    type: "Speaking",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Workshops & speaking"
        description="Join us at upcoming events — in person and online."
      />
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="space-y-4">
            {events.map((event) => (
              <article
                key={event.title}
                className="flex flex-col gap-4 rounded-card border border-ink-300/50 bg-cream p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                    {event.type}
                  </span>
                  <h2 className="mt-1 font-display text-xl text-primary-900">
                    {event.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" strokeWidth={1.5} />
                      {new Date(event.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" strokeWidth={1.5} />
                      {event.location}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
