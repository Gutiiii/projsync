'use client';
import { BACKEND_URL, FRONTEND_URL } from '@/lib/constants';
import { Check } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Button } from '../Button';

const FreeCard = () => {
  const { data: session } = useSession();
  const t = useTranslations('FreeCard');
  console.log(BACKEND_URL);
  console.log(FRONTEND_URL);
  return (
    <div className="lg:w-[347px] lg:h-[506px] w-full border-2 border-gray-400 shadow-2xl rounded-lg text-left px-5 pt-4 pb-12">
      <p className="text-2xl">{t('plan')}</p>
      <p className="mt-8 mb-8 text-sm">{t('description')}</p>
      <div className="flex">
        <p className="text-3xl">$0</p>
        <p className="mt-3 text-gray-600 ml-1">{t('month')}</p>
      </div>
      <Button variant="card" className="w-full mt-4">
        <a href={session?.user ? '/dashboard' : '/signup'}>{t('getstarted')}</a>
      </Button>
      <ul className="mt-8 space-y-2 text-gray-600">
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1">{t('first')}</p>
        </li>
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1">{t('second')}</p>
        </li>
        <li className="flex">
          <Check className="w-8" />
          <p className="ml-1">{t('third')}</p>
        </li>
      </ul>
    </div>
  );
};

export default FreeCard;
