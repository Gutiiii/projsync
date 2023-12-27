import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HomeComponent = () => {
  return (
    <button className="hover:bg-gray-300 p-2 pt-2 rounded-full">
      <Link href="/" className="flex">
        <ChevronLeft />
        <div>Home</div>
      </Link>
    </button>
  );
};

export default HomeComponent;
