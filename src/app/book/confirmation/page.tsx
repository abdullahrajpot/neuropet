import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui/Button";

export default function BookingConfirmationPage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream pt-28">
      <Container className="max-w-lg text-center">
        <CheckCircle
          className="mx-auto h-16 w-16 text-success"
          strokeWidth={1.5}
        />
        <h1 className="mt-6 font-display text-4xl text-primary-900">
          Booking received
        </h1>
        <p className="mt-4 text-ink-600">
          Thank you for reaching out. We&apos;ll review your details and confirm
          your consultation within 1–2 business days.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/pet-profile" variant="secondary">
            Add pet profile
          </Button>
        </div>
        <p className="mt-6 text-sm text-ink-600">
          Questions?{" "}
          <Link href="/contact" className="text-primary-700 hover:underline">
            Contact us
          </Link>
        </p>
      </Container>
    </section>
  );
}
