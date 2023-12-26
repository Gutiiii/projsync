'use client';
import { sendProjectInvitation } from '@/app/actions';
import { useCreateInvitation } from '@/hooks/projectHooks/useCreateInvitation';
import { BACKEND_URL } from '@/lib/constants';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  Clock,
  Eye,
  FileEdit,
  Trash,
  User2,
  UserCog,
  UserPlus,
  X,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../Button';
import InviteMemberModal from '../modal/InviteMemberModal';

type User = {
  name: string;
};

type ProjectMember = {
  userId: string;
  role: string;
  createdAt: string;
  projectId: string;
  user: User;
};

type Invitation = {
  id: string;
  email: string;
  projectId: string;
  role: 'VIEWER' | 'EDITOR' | 'CREATOR';
  createdAt: string;
};

type ProjectsMemberProps = {
  projectMembers: ProjectMember[];
  invitations: Invitation[]; // Added invitations prop
};

const ProjectsMember = ({
  projectMembers,
  role,
  invitations,
  projectTitle,
  projectDescription,
}: ProjectsMemberProps & {
  role: 'VIEWER' | 'EDITOR' | 'CREATOR';
  projectTitle: string;
  projectDescription: string;
}) => {
  // Your component logic here
  const [inviteMemberModalVisible, setInviteMemberModalVisible] =
    useState<boolean>(false);

  const [invitationsArray, setInvitationsArray] = useState(invitations);

  const { data: session } = useSession();

  const mutation = useMutation({ mutationFn: useCreateInvitation });

  const t = useTranslations('Project');

  const returnDate = (value: string) => {
    const date = new Date(value);
    const dateStr = date.toDateString();
    const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);
    return dateWithoutWeekday;
  };

  const handleDeleteInvitation = (id: string) => {
    setInvitationsArray(
      invitationsArray.filter((invitation) => invitation.id !== id),
    );
  };

  const token = session?.backendTokens.accessToken;
  const projectId = projectMembers[0].projectId;

  const handleInvite = async (email: string, role: 'EDITOR' | 'VIEWER') => {
    setInviteMemberModalVisible(false);

    const userExists =
      projectMembers.find((item: any) => item.user.email === email) !==
      undefined;

    if (userExists) {
      return toast.info('Already Member of this Project!');
    }

    const values = {
      email,
      role,
      projectId,
      token,
    };

    mutation.mutateAsync(values, {
      onError: () => {
        toast.error('Something went wrong!');
        return null;
      },
    });
    console.log('AFTER');
    const mutationdata = await mutation?.data?.data;
    const res = await sendProjectInvitation(
      projectId,
      projectTitle,
      email,
      projectDescription,
      mutationdata,
    );
    if (res.status === 200) {
      toast.success('Invite sent!');
    }
    window.location.reload();

    // const newInvitation = await mutation.data.data;

    // console.log(newInvitation)

    // setInvitationsArray([...invitationsArray, newInvitation]);
  };

  return (
    <>
      <div className="grid justify-center">
        <div className="flex justify-between">
          <p className="text-2xl font-semibold text-center mb-4 relative">
            {t('members')}
          </p>
          {/* TODO Add Invite Functionality */}
          {role === 'CREATOR' ? (
            <Button
              className="ml-3 -mt-0.5"
              variant="info"
              size="sm"
              onClick={() => setInviteMemberModalVisible(true)}
            >
              <p className="text-lg">{t('invite')}</p>{' '}
              <UserPlus className="ml-2 mb-0.5" size={19} />
            </Button>
          ) : null}
        </div>
        {projectMembers.map((projectMember) => (
          <div
            key={projectMember.userId}
            className=" text-lg border-b-2 border-gray-500 border-opacity-20 mb-2 pb-1 "
          >
            <div className="flex justify-between">
              <div className="flex">
                <div className="pr-2">
                  {projectMember.role === 'CREATOR' ? (
                    <User2 size={20} className="mt-1" />
                  ) : projectMember.role === 'VIEWER' ? (
                    <Eye className="mt-1" size={20} />
                  ) : projectMember.role === 'EDITOR' ? (
                    <FileEdit className="mt-1" size={20} />
                  ) : null}
                </div>
                <div>{projectMember.user.name}</div>
              </div>
              {/* TODO Add Edit Member Functionality */}
              {role === 'CREATOR' ? (
                <div className="-mt-1">
                  <UserCog
                    size="28"
                    className="hover:rounded-full hover:bg-gray-300 active:bg-gray-400 active:Scale-95 cursor-pointer p-1 mt-1"
                  />
                </div>
              ) : null}
            </div>
            {/* TODO Look if add this:
          <div>
            <p className="inline">Added: </p>
            <p className="inline font-bold">
              {returnDate(projectMember.createdAt)}
            </p>
          </div> */}
          </div>
        ))}
      </div>
      <div className="grid justify-center">
        <div className="flex justify-between mt-4">
          <p className="text-2xl font-semibold text-center mb-4 relative">
            {t('invitations')}
          </p>
          <Clock className="mt-1 ml-2" />
        </div>
        {invitationsArray.length > 0 ? (
          invitationsArray.map((invitation) => (
            <div
              key={invitation.id}
              className=" text-lg border-b-2 border-gray-500 border-opacity-20 mb-2 pb-1 "
            >
              <div className="flex justify-between">
                <div className="flex">
                  <div className="pr-2">
                    {invitation.role === 'VIEWER' ? (
                      <Eye className="mt-1" size={20} />
                    ) : invitation.role === 'EDITOR' ? (
                      <FileEdit className="mt-1" size={20} />
                    ) : null}
                  </div>
                  <div className="opacity-80">{invitation.email}</div>
                </div>
                {/* TODO Add Edit Member Functionality */}
                {role === 'CREATOR' ? (
                  <div className="-mt-1 ml-1">
                    <Trash
                      onClick={() => handleDeleteInvitation(invitation.id)}
                      size="28 "
                      className="hover:rounded-full hover:bg-gray-300 active:bg-gray-400 active:Scale-95 cursor-pointer p-1 mt-1"
                    />
                  </div>
                ) : null}
              </div>
              {/* TODO Look if add this:
          <div>
            <p className="inline">Added: </p>
            <p className="inline font-bold">
              {returnDate(projectMember.createdAt)}
            </p>
          </div> */}
            </div>
          ))
        ) : (
          <div className="text-xl -mt-1">No Open Invitations</div>
        )}
      </div>

      {inviteMemberModalVisible && (
        <InviteMemberModal
          visible={inviteMemberModalVisible}
          handleOnClose={() => setInviteMemberModalVisible(false)}
          handleOnSubmit={handleInvite}
        />
      )}
    </>
  );
};

export default ProjectsMember;
