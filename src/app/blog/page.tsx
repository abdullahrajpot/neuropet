import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/shared";
import { blogPosts } from "@/lib/site-config";

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights & advice"
        description="Practical behaviour tips from our team — grounded in science, written for pet parents."
      />
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="overflow-hidden rounded-card bg-cream shadow-card">
                    <div className="p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt=""
                        className="aspect-[16/10] w-full rounded-2xl object-cover transition-transform group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="px-6 pb-6">
                      <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                        {post.category}
                      </span>
                      <h2 className="mt-2 font-display text-xl text-primary-900 group-hover:text-primary-700">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-ink-600">{post.excerpt}</p>
                      <time className="mt-4 block text-xs text-ink-600">
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
