'use client';
import { Check } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../Button';

const FreeCard = () => {
  const { data: session } = useSession();
  return (
    <div className="w-80 h-96 border-2 border-gray-300 shadow-2xl rounded-lg text-left px-5 pt-4 pb-12">
      <p className="text-2xl">Free Plan</p>
      <p className="mt-8 mb-8 text-sm">
        Everything you need to start syncing your Projects
      </p>
      <div className="flex">
        <p className="text-3xl">$0</p>
        <p className="mt-3 text-gray-600 ml-1">/month</p>
      </div>
      <Button variant="card" className="w-full mt-4">
        <a href={session?.user ? '/dashboard' : '/signup'}>Get Started</a>
      </Button>
      <ul className="mt-8 space-y-2 text-gray-600">
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1">2 Free Projects</p>
        </li>
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1">1 Invitee per Project</p>
        </li>
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1">Comments</p>
        </li>
      </ul>
    </div>
  );
};

export default FreeCard;
