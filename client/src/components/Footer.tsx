import React from 'react';

const Footer = () => {
  return (
    <div className="h-[55px] bg-slate-900 absolute w-full bottom-0 flex justify-around text-center items-center text-gray-400 text-md">
      <p className="hover:text-gray-100 cursor-pointer">ProjSync.</p>
      <div className="flex space-x-4">
        <p className="hover:text-gray-100 cursor-pointer">GitHub</p>
        <p className="hover:text-gray-100 cursor-pointer">LinkedIn</p>
        <p className="hover:text-gray-100 cursor-pointer">Instagram</p>
      </div>
    </div>
  );
};

export default Footer;
