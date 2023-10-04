'use client';
import { Button } from '@/components/Button';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React from 'react';

const SignInButton = () => {
  const t = useTranslations('Landingnav');
  return <button onClick={() => signIn()}>{t('login')}</button>;
};

export default SignInButton;
