import { RefreshCcw } from 'lucide-react';
import React from 'react';

const Logo = () => {
  return (
    <div className="flex ">
      <RefreshCcw size={30} className="mt-0.5 mr-3" />
      <p className="text-3xl font-black">Proj</p>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B86EF] to-[#3A4CE1] text-3xl font-black">
        Sync
      </p>
    </div>
  );
};

export default Logo;
