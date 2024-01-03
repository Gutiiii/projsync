import SignUpForm from '@/components/forms/authForms/SignUpForm';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sign up · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
