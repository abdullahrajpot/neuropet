import Link from "next/link";
import { Container } from "@/components/ui/shared";

export default function AdminPetsPage() {
  return (
    <section className="min-h-screen bg-cream pt-28 pb-16">
      <Container>
        <Link href="/admin/dashboard" className="text-sm text-primary-700 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="mt-4 font-display text-3xl text-primary-900">Pets</h1>
        <p className="mt-4 text-ink-600">
          Pet profiles submitted by clients will appear here once connected to
          MongoDB storage.
        </p>
      </Container>
    </section>
  );
}
