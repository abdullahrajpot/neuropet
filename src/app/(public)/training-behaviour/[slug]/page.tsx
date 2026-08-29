import { notFound } from "next/navigation";
import { ServiceDetailClient } from "@/components/services/ServiceDetailClient";

/* ─────────────────────────────────────────────
   Per-service content data  (server-side only)
───────────────────────────────────────────── */
export const serviceContent: Record<
  string,
  {
    title: string;
    heroTitle: string;
    lead: string;
    body: string;
    thumbs: string[];
    checklist: string[];
    accordion: { question: string; answer: string }[];
    image: string;
  }
> = {
  "dog-behaviour": {
    title: "Dog Behavioural Consultation",
    heroTitle: "Dog Behaviour",
    lead: "Comprehensive in-home and clinical assessments for dogs of all breeds and ages.",
    body: "Our dog behaviour consultations begin with a thorough history intake covering your dog's medical background, environment, daily routine, and specific triggers. We observe behaviour in context — at home, on walks, or in the environment where problems occur — to identify root causes rather than surface symptoms. You receive a detailed written behaviour plan with clear, step-by-step protocols tailored to your household.",
    thumbs: ["/images/service1.jpg", "/images/dog2.png", "/images/dog3.png"],
    checklist: [
      "Reactivity and leash aggression protocols",
      "Separation anxiety and destructive behaviour",
      "Fear-based and generalised anxiety",
      "Resource guarding and inter-dog conflict",
      "Multi-dog household dynamics and introductions",
    ],
    accordion: [
      {
        question: "What happens in the first session?",
        answer:
          "We begin with a detailed history intake and behavioural observation in your home or chosen environment. The first session typically lasts 90–120 minutes and ends with an initial plan outline.",
      },
      {
        question: "How many sessions will my dog need?",
        answer:
          "Most cases require 2–4 follow-up sessions after the initial consultation, though complex cases such as severe aggression or multi-layered anxiety may need more structured support over several months.",
      },
      {
        question: "Do you use any punishment-based methods?",
        answer:
          "Never. Our approach is entirely force-free and positive-reinforcement based. We do not use prong collars, e-collars, choke chains, or any aversive tools under any circumstances.",
      },
    ],
    image: "/images/service1.jpg",
  },
  "cat-behaviour": {
    title: "Cat Behavioural Consultation",
    heroTitle: "Cat Behaviour",
    lead: "Specialist support for indoor cats, multi-cat homes, and stress-related behavioural issues.",
    body: "Cats communicate stress through subtle signals that are easy to miss. Our feline consultations assess territory mapping, resource distribution, social dynamics, and environmental stressors to identify the underlying cause of problems. We develop a practical enrichment and behaviour plan that works within your existing home layout without major renovation.",
    thumbs: ["/images/cat.jpg", "/images/cat1.png", "/images/abouttab1.jpg"],
    checklist: [
      "Litter box avoidance and inappropriate elimination",
      "Inter-cat aggression and safe introduction protocols",
      "Scratching, spraying, and marking behaviours",
      "Environmental enrichment and vertical space planning",
      "Hiding, withdrawal, and anxiety-related behaviours",
    ],
    accordion: [
      {
        question: "Can you help with multi-cat household tension?",
        answer:
          "Yes — multi-cat introductions and ongoing inter-cat conflict are among the most common feline cases we see. We map territory, identify resource competition, and guide structured reintroduction protocols.",
      },
      {
        question: "Do I need a referral from my vet?",
        answer:
          "A vet referral is not required but is strongly encouraged if your cat has recently had a change in behaviour, as medical causes must be ruled out before behavioural intervention begins.",
      },
      {
        question: "Will you visit my home?",
        answer:
          "Yes. In-home visits are our preferred format for cat consultations as the home environment itself is central to feline behavioural assessment. Virtual sessions are also available.",
      },
    ],
    image: "/images/cat.jpg",
  },
  "puppy-training": {
    title: "Puppy Training & Socialisation",
    heroTitle: "Puppy Training",
    lead: "Foundation skills and safe socialisation during your puppy's critical early months.",
    body: "The socialisation window closes around 12–14 weeks of age, making early, positive exposure essential for long-term confidence. Our puppy programmes are structured around your puppy's specific developmental stage, covering bite inhibition, house training, crate comfort, and safe social exposure to people, animals, sounds, and environments.",
    thumbs: ["/images/service2.jpg", "/images/dog4.png", "/images/dog5.png"],
    checklist: [
      "Bite inhibition and gentle play boundaries",
      "House training and crate comfort",
      "Socialisation checklists and safe exposure plans",
      "Foundation cues: sit, stay, recall, leave it",
      "Preventing resource guarding from an early age",
    ],
    accordion: [
      {
        question: "What age should I start puppy training?",
        answer:
          "As early as possible — ideally at 8 weeks. The primary socialisation window closes around 12–14 weeks, so starting early gives your puppy the best foundation for lifelong confidence.",
      },
      {
        question: "Is this suitable for all breeds?",
        answer:
          "Yes. Our programmes are tailored to individual puppies, taking breed tendencies, temperament, and household context into account rather than using a one-size-fits-all approach.",
      },
      {
        question: "Do you offer group puppy classes?",
        answer:
          "Our core offering is one-to-one in-home training, which we find more effective than group classes for building solid foundations. Virtual follow-ups are also available between sessions.",
      },
    ],
    image: "/images/service2.jpg",
  },
  "virtual-consultation": {
    title: "Virtual / Online Consultation",
    heroTitle: "Virtual Consultation",
    lead: "Remote video coaching sessions with video review — ideal for busy schedules and anxious pets.",
    body: "Virtual consultations allow us to observe your pet in their natural home environment without the added stress of a visitor's presence — which is particularly beneficial for anxious dogs and cats. Sessions are conducted via video call with screen-sharing for plan review, and include a written follow-up summary with step-by-step protocols.",
    thumbs: ["/images/service3.jpg", "/images/pet2.png", "/images/gallery8.jpg"],
    checklist: [
      "Full behaviour assessment via video observation",
      "Flexible scheduling across any time zone",
      "Written session summary and behaviour plan",
      "Follow-up chat support between sessions",
      "Video review of specific problem behaviours",
    ],
    accordion: [
      {
        question: "Is virtual as effective as in-person?",
        answer:
          "For many cases, yes — particularly for anxiety-driven behaviours where a visitor's presence can alter the very behaviour we need to observe. We can often gather more accurate information remotely.",
      },
      {
        question: "What platform do you use?",
        answer:
          "We use Zoom or Google Meet — whichever you prefer. Sessions can also be recorded for your reference, with your consent.",
      },
      {
        question: "Can I switch to in-person later?",
        answer:
          "Absolutely. Many clients start with a virtual consultation and then book an in-home follow-up session once we have established a working relationship and initial plan.",
      },
    ],
    image: "/images/service3.jpg",
  },
  "expert-witness": {
    title: "Pet Behaviour Expert Witness",
    heroTitle: "Expert Witness",
    lead: "Independent expert reports, risk assessments, and court testimony for animal behaviour cases.",
    body: "We provide professional, court-ready behavioural assessments for legal cases involving animals — including dangerous dog assessments, bite incident investigations, animal welfare proceedings, and insurance liability cases. All reports are prepared to Civil Procedure Rules (CPR) Part 35 standards and are written to be accessible to non-specialist readers.",
    thumbs: ["/images/dog.png", "/images/service1.jpg", "/images/gallery1.jpg"],
    checklist: [
      "Independent dangerous dog risk assessments",
      "Bite incident investigation and root cause analysis",
      "Written expert reports to CPR Part 35 standards",
      "Animal welfare act compliance assessments",
      "Court attendance and expert witness testimony",
    ],
    accordion: [
      {
        question: "Who instructs you — claimant or defendant?",
        answer:
          "We can act as a single joint expert instructed by both parties, or as a party-appointed expert. We maintain strict independence and objectivity in all cases.",
      },
      {
        question: "How long does a report take?",
        answer:
          "Standard turnaround is 10–15 working days from assessment. Urgent instructions can be accommodated at short notice — please contact us to discuss timescales.",
      },
      {
        question: "Do you cover Scotland and Northern Ireland?",
        answer:
          "Yes. We cover the whole of the UK for assessments and can provide remote report reviews for international cases upon request.",
      },
    ],
    image: "/images/service1.jpg",
  },
};

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

/* ─────────────────────────────────────────────
   Server component — resolves params, calls
   notFound(), then passes data to client UI
───────────────────────────────────────────── */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = serviceContent[slug];

  // notFound() is safe here — this is a server component
  if (!content) notFound();

  return <ServiceDetailClient slug={slug} content={content} />;
}
