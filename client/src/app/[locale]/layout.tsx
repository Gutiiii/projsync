import { cn } from '@/lib/utils';
import Providers from '@/providers/Providers';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '300',
});

export const metadata: Metadata = {
  title: 'Project Sync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};

const locales = ['en', 'de'];

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body className="bg-gray-200">
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className={roboto.className}>{children}</div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
