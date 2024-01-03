import SignInForm from '@/components/forms/authForms/SignInForm';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Login · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};
const page = () => {
  return <SignInForm />;
};

export default page;
