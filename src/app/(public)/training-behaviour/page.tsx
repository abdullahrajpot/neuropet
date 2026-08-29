import type { Metadata } from "next";
import {
  ServicesHero,
  ServicesIntro,
  ServicesGrid,
  ServicesGetInTouch,
  ServicesFAQ,
  ServicesNewsletter,
} from "@/components/services/sections";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Training & Behaviour Services",
  description: `Expert pet training and behavioural consultation for dogs, cats, and puppies — force-free care from ${siteConfig.name}.`,
};

export default function TrainingBehaviourPage() {
  return (
    <>
      <ServicesHero />
      <ServicesIntro />
      <ServicesGrid />
      <ServicesGetInTouch />
      <ServicesFAQ />
      <ServicesNewsletter />
    </>
  );
}
