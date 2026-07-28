import { Container } from "@/components/ui/shared";

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-cream pt-28 pb-16 md:pt-32">
      <Container className="max-w-3xl prose prose-lg">
        <h1 className="font-display text-4xl text-primary-900">Privacy Policy</h1>
        <p className="mt-4 text-ink-600">
          NeuroPet respects your privacy. We collect only the information needed
          to provide consultation services, process bookings, and respond to
          enquiries. We do not sell personal data to third parties.
        </p>
        <h2 className="mt-8 font-display text-2xl text-primary-900">Data we collect</h2>
        <p className="text-ink-600">
          Name, email, phone number, pet details, and any messages or videos you
          submit through our forms.
        </p>
        <h2 className="mt-8 font-display text-2xl text-primary-900">Cookies</h2>
        <p className="text-ink-600">
          We use essential cookies to remember your cookie consent preference.
          Analytics cookies may be added with your consent.
        </p>
      </Container>
    </article>
  );
}
