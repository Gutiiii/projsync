import Footer from '@/components/Footer';
import FreeCard from '@/components/card/FreeCard';
import PremiumCard from '@/components/card/PremiumCard';
import LandingNav from '@/components/navbar/landing/LandingNav';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Pricing · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};

const Pricing = () => {
  return (
    <div className="relative h-full">
      <LandingNav />
      <div className="mt-10 lg:mt-20 2xl:mt-28 text-center items-center justify-center">
        <h1 className="text-6xl font-black">Pricing</h1>
        <h2 className="mt-6 text-3xl font-semibold mb-20">
          Start free and scale after
        </h2>
      </div>
      <div className="flex flex-wrap lg:mx-auto mx-10 items-center justify-center lg:space-x-20 space-x-0 space-y-12 lg:space-y-0">
        <FreeCard />
        <PremiumCard />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Pricing;
