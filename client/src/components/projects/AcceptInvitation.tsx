'use client';
import { useAcceptInvitation } from '@/hooks/projectHooks/useAcceptInvitation';
import { useGetByInvitationId } from '@/hooks/projectHooks/useGetInvitationById';
import { FRONTEND_URL } from '@/lib/constants';
import { Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';
import { Song_Myung } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';

const AcceptInvitation = ({ invitationId }: { invitationId: string }) => {
  const { data: session } = useSession();
  const { isLoading, isError, isSuccess } = useGetByInvitationId(invitationId);
  const mutation = useMutation({ mutationFn: useAcceptInvitation });

  const router = useRouter();
  const path = usePathname();

  const onAccept = () => {
    if (!session) return signIn(undefined, { callbackUrl: path });
    const token = session.backendTokens.accessToken;
    const values = {
      token,
      invitationId,
    };

    mutation.mutateAsync(values, {
      onSuccess: (data) => {
        toast.success('Successfully Accepted Invite', {
          description: 'You will be redirected',
        });
        setTimeout(() => {
          router.push(`${FRONTEND_URL}/projects/${data.data.projectId}`);
        }, 2000);
      },
      onError: () => {
        toast.error('Something went wrong!');
      },
    });
  };

  if (isError) {
    if (session) router.push('/dashboard');
    else router.push('/signin');
  }

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-72 bg-gray-400 -mt-10" />
        <Skeleton className="bg-gray-400 h-10 w-72 mt-4" />
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div>
        <p className="text-3xl mb-4">Accept to Join this Project</p>
        <Button color="primary" className="w-full" size="md" onClick={onAccept}>
          Accept Invitation
        </Button>
      </div>
    );
  }
};

export default AcceptInvitation;
