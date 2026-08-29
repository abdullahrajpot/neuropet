import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/shared";
import { blogPosts } from "@/lib/site-config";
import { BlogSidebar } from "@/app/(public)/blog/page";
import { ServicesNewsletter } from "@/components/services/sections";

/* ─────────────────────────────────────────────
   Full article content per slug
───────────────────────────────────────────── */
const articleContent: Record<string, { intro: string; sections: { heading: string; body: string }[] }> = {
  "understanding-dog-reactivity": {
    intro:
      "Reactivity in dogs is one of the most common concerns we see — and one of the most misunderstood. When a dog lunges, barks, or pulls toward triggers on walks, it often looks like aggression or 'bad behaviour.' In reality, it's usually fear, frustration, or overstimulation expressing itself through the only language available.",
    sections: [
      {
        heading: "Recognising the early signs",
        body: "Early signs include stiff body language, fixating on triggers, whale eye (showing whites of the eyes), and inability to take high-value treats in the presence of the trigger. These signals appear well before the full reaction and represent your best window for intervention. Once your dog crosses threshold, the learning brain shuts down.",
      },
      {
        heading: "Building a management plan",
        body: "Start with distance — stay far enough from triggers that your dog can still orient to you and take treats. Pair sight of the trigger with high-value food rewards consistently. Gradually decrease distance only when your dog remains calm and under threshold at the current distance for multiple sessions.",
      },
      {
        heading: "Counter-conditioning in practice",
        body: "The goal is to change the emotional response — not just suppress the behaviour. Every time the trigger appears, something wonderful happens (food, play, attention). Over hundreds of repetitions, the trigger becomes a predictor of good things rather than a reason to react.",
      },
      {
        heading: "When to seek professional help",
        body: "If reactivity is affecting your daily life, safety, or your dog's quality of life, a behavioural consultation can provide a structured desensitisation and counter-conditioning plan tailored to your dog's specific triggers, history, and household context.",
      },
    ],
  },
  "cat-enrichment-indoors": {
    intro:
      "Indoor cats need mental and physical stimulation just as much as their outdoor counterparts — arguably more, because they can't self-regulate through natural environmental variety. Without appropriate outlets, stress can manifest as over-grooming, redirected aggression, litter box avoidance, or compulsive behaviours.",
    sections: [
      {
        heading: "Vertical space is non-negotiable",
        body: "Cat trees, wall-mounted shelves, and window perches give cats territory and high observation points — both of which are core feline needs. Even a small flat can benefit from one well-placed vertical zone. Cats who have high places to retreat to show measurably lower cortisol levels in multi-cat households.",
      },
      {
        heading: "Predictable interactive play sessions",
        body: "Two 10–15 minute interactive play sessions daily — using wand toys that mimic prey movement — reduce boredom and frustration far more effectively than leaving toys out passively. Vary the movement pattern and allow your cat to 'catch' the prey at the end of each session to avoid frustration.",
      },
      {
        heading: "Scent enrichment and foraging",
        body: "Hide treats in puzzle feeders, toilet roll tubes, or cardboard boxes. Introduce novel scents (silver vine, valerian, catnip) on rotation. Rotating enrichment items weekly maintains novelty without the need for constant new purchases.",
      },
      {
        heading: "Social enrichment considerations",
        body: "Not all cats want human interaction on the owner's schedule. Learn to read consent signals — a slowly blinking cat who approaches is inviting contact; a cat with a tucked tail who moves away is not. Respecting these boundaries builds genuine trust over time.",
      },
    ],
  },
  "puppy-socialisation-window": {
    intro:
      "The primary socialisation period for puppies roughly spans 3 to 14 weeks of age. Experiences during this window shape how your puppy perceives and responds to the world for the rest of their life — making it the single most important developmental phase for long-term behaviour.",
    sections: [
      {
        heading: "What to prioritise",
        body: "Expose your puppy to varied surfaces (grass, gravel, metal, carpet), sounds (traffic, children, appliances), people of different appearances, gentle handling of all body parts, and calm, vaccinated adult dogs. Quality always beats quantity — one genuinely positive experience is worth more than ten neutral or overwhelming ones.",
      },
      {
        heading: "Vaccination and safety",
        body: "Avoid dog parks and unknown dogs until vaccinations are complete. Puppy classes with health-checked participants in clean environments are ideal. Carrying your puppy in areas where unvaccinated dogs may have been is a practical way to continue socialisation while managing disease risk.",
      },
      {
        heading: "Habituation vs socialisation",
        body: "Socialisation means forming positive associations with stimuli. Habituation means simply becoming accustomed to neutral ones. Both matter. A puppy who has been flooded with stimuli without positive associations may appear 'habituated' but can show delayed fear responses as adolescence approaches.",
      },
      {
        heading: "It's never too late",
        body: "While the window is critical, older puppies and adult dogs can still learn and form new associations. The process typically takes longer and requires more structure, but positive reinforcement-based counter-conditioning remains effective at any age with appropriate expectations.",
      },
    ],
  },
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const article = articleContent[slug];

  if (!post || !article) notFound();

  const d = new Date(post.date);
  const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  const fullDate = d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "430px", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          loading="eager"
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(10,15,25,.52) 0%, rgba(10,15,25,.1) 60%)",
        }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: "70px" }}>
          <Container>
            <h1 style={{
              fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
              fontSize: "42px", fontWeight: 600, color: "#fff",
              letterSpacing: ".5px", marginBottom: "22px", lineHeight: 1.2,
              maxWidth: "700px",
            }}>{post.title}</h1>
            <span style={{
              display: "inline-block", background: "#e6266f", color: "#fff",
              padding: "9px 22px", borderRadius: "4px",
              fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
              fontSize: "13px", fontWeight: 600, letterSpacing: ".3px",
            }}>
              NeuroPet &nbsp;›&nbsp; Blog &nbsp;›&nbsp; {post.category}
            </span>
          </Container>
        </div>
      </section>

      {/* ── ARTICLE + SIDEBAR ── */}
      <section style={{ background: "#fff", padding: "70px 0" }}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "60px",
              alignItems: "start",
            }}
            className="max-lg:grid-cols-1"
          >
            {/* ── MAIN ARTICLE ── */}
            <article>
              {/* Date badge + meta row */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "26px" }}>
                {/* Pink date badge */}
                <div style={{
                  background: "#e6266f", color: "#fff", textAlign: "center",
                  padding: "6px 12px", borderRadius: "2px", flexShrink: 0,
                }}>
                  <div style={{
                    fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                    fontSize: "20px", fontWeight: 700, lineHeight: 1,
                  }}>{day}</div>
                  <div style={{
                    fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                    fontSize: "10px", fontWeight: 600, letterSpacing: "1px",
                  }}>{month}</div>
                </div>
                {/* Category + author */}
                <div>
                  <span style={{
                    display: "inline-block",
                    background: "#e6266f", color: "#fff",
                    padding: "3px 12px", borderRadius: "26px",
                    fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                    fontSize: "11px", fontWeight: 600, letterSpacing: ".5px",
                    marginBottom: "4px",
                  }}>{post.category}</span>
                  <div style={{
                    fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                    fontSize: "12.5px", color: "#7a8291",
                  }}>
                    Posted by <span style={{ color: "#1c58a9", fontWeight: 600 }}>🐾 neuropet</span>
                    &nbsp;·&nbsp; {fullDate}
                  </div>
                </div>
              </div>

              {/* Featured image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: "100%", height: "340px", objectFit: "cover",
                  borderRadius: "2px", display: "block", marginBottom: "30px",
                }}
              />

              {/* Article title */}
              <h2 style={{
                fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                fontSize: "26px", fontWeight: 700, color: "#182b49",
                marginBottom: "16px", lineHeight: 1.3,
              }}>{post.title}</h2>

              {/* Intro paragraph */}
              <p style={{
                fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                fontSize: "15px", color: "#7a8291",
                lineHeight: 1.8, marginBottom: "28px",
              }}>{article.intro}</p>

              {/* Sections */}
              {article.sections.map((section) => (
                <div key={section.heading} style={{ marginBottom: "28px" }}>
                  <h3 style={{
                    fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                    fontSize: "18px", fontWeight: 700,
                    color: "#1c58a9", marginBottom: "10px",
                    borderBottom: "1px solid #e4e6ea", paddingBottom: "10px",
                  }}>{section.heading}</h3>
                  <p style={{
                    fontFamily: "var(--font-open-sans,'Open Sans',sans-serif)",
                    fontSize: "14.5px", color: "#7a8291", lineHeight: 1.8,
                  }}>{section.body}</p>
                </div>
              ))}

              {/* CTA */}
              <div style={{
                marginTop: "36px", paddingTop: "28px",
                borderTop: "1px solid #e4e6ea",
                display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
              }}>
                <Link href="/book" style={{
                  display: "inline-block",
                  background: "#1c58a9", color: "#fff",
                  padding: "13px 32px", borderRadius: "26px",
                  fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                  fontWeight: 700, fontSize: "13px", letterSpacing: ".5px",
                  textDecoration: "none",
                }}>BOOK A CONSULTATION</Link>

                <Link href="/blog" style={{
                  fontFamily: "var(--font-poppins,'Poppins',sans-serif)",
                  fontSize: "13px", fontWeight: 700,
                  color: "#1c58a9", textDecoration: "none",
                }}>« Back to Blog</Link>
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <BlogSidebar activeSlug={slug} />
          </div>
        </Container>
      </section>

      <ServicesNewsletter />
    </>
  );
}
