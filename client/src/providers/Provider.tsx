'use client';
import { SessionProvider } from 'next-auth/react';
import { FC } from 'react';
import { Toaster } from 'sonner';
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster position="top-center" richColors />
      {children}
    </SessionProvider>
  );
};

export default Providers;
