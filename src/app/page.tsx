import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Security } from "@/components/sections/security";
import { WaitlistSection } from "@/components/sections/waitlist-section";
import { WhyDeBro } from "@/components/sections/why-debro";
import { StructuredData } from "@/components/seo/structured-data";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <HowItWorks />
        <WhyDeBro />
        <Security />
        <Faq />
        <WaitlistSection />
      </main>
      <SiteFooter />
      <StructuredData />
    </>
  );
}
