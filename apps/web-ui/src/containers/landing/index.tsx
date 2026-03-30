"use client";

import React from "react";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { TestimonialsSection } from "./testimonials-section";
import { CTASection } from "./cta-section";
import { LandingFooter } from "./landing-footer";
import { LandingMenu } from "./landing-menu";
import { ComparisonSection } from "./comparison-section";
import { PreviewSection } from "./preview-section";
// import { PricingSection } from "./pricing-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-bold pt-20">
      <LandingMenu />
      <HeroSection />
      <PreviewSection />
      <ComparisonSection />
      <FeaturesSection />
      <TestimonialsSection />
      {/* <PricingSection /> */}
      <CTASection />
      <LandingFooter />
    </div>
  );
}
