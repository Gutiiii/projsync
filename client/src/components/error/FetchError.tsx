'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const FetchError = () => {
  const router = useRouter();
  return (
    <div className="mt-10 text-3xl flex">
      Something went wrong. Pease try{' '}
      <p
        className="text-blue-500 cursor-pointer ml-2 hover:underline"
        onClick={() => router.refresh()}
      >
        again
      </p>
    </div>
  );
};

export default FetchError;
