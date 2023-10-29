import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React, { FC } from 'react';

// className="bg-red-500 h-6 rounded-b-md text-center items-center justify-center text-md relative -top-2.5"

interface SpanProps extends VariantProps<typeof spanVariants> {
  error: string | undefined;
  className?: string | undefined;
}

const spanVariants = cva(
  'bg-red-500 text-center items-center justify-center relative text-black',
  {
    variants: {
      variant: {
        signup: 'rounded-b-md -top-2.5',
        createproject: 'py-2 rounded-b-md',
      },
    },
  },
);

const FormError: FC<SpanProps> = ({ error, variant, className }) => {
  return (
    <span className={cn(spanVariants({ variant, className }))}>{error}</span>
  );
};

export default FormError;
