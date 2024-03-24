import ChangeLanguage from '@/components/helpers/ChangeLanguage';
import HomeComponent from '@/components/helpers/HomeComponent';
import AcceptInvitation from '@/components/projects/AcceptInvitation';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: 'Invitation · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};
const page = ({ params }: { params: { invitationId: string } }) => {
  return (
    <main>
      <div className="absolute top-0 left-0 mt-3 ml-3 ">
        <HomeComponent />
      </div>
      <div className="bg-gray-300 absolute top-0 right-0 mt-4 mr-4 rounded-md">
        <ChangeLanguage />
      </div>
      <div className="flex h-screen items-center justify-center text-center">
        <AcceptInvitation invitationId={params.invitationId} />
      </div>
    </main>
  );
};

export default page;
