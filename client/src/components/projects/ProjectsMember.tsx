'use client';
import { sendProjectInvitation } from '@/app/actions';
import { useCreateInvitation } from '@/hooks/projectHooks/useCreateInvitation';
import { useDeleteInvitation } from '@/hooks/projectHooks/useDeleteInvitation';
import { BACKEND_URL } from '@/lib/constants';
import { Button } from '@nextui-org/react';
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
import EditProjectMemberModal from '../modal/EditProjectMemberModal';
import InviteMemberModal from '../modal/InviteMemberModal';
import LoadingSpinner from '../ui/LoadingSpinner';

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

  const [editMemberModalVisible, setEditMemberModalVisible] =
    useState<boolean>(false);

  const [invitationsArray, setInvitationsArray] = useState(invitations);

  const { data: session } = useSession();

  const mutation = useMutation({ mutationFn: useCreateInvitation });

  const deleteMutation = useMutation({ mutationFn: useDeleteInvitation });

  const t = useTranslations('Project');

  const returnDate = (value: string) => {
    const date = new Date(value);
    const dateStr = date.toDateString();
    const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);
    return dateWithoutWeekday;
  };

  const projectId = projectMembers[0].projectId;

  const handleInvite = async (email: string, role: 'EDITOR' | 'VIEWER') => {
    const token = session?.backendTokens.accessToken;
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
      onSuccess: async (data) => {
        const invitationId = data.data.id;
        const res = await sendProjectInvitation(
          projectTitle,
          email,
          projectDescription,
          invitationId,
        );
        if (res.status === 200) {
          toast.success('Invite sent!');
        }
        const newInvitation = data.data;

        setInvitationsArray([...invitationsArray, newInvitation]);
      },
      onError: () => {
        toast.error('Something went wrong!');
        return null;
      },
    });
  };

  const handleDeleteInvitation = (invitationId: string) => {
    setInvitationsArray(
      invitationsArray.filter((invitation) => invitation.id !== invitationId),
    );

    const token = session?.backendTokens.accessToken;
    const values = {
      invitationId,
      token,
    };
    deleteMutation.mutateAsync(values, {
      onSuccess: (data) => {
        toast.success('Invitation has been Deleted');
      },
      onError: () => {
        toast.error('Something went wrong!');
      },
    });
  };

  const handleEdit = () => {
    console.log('EDIT');
  };

  return (
    <>
      <div className="grid justify-center">
        <div className="flex justify-between">
          <p className="text-2xl font-semibold text-center mb-4 relative">
            {t('members')}
          </p>
          {role === 'CREATOR' ? (
            <Button
              className="ml-3 -mt-0.5 bg-blue-500 hover:bg-blue-700 text-white h-9"
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
              {role === 'CREATOR' &&
              projectMember.userId !== session?.user.id ? (
                <div className="-mt-1">
                  <UserCog
                    onClick={() => setEditMemberModalVisible(true)}
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
      {editMemberModalVisible && (
        <EditProjectMemberModal
          visible={editMemberModalVisible}
          handleOnClose={() => setEditMemberModalVisible(false)}
          handleOnSubmit={handleEdit}
        />
      )}
      {mutation.isLoading && <LoadingSpinner />}
    </>
  );
};

export default ProjectsMember;
