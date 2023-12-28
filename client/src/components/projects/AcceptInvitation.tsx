'use client';
import { useGetByInvitationId } from '@/hooks/projectHooks/useGetInvitationById';
import { signIn, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../Button';
import { Skeleton } from '../ui/skeleton';

const AcceptInvitation = ({ invitationId }: { invitationId: string }) => {
  const { data: session } = useSession();
  const { isLoading, isError, isSuccess } = useGetByInvitationId(invitationId);
  const router = useRouter();
  const path = usePathname();

  if (isError) {
    if (session) router.push('/dashboard');
    else router.push('/signin');
  }

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-72 bg-gray-300 -mt-10" />
        <Skeleton className="bg-gray-300 h-10 w-72 mt-4" />
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div>
        <p className="text-3xl mb-4">Accept to Join this Project</p>
        <Button
          variant="info"
          onClick={() => signIn('google', { callbackUrl: path })}
        >
          Accept Invitation
        </Button>
      </div>
    );
  }
};

export default AcceptInvitation;
