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
  title: "Our Services",
  description: `Explore expert pet training and behavioural consultation services from ${siteConfig.name}.`,
};

export default function ServicesPage() {
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
