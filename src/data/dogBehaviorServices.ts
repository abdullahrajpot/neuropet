export const dogBehaviorPlans = [
  {
    id: 'discovery-call',
    name: 'Free Discovery Call',
    price: 'Free',
    duration: '30 minutes',
    description: 'No-obligation consultation to discuss your dog\'s behaviour and determine the best plan',
    features: [
      'Discuss your dog\'s specific behavioural challenges',
      'Understand your training goals',
      'Get expert advice on next steps',
      'No obligation to purchase',
      'Friendly, supportive environment',
    ],
    cta: 'Book Free Call',
    popular: false,
    color: 'accent',
  },
  {
    id: 'behavior-essentials',
    name: 'Behaviour Essentials',
    price: '£270',
    duration: '30 days',
    description: '1-to-1 support program with daily guidance for common behavioural issues',
    features: [
      'Personalised behaviour & training plan',
      'Daily WhatsApp support',
      'Unlimited video analysis & feedback',
      '1-to-1 coaching call',
      'Ongoing plan adjustments',
      'Progress tracking',
    ],
    cta: 'Start Program',
    popular: true,
    color: 'primary',
  },
  {
    id: 'behavior-intensive',
    name: 'Behaviour Intensive',
    price: '£470',
    duration: '60 days',
    description: 'Extended support for complex issues like severe reactivity, aggression, or anxiety',
    features: [
      'Everything in Behaviour Essentials',
      '60 days of daily support',
      'Two 1-to-1 coaching calls',
      'Priority response times',
      'Advanced behavior modification protocols',
      'Family training session (optional)',
    ],
    cta: 'Start Intensive',
    popular: false,
    color: 'primary',
  },
  {
    id: 'puppy-foundations',
    name: 'Puppy Foundations',
    price: '£220',
    duration: '30 days',
    description: 'Get your puppy started right with essential training and socialization guidance',
    features: [
      'Puppy-specific training plan',
      'Daily WhatsApp support',
      'Video analysis for training sessions',
      'Socialization guidance',
      'House training support',
      'Bite inhibition protocols',
    ],
    cta: 'Start Puppy Program',
    popular: false,
    color: 'accent',
  },
];

export const commonBehaviorIssues = [
  {
    issue: 'Reactivity & Aggression',
    description: 'Dog lunging, barking, or showing aggression towards people, dogs, or other triggers',
    icon: '🐕‍🦺',
  },
  {
    issue: 'Separation Anxiety',
    description: 'Destructive behavior, excessive barking, or distress when left alone',
    icon: '🏠',
  },
  {
    issue: 'Lead Pulling',
    description: 'Constant pulling on the lead making walks stressful and unenjoyable',
    icon: '🦮',
  },
  {
    issue: 'Poor Recall',
    description: 'Dog not coming back when called, running off, or ignoring commands',
    icon: '📢',
  },
  {
    issue: 'Jumping Up',
    description: 'Jumping on people, guests, or family members',
    icon: '⬆️',
  },
  {
    issue: 'Fear & Anxiety',
    description: 'Fearful reactions to sounds, people, places, or situations',
    icon: '😰',
  },
];

export const whyVirtualTraining = [
  {
    title: 'Real-Life Training',
    description: 'Train where behaviour actually happens - at home, on walks, in the situations you struggle with most',
    icon: '🏡',
  },
  {
    title: 'Video Analysis',
    description: 'Send videos of problem behaviors and get expert feedback on exactly what to do',
    icon: '📹',
  },
  {
    title: 'Daily Support',
    description: 'Get answers when you need them, not weeks later at your next appointment',
    icon: '💬',
  },
  {
    title: 'Ongoing Adjustments',
    description: 'Your training plan evolves as your dog progresses - no rigid, one-size-fits-all approach',
    icon: '📈',
  },
];

export const tipOptions = [
  {
    amount: 5,
    label: 'Small Tip',
    description: 'Show your appreciation',
  },
  {
    amount: 10,
    label: 'Standard Tip',
    description: 'Support our service',
  },
  {
    amount: 15,
    label: 'Generous Tip',
    description: 'Make our day!',
  },
];
