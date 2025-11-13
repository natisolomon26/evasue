import AboutPage from '@/components/landing/About';
import FaithTeaser from '@/components/landing/FaithTeaser';
import Hero from '@/components/landing/Hero';
import Location from '@/components/landing/Location';
import CTA from '@/components/landing/CTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutPage />
      <FaithTeaser />
      <Location />
      <CTA />
    </div>
  );
}