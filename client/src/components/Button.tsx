import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-scale duration-200',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-700 ',
        destructive: 'bg-red-500 text-white',
        success: 'bg-green-500 text-white',
        info: 'bg-blue-500 text-white ',
        outline: 'bg-transparent hover:outline',
        card: 'bg-transparent border hover:border-2 border-slate-900 duration-0',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button: FC<ButtonProps> = ({ className, size, variant, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
