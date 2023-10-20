import FreeCard from '@/components/card/FreeCard';
import PremiumCard from '@/components/card/PremiumCard';
import LandingNav from '@/components/navbar/landing/LandingNav';
import React from 'react';

const Pricing = () => {
  return (
    <>
      <LandingNav />
      <div className="py-32 text-center items-center justify-center">
        <h1 className="text-5xl">Pricing</h1>
        <h2 className="mt-12 text-xl">Start free and scale after</h2>
      </div>
      <div className="flex flex-wrap mx-auto items-center justify-center sm:space-x-12 space-y-12 sm:space-y-0">
        <FreeCard />
        <PremiumCard />
      </div>

      {/* <div className="sm:flex h-screen items-center justify-center text-center sm:space-x-12 grid-cols-1 mx-auto">
        <FreeCard />
        <PremiumCard />
      </div> */}
    </>
  );
};

export default Pricing;
