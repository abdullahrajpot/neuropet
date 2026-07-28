import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/shared";
import { blogPosts } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

const content: Record<string, string> = {
  "understanding-dog-reactivity": `
Reactivity in dogs is one of the most common concerns we see — and one of the most misunderstood. When a dog lunges, barks, or pulls toward triggers on walks, it often looks like aggression or "bad behaviour." In reality, it's usually fear, frustration, or overstimulation expressing itself.

## Recognising the signs

Early signs include stiff body language, fixating on triggers, whale eye, and inability to take treats. These appear before the full reaction and are your best window for intervention.

## Building a management plan

Start with distance — stay far enough from triggers that your dog can still orient to you. Pair sight of the trigger with high-value rewards. Gradually decrease distance only when your dog remains under threshold.

## When to seek help

If reactivity is affecting your daily life or safety, a behavioural consultation can provide a structured desensitisation and counter-conditioning plan tailored to your dog's specific triggers.
  `,
  "cat-enrichment-indoors": `
Indoor cats need mental and physical outlets just as much as dogs. Without them, stress can manifest as over-grooming, aggression, or litter box avoidance.

## Vertical space matters

Cat trees, shelves, and window perches give cats territory and observation points. Even small flats can benefit from one vertical zone.

## Predictable play sessions

Two 10–15 minute interactive play sessions daily — using wand toys that mimic prey — reduce boredom far more effectively than leaving toys out passively.

## Scent and foraging

Hide treats in puzzle feeders or cardboard boxes. Rotating toys weekly keeps novelty high without buying new items constantly.
  `,
  "puppy-socialisation-window": `
The primary socialisation period for puppies roughly spans 3 to 14 weeks. Experiences during this window shape how your puppy perceives the world for life.

## What to prioritise

Expose your puppy to varied surfaces, sounds, people of different appearances, gentle handling, and calm adult dogs. Quality beats quantity — one positive experience beats ten overwhelming ones.

## Safety first

Avoid dog parks and unknown dogs until vaccinations are complete. Puppy classes with health-checked participants are ideal.

## It's never too late

While the window is critical, older puppies and adult dogs can still learn. The process may take longer, but positive associations remain the gold standard.
  `,
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
  const body = content[slug];

  if (!post || !body) notFound();

  return (
    <article className="bg-cream pt-28 md:pt-32">
      <Container className="max-w-3xl py-12">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary-700 hover:underline"
        >
          ← Back to blog
        </Link>
        <span className="mt-6 inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold uppercase text-accent-600">
          {post.category}
        </span>
        <h1 className="mt-4 font-display text-4xl text-primary-900 md:text-5xl">
          {post.title}
        </h1>
        <time className="mt-4 block text-sm text-ink-600">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt=""
          className="mt-8 w-full rounded-card object-cover shadow-card"
        />
        <div className="prose prose-lg mt-10 max-w-none text-ink-600">
          {body.trim().split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 font-display text-2xl text-primary-900">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="mt-4 leading-relaxed">
                {block}
              </p>
            );
          })}
        </div>
        <div className="mt-12 border-t border-ink-300 pt-8">
          <Button href="/book">Book a consultation</Button>
        </div>
      </Container>
    </article>
  );
}
