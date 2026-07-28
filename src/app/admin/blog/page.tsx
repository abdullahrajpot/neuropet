import Link from "next/link";
import { Container } from "@/components/ui/shared";
import { blogPosts } from "@/lib/site-config";

export default function AdminBlogPage() {
  return (
    <section className="min-h-screen bg-cream pt-28 pb-16">
      <Container>
        <Link href="/admin/dashboard" className="text-sm text-primary-700 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl text-primary-900">Blog</h1>
        <ul className="mt-8 space-y-3">
          {blogPosts.map((post) => (
            <li
              key={post.slug}
              className="flex items-center justify-between rounded-card bg-white p-4 shadow-sm"
            >
              <span className="font-medium text-primary-900">{post.title}</span>
              <span className="rounded-full bg-success-bg px-3 py-1 text-xs font-semibold text-success">
                Published
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
