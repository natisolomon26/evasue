import AboutPage from '@/components/landing/About';
import FaithTeaser from '@/components/landing/FaithTeaser';
import Hero from '@/components/landing/Hero';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutPage />
      <FaithTeaser />
    </div>
  );
}