import { Spinner } from '@nextui-org/react';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="absolute z-40 h-screen w-screen top-0 left-0 backdrop-blur-sm">
      <Spinner
        className="fixed top-1 left-1/2 sm:-ml-16 -ml-7 z-50"
        size="lg"
        color="current"
      />
    </div>
  );
};

export default LoadingSpinner;
