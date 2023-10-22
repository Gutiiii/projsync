import { ChevronLeft } from 'lucide-react';
import React from 'react';

const HomeComponent = () => {
  return (
    <button className="hover:bg-gray-300 p-2 pt-2 rounded-full">
      <a href="/" className="flex">
        <ChevronLeft />
        <div>Home</div>
      </a>
    </button>
  );
};

export default HomeComponent;
