import Navbar from "@/components/vesper/Navbar";
import Hero from "@/components/vesper/Hero";
import LogosBar from "@/components/vesper/LogosBar";
import ProblemSection from "@/components/vesper/ProblemSection";
import HowItWorks from "@/components/vesper/HowItWorks";
import SampleBriefSection from "@/components/vesper/SampleBriefSection";
import FeaturesSection from "@/components/vesper/FeaturesSection";
import IntegrationsSection from "@/components/vesper/IntegrationsSection";
import SocialProof from "@/components/vesper/SocialProof";
import PricingSection from "@/components/vesper/PricingSection";
import CtaFooter from "@/components/vesper/CtaFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <LogosBar />
      <ProblemSection />
      <HowItWorks />
      <SampleBriefSection />
      <FeaturesSection />
      <IntegrationsSection />
      <SocialProof />
      <PricingSection />
      <CtaFooter />
    </div>
  );
};

export default Index;
