import ChangePasswordForm from '@/components/forms/authForms/ChangePasswordForm';
import ChangeLanguage from '@/components/helpers/ChangeLanguage';
import HomeComponent from '@/components/helpers/HomeComponent';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Change Password · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};
const ChangePassword = ({ params }: { params: { code: string } }) => {
  return (
    <main>
      <div className="absolute top-0 left-0 mt-3 ml-3 ">
        <HomeComponent />
      </div>
      <div className="bg-gray-300 absolute top-0 right-0 mt-4 mr-4 rounded-md">
        <ChangeLanguage />
      </div>
      <div className="flex h-screen items-center justify-center">
        <ChangePasswordForm code={params.code} />
      </div>
    </main>
  );
};

export default ChangePassword;
