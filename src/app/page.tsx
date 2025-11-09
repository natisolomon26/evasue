import { Hero } from '@/components/landing/Hero';
import { Mission } from '@/components/landing/Mission';
import { WhatWeDo } from '@/components/landing/WhatWeDo';
import { Campuses } from '@/components/landing/Campuses';
import { Testimonials } from '@/components/landing/Testimonials';
import { GetInvolved } from '@/components/landing/GetInvolved';
import { Newsletter } from '@/components/landing/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <WhatWeDo />
      <Campuses />
      <Testimonials />
      <GetInvolved />
      <Newsletter />
    </div>
  );
}