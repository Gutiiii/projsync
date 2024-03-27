import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ChatContainer from '@/components/chatComponents/ChatContainer';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

export const metadata: Metadata = {
  title: 'Chat · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};
const page = async ({ params }: { params: { projectId: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  return (
    <div className="flex mx-auto justify-center w-full ">
      <div className="sm:w-2/3 w-full mx-6 bg-white">
        <ChatContainer
          projectId={params.projectId}
          sessionToken={session?.backendTokens.accessToken}
        />
      </div>
    </div>
  );
};

export default page;
