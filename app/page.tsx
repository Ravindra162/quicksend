import { LandingHero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingHero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}