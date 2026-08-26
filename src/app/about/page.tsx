import type { Metadata } from "next";
import {
  AboutHero,
  AboutMission,
  AboutHighlightCards,
  AboutParallaxBanner,
  AboutPartners,
  AboutWhyChoose,
  AboutTeam,
} from "@/components/about/sections";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — expert pet behaviour consultation with force-free, evidence-based methods.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutHighlightCards />
      <AboutParallaxBanner />
      {/* <AboutPartners /> */}
      <AboutWhyChoose />
      <AboutTeam />
    </>
  );
}
