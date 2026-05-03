import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductSection from "@/components/ProductSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import GroupModal from "@/components/GroupModal";
import { LanguageProvider } from "@/lib/language";
import { PreorderProvider } from "@/lib/preorder";

export default function Home() {
  return (
    <LanguageProvider>
      <PreorderProvider>
        <main>
          <Navbar />
          <HeroSection />
          <MetricsSection />
          <FeaturesSection />
          <ProductSection />
          <PricingSection />
          <CTASection />
          <Footer />
        </main>
        <GroupModal />
      </PreorderProvider>
    </LanguageProvider>
  );
}
