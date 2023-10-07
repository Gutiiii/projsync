import React from 'react';

const FormError = ({ error }: { error: string | undefined }) => {
  return (
    <span className="bg-red-500 h-6 rounded-b-md text-center items-center justify-center text-md relative -top-2.5">
      {error}
    </span>
  );
};

export default FormError;
