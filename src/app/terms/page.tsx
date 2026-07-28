import { Container } from "@/components/ui/shared";

export default function TermsPage() {
  return (
    <article className="bg-cream pt-28 pb-16 md:pt-32">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl text-primary-900">Terms of Service</h1>
        <p className="mt-4 text-ink-600 leading-relaxed">
          By using NeuroPet&apos;s website and booking services, you agree to
          provide accurate information and attend scheduled consultations or
          provide reasonable notice of cancellation. Consultation fees and
          cancellation policies will be communicated at the time of booking
          confirmation.
        </p>
        <p className="mt-4 text-ink-600 leading-relaxed">
          Behaviour advice provided is educational and does not replace emergency
          veterinary care. In cases of aggression or safety concerns, please
          consult your veterinarian alongside behavioural support.
        </p>
      </Container>
    </article>
  );
}
