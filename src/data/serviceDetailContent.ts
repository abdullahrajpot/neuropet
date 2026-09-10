/* ─────────────────────────────────────────────
   Individual Dog Behavior Service Content
───────────────────────────────────────────── */
export const serviceDetailContent: Record<
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
  "dog-behaviourist": {
    title: "Dog Behaviourist",
    heroTitle: "Expert Dog Behaviour Consultation",
    lead: "Professional behavioural consultation and assessment for all dog behaviour issues with personalised training plans.",
    body: "Our certified dog behaviourist provides comprehensive assessments covering your dog's complete history, environment, triggers, and behaviour patterns. We use evidence-based methods to understand the root cause of issues and create tailored solutions. Every dog receives a personalized training plan with daily WhatsApp support to ensure you're never alone in the journey. Our force-free, positive reinforcement approach focuses on building trust and confidence, not just managing symptoms.",
    thumbs: ["/images/dog2.png", "/images/service1.jpg", "/images/dog3.png"],
    checklist: [
      "Comprehensive behavioural assessment and history intake",
      "Personalised training plan with daily WhatsApp support",
      "Video analysis of problem behaviours",
      "Ongoing plan adjustments based on progress",
      "Family training sessions included",
      "Written behaviour modification protocols",
    ],
    accordion: [
      {
        question: "What qualifications does your behaviourist have?",
        answer:
          "Our lead behaviourist holds certifications in canine behaviour, applied animal behaviour, and has over 35 years of experience working with dogs of all breeds and temperaments.",
      },
      {
        question: "How long does a typical consultation take?",
        answer:
          "Initial consultations run 60-90 minutes including assessment, history intake, and initial plan development. Follow-up support continues through WhatsApp for the duration of your program.",
      },
      {
        question: "Do you work with aggressive dogs?",
        answer:
          "Yes. We have extensive experience with aggression cases including dog-to-dog, dog-to-human, and resource guarding. Safety protocols are always our first priority.",
      },
    ],
    image: "/images/dog2.png",
  },
  "dog-whisperer": {
    title: "Dog Whisperer",
    heroTitle: "Understanding Your Dog's Language",
    lead: "Learn to communicate with your dog through positive reinforcement and empathy-based training methods.",
    body: "The 'Dog Whisperer' approach focuses on understanding canine communication, body language, and emotional states. We teach you to read subtle signals your dog sends and respond appropriately, building a deeper bond based on mutual understanding and respect. This isn't about dominance or control—it's about becoming fluent in your dog's language so you can support them emotionally and behaviourally. Through observation, patience, and positive reinforcement, you'll develop the skills to anticipate and prevent issues before they escalate.",
    thumbs: ["/images/Dog Whisperer.jpg", "/images/dog5.png", "/images/pet.jpg"],
    checklist: [
      "Canine body language and communication training",
      "Emotional intelligence and empathy-based methods",
      "Stress signal recognition and prevention",
      "Building trust through understanding",
      "Positive reinforcement technique mastery",
      "Family education on dog psychology",
    ],
    accordion: [
      {
        question: "Is this approach suitable for all dogs?",
        answer:
          "Yes. Understanding dog communication benefits every dog regardless of age, breed, or behaviour history. It's especially powerful for anxious, fearful, or reactive dogs.",
      },
      {
        question: "How is this different from traditional training?",
        answer:
          "Traditional training often focuses on commands and compliance. The Dog Whisperer approach prioritizes understanding *why* your dog behaves as they do, addressing emotional needs first.",
      },
      {
        question: "Can this help with serious behaviour problems?",
        answer:
          "Absolutely. Many serious issues stem from miscommunication and unmet emotional needs. Addressing these root causes often resolves symptoms naturally.",
      },
    ],
    image: "/images/Dog Whisperer.jpg",
  },
  "dog-anxiety": {
    title: "Dog Anxiety Treatment",
    heroTitle: "Comprehensive Dog Anxiety Solutions",
    lead: "Specialized treatment plans for generalized anxiety, fear, and stress-related behaviours in dogs.",
    body: "Dog anxiety manifests in many ways—pacing, panting, destructive behaviour, excessive barking, or withdrawal. Our anxiety programs use a multi-faceted approach combining environmental management, counter-conditioning, desensitization protocols, and when appropriate, collaboration with your vet for supplementary support. We identify specific triggers, assess arousal patterns, and create a structured plan to help your dog feel safe and secure. Daily WhatsApp support ensures you can get guidance when anxiety episodes occur, not days later at a scheduled appointment.",
    thumbs: ["/images/dog anxiety.webp", "/images/dog3.png", "/images/service1.jpg"],
    checklist: [
      "Anxiety trigger identification and mapping",
      "Custom desensitization and counter-conditioning protocols",
      "Environmental enrichment and safety planning",
      "Calming techniques and stress reduction strategies",
      "Collaboration with vets for holistic care",
      "Emergency support during anxiety episodes",
    ],
    accordion: [
      {
        question: "How long does it take to see improvement?",
        answer:
          "Many clients see initial improvements within 2-3 weeks. Moderate anxiety typically responds well within 4-6 weeks, while severe or long-standing anxiety may take 8-12 weeks of consistent work.",
      },
      {
        question: "Will my dog need medication?",
        answer:
          "Not necessarily. Behaviour modification often succeeds without medication. However, for severe cases, we work alongside your vet to determine if supplementary support would be beneficial.",
      },
      {
        question: "What if anxiety gets worse during training?",
        answer:
          "With daily WhatsApp support, you can reach out immediately if issues escalate. We'll adjust the plan, slow the pace, or implement crisis management strategies as needed.",
      },
    ],
    image: "/images/dog anxiety.webp",
  },
  "dog-separation-anxiety": {
    title: "Dog Separation Anxiety",
    heroTitle: "Separation Anxiety Treatment Program",
    lead: "Specialized programs to help dogs cope with being alone through gradual desensitization.",
    body: "Separation anxiety is one of the most distressing issues for both dogs and owners. Dogs may destroy property, bark excessively, toilet indoors, or self-harm when left alone. Our separation anxiety protocol uses systematic desensitization—gradually teaching your dog that alone time is safe and temporary. We start with absences measured in seconds, building slowly to hours. You'll receive detailed video analysis, precise timing protocols, and daily support throughout the process. This requires patience and consistency, but the results are life-changing.",
    thumbs: ["/images/dog3.png", "/images/service1.jpg", "/images/dog2.png"],
    checklist: [
      "Systematic desensitization protocol with precise timing",
      "Video analysis of alone-time behaviour",
      "Gradual absence building from seconds to hours",
      "Pre-departure routine restructuring",
      "Environmental setup and enrichment planning",
      "Daily progress tracking and plan adjustments",
    ],
    accordion: [
      {
        question: "Can separation anxiety be cured?",
        answer:
          "Yes. With consistent application of systematic desensitization protocols, most dogs can learn to be comfortable alone. The timeline varies but success rates are excellent with commitment.",
      },
      {
        question: "How long will this take?",
        answer:
          "Mild cases often resolve in 4-6 weeks. Moderate cases typically take 6-12 weeks, and severe cases may require 3-6 months of structured work. Every dog progresses at their own pace.",
      },
      {
        question: "Can I still go to work during training?",
        answer:
          "Initially, you'll need alternative care (dog sitter, daycare, work from home) while building tolerance. We help you plan temporary solutions that don't undermine the desensitization process.",
      },
    ],
    image: "/images/dog3.png",
  },
  "dog-aggression-management": {
    title: "Dog Aggression Management",
    heroTitle: "Safe & Effective Aggression Protocols",
    lead: "Expert guidance for managing aggression towards people, dogs, or other animals with proven safety protocols.",
    body: "Aggression is one of the most serious and stressful behaviour issues dog owners face. Whether directed at other dogs, strangers, family members, or specific triggers, aggressive behaviour requires careful assessment and expert intervention. Our aggression management programs prioritize safety while addressing underlying causes—fear, resource guarding, territorial behaviour, or learned responses. We assess bite history, trigger thresholds, and arousal patterns to create a multi-layered safety and training plan. You'll learn to read warning signs, manage the environment, and implement behaviour modification protocols under close professional guidance.",
    thumbs: ["/images/Dog Aggression Management.webp", "/images/dog2.png", "/images/service1.jpg"],
    checklist: [
      "Comprehensive aggression assessment and risk evaluation",
      "Safety management protocols for home and walks",
      "Muzzle training (if appropriate) with desensitization",
      "Trigger identification and threshold mapping",
      "Counter-conditioning and behavior modification plans",
      "Family training on warning signs and management",
    ],
    accordion: [
      {
        question: "Is it safe to work with an aggressive dog?",
        answer:
          "With proper management and professional guidance, yes. We implement safety protocols first, then work on behaviour modification. Some cases may require muzzle training as a safety tool during the process.",
      },
      {
        question: "Can aggression be completely resolved?",
        answer:
          "Many cases improve dramatically or resolve entirely. Some dogs may always need careful management in certain situations. Our goal is maximum safety with minimum restrictions on quality of life.",
      },
      {
        question: "Will you visit my home with an aggressive dog?",
        answer:
          "Yes, but we conduct a thorough risk assessment first and may require certain safety measures (crate, separate room, muzzle) depending on the nature and severity of aggression.",
      },
    ],
    image: "/images/Dog Aggression Management.webp",
  },
  "leash-reactivity-training": {
    title: "Leash Reactivity Training",
    heroTitle: "Transform Stressful Walks",
    lead: "Proven methods to reduce lunging, barking, and pulling on leash for enjoyable walks.",
    body: "Leash reactivity—lunging, barking, or pulling toward other dogs, people, bikes, or cars—makes walks stressful and exhausting. Reactive dogs aren't 'bad'—they're often overstimulated, frustrated, fearful, or poorly socialized. Our leash reactivity program teaches you to identify early warning signs, manage your dog's arousal level, and use counter-conditioning techniques to change their emotional response to triggers. You'll learn leash handling skills, engagement games, and structured desensitization protocols. With consistent practice and daily support, walks transform from battles to bonding time.",
    thumbs: ["/images/Leash Reactivity Training.jpg", "/images/dog2.png", "/images/service1.jpg"],
    checklist: [
      "Trigger identification and threshold assessment",
      "Leash handling technique coaching",
      "Engagement and focus-building exercises",
      "Counter-conditioning protocols for common triggers",
      "Distance management and safe exposure planning",
      "Real-world walk support via video analysis",
    ],
    accordion: [
      {
        question: "How long before I see improvement on walks?",
        answer:
          "With consistent practice, many owners see noticeable improvements within 3-4 weeks. Full transformation typically takes 8-12 weeks depending on severity and consistency.",
      },
      {
        question: "Do I need special equipment?",
        answer:
          "A well-fitted harness and standard 6-foot leash are ideal. We do NOT use prong collars, choke chains, or electronic collars. Equipment recommendations are included in your plan.",
      },
      {
        question: "Can my reactive dog ever be off-leash?",
        answer:
          "That depends on the underlying cause and severity. Many reactive dogs can achieve reliable recall in controlled environments. Off-leash freedom isn't the goal for every dog, but calm on-leash walks always are.",
      },
    ],
    image: "/images/Leash Reactivity Training.jpg",
  },
  "puppy-foundations": {
    title: "Puppy Foundations Program",
    heroTitle: "Start Your Puppy Right",
    lead: "Essential training for puppies under 6 months: socialization, bite inhibition, and confidence building.",
    body: "The first 6 months of a puppy's life shape their entire future. Our Puppy Foundations program focuses on critical early socialization, bite inhibition, house training, and basic life skills—all using positive, force-free methods. Puppies learn best through play, exploration, and positive experiences. We guide you through the sensitive developmental periods, helping you expose your puppy to people, animals, sounds, and environments in a safe, structured way. You'll also master house training, crate training, and preventing common puppy problems like jumping, mouthing, and over-excitement before they become ingrained habits.",
    thumbs: ["/images/dog4.png", "/images/service2.jpg", "/images/pet.jpg"],
    checklist: [
      "Age-appropriate socialization exposure planning",
      "Bite inhibition and gentle mouth training",
      "House training and crate training protocols",
      "Basic obedience foundation (sit, stay, recall)",
      "Handling and grooming desensitization",
      "Prevention of common puppy behaviour problems",
    ],
    accordion: [
      {
        question: "When should I start training my puppy?",
        answer:
          "Immediately. Puppies begin learning from the moment they arrive home. The critical socialization window closes around 12-16 weeks, making early training essential.",
      },
      {
        question: "Is my puppy too young for training?",
        answer:
          "No puppy is too young for positive, gentle training. We tailor exercises to your puppy's age, attention span, and developmental stage. Even 8-week-old puppies benefit enormously.",
      },
      {
        question: "What if my puppy is still biting/mouthing?",
        answer:
          "Mouthing is normal puppy behavior. Our bite inhibition protocols teach puppies to control their jaw pressure and redirect biting to appropriate toys, not hands or clothing.",
      },
    ],
    image: "/images/dog4.png",
  },
  "virtual-consultation": {
    title: "Virtual Consultation",
    heroTitle: "Remote Dog Training & Behaviour Support",
    lead: "Remote video coaching with daily WhatsApp support—perfect for busy schedules or distance clients.",
    body: "Virtual consultations bring professional dog behaviour support directly to your home, no matter where you're located. Through video calls, screen sharing, and video analysis of behaviors you record, we assess your dog's behaviour in their natural environment. This format is ideal for follow-ups, clients outside our geographic area, or those with busy schedules. You'll receive the same detailed assessment, personalized training plans, and daily WhatsApp support as in-person clients. Virtual sessions are especially effective for separation anxiety, leash reactivity (via video review), and general obedience training.",
    thumbs: ["/images/service3.jpg", "/images/dog2.png", "/images/service1.jpg"],
    checklist: [
      "Video call consultations (Zoom, WhatsApp, or preferred platform)",
      "Video analysis of behaviours you record at home",
      "Written behaviour and training plans delivered digitally",
      "Daily WhatsApp support and progress tracking",
      "Screen-share demonstrations of techniques",
      "Flexible scheduling for global clients",
    ],
    accordion: [
      {
        question: "Is virtual training as effective as in-person?",
        answer:
          "For many cases, yes. Virtual consultations excel with separation anxiety, leash reactivity (via video review), and obedience training. Severe aggression cases may benefit from initial in-person assessment.",
      },
      {
        question: "What technology do I need?",
        answer:
          "A smartphone or computer with video calling capability (Zoom, WhatsApp, Skype, etc.) and the ability to record short videos of your dog's behaviour for analysis.",
      },
      {
        question: "Can you help if I live internationally?",
        answer:
          "Yes! Virtual consultations allow us to work with clients worldwide. We accommodate different time zones and adapt techniques to local contexts and regulations.",
      },
    ],
    image: "/images/service3.jpg",
  },
  "behaviour-essentials": {
    title: "Behaviour Essentials",
    heroTitle: "30-Day Behaviour Essentials Program",
    lead: "Daily WhatsApp support for common behaviour challenges—perfect for most dogs.",
    body: "The Behaviour Essentials program is our most popular option, designed for dogs with common behaviour challenges like pulling on lead, jumping up, poor recall, basic anxiety, or mild reactivity. Over 30 days, you receive a personalized behaviour plan, daily WhatsApp support, unlimited video analysis, and ongoing adjustments as your dog progresses. This isn't a group class—it's 1-to-1 professional guidance tailored to your dog and household. You'll learn effective techniques, understand why your dog behaves as they do, and gain confidence in your training abilities.",
    thumbs: ["/images/service1.jpg", "/images/dog2.png", "/images/dog3.png"],
    checklist: [
      "30 days of daily WhatsApp support",
      "Personalized behaviour & training plan",
      "Unlimited video analysis & feedback",
      "1-to-1 coaching call (60-90 minutes)",
      "Ongoing plan adjustments based on progress",
      "Progress tracking and milestone reviews",
    ],
    accordion: [
      {
        question: "What issues does this program cover?",
        answer:
          "Leash pulling, jumping up, poor recall, basic anxiety, mild reactivity, house training issues, basic obedience, and general behaviour modification. For severe aggression or separation anxiety, consider our Intensive program.",
      },
      {
        question: "How does WhatsApp support work?",
        answer:
          "You can message our behaviourist daily with questions, videos, or updates. Responses typically come within a few hours during business hours (same-day for urgent queries).",
      },
      {
        question: "What happens after 30 days?",
        answer:
          "Most dogs make significant progress in 30 days. You can extend support, graduate to occasional check-ins, or continue independently with the skills you've learned.",
      },
    ],
    image: "/images/service1.jpg",
  },
  "behaviour-intensive": {
    title: "Behaviour Intensive",
    heroTitle: "60-Day Behaviour Intensive Program",
    lead: "Extended support for complex issues like severe aggression, anxiety, or reactivity.",
    body: "The Behaviour Intensive program is designed for complex, severe, or long-standing behaviour issues that require more time and support. Over 60 days, you receive everything in the Essentials program plus two coaching calls, priority response times, advanced behaviour modification protocols, and optional family training sessions. This program suits dogs with severe reactivity, aggression, separation anxiety, or cases where previous training has failed. The extended timeline allows for gradual desensitization, careful threshold work, and sustained progress without rushing. You're never alone—our team is with you every step of the way.",
    thumbs: ["/images/dog2.png", "/images/Dog Aggression Management.webp", "/images/dog anxiety.webp"],
    checklist: [
      "60 days of daily WhatsApp support",
      "Everything in Behaviour Essentials",
      "Two 1-to-1 coaching calls (60-90 minutes each)",
      "Priority response times for urgent queries",
      "Advanced behavior modification protocols",
      "Optional family training session included",
    ],
    accordion: [
      {
        question: "How is this different from the Essentials program?",
        answer:
          "Intensive provides double the support duration (60 vs 30 days), two coaching calls instead of one, priority responses, and advanced protocols for severe or complex cases.",
      },
      {
        question: "Can I upgrade from Essentials to Intensive?",
        answer:
          "Yes, absolutely. If progress is slower than expected or issues are more complex than initially assessed, we can extend and upgrade your program at any time.",
      },
      {
        question: "What counts as a 'complex' case?",
        answer:
          "Severe aggression, bite history, severe separation anxiety, extreme reactivity, multi-dog household conflicts, or cases where multiple trainers have failed previously.",
      },
    ],
    image: "/images/dog2.png",
  },
  "expert-witness": {
    title: "Expert Witness Services",
    heroTitle: "Legal Expert Witness Services",
    lead: "Independent expert reports, risk assessments, and court testimony for animal behaviour cases.",
    body: "Our expert witness service provides independent, evidence-based assessments for legal cases involving dog behaviour, dangerous dog legislation, bite incidents, custody disputes, or animal welfare concerns. We conduct thorough behavioural evaluations, review evidence and records, prepare detailed written reports compliant with legal standards, and provide expert testimony in court when required. Our assessments are impartial, scientifically grounded, and focus on factual observation rather than advocacy. We work with solicitors, local authorities, courts, and insurance companies throughout the UK.",
    thumbs: ["/images/doc3.png", "/images/doc2.jpg", "/images/doc.jpg"],
    checklist: [
      "Independent behavioural assessments for legal cases",
      "Comprehensive written expert reports",
      "Risk assessment and safety evaluations",
      "Court testimony and cross-examination support",
      "Evidence review and analysis",
      "Compliance with legal and professional standards",
    ],
    accordion: [
      {
        question: "What types of cases do you work on?",
        answer:
          "Dangerous dog cases, bite incidents, breed identification disputes, animal welfare investigations, custody disputes, insurance claims, and behavioral fitness assessments for rehoming or destruction orders.",
      },
      {
        question: "How much does expert witness work cost?",
        answer:
          "Fees vary based on case complexity, report requirements, and whether court attendance is needed. Contact us for a detailed quote. We work with legal aid, private solicitors, and local authorities.",
      },
      {
        question: "Are your reports accepted in court?",
        answer:
          "Yes. Our lead behaviourist is a recognized expert witness with extensive court experience and professional credentials accepted by UK courts and tribunals.",
      },
    ],
    image: "/images/doc3.png",
  },
};
