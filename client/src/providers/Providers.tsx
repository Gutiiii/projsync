'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { FC, useState } from 'react';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <NextUIProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <ConfigProvider>
              <Toaster position="top-center" richColors />
              {children}
            </ConfigProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};

export default Providers;
