'use client';
import { Check } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Button } from '../Button';

const PremiumCard = () => {
  const { data: session } = useSession();
  const t = useTranslations('PremiumCard');
  return (
    <div className="w-80 h-96 border-2 border-slate-900 shadow-2xl rounded-lg text-left px-5 pt-4 pb-12">
      <p className="text-2xl">{t('plan')}</p>
      <p className="mt-8 mb-12 text-sm">{t('description')}</p>
      <div className="flex">
        <p className="text-3xl">$10</p>
        <p className="mt-3 text-gray-600 ml-1">{t('month')}</p>
      </div>
      <Button className="w-full mt-4">
        <a href={session?.user ? '/dashboard' : '/signup'}>{t('getstarted')}</a>
      </Button>
      <ul className="mt-8 space-y-2 text-gray-600">
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-infinity mr-1 mt-0.5"
            >
              <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
            </svg>
            {t('first')}
          </p>
        </li>
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-infinity mr-1 mt-0.5"
            >
              <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
            </svg>
            {t('second')}
          </p>
        </li>
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1">{t('third')}</p>
        </li>
      </ul>
    </div>
  );
};

export default PremiumCard;
