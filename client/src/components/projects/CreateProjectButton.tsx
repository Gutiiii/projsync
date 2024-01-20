'use client';
import { useCreateProject } from '@/hooks/projectHooks/useCreateProject';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import CreateProjectModal from '../modal/CreateProjectModal';

const CreateProjectButton = () => {
  const t = useTranslations('Project');
  const [createProjectModalVisible, setCreateProjectModalVisible] =
    useState<boolean>(false);
  const mutation = useMutation({ mutationFn: useCreateProject });
  const { data: session } = useSession();
  const token = session?.backendTokens.accessToken;
  const id = session?.user.id;
  const role = 'CREATOR';
  const router = useRouter();

  const createProject = (title: string, description: string) => {
    setCreateProjectModalVisible(false);
    mutation.mutateAsync(
      { title, description, id, token, role },
      {
        onSuccess: () => {
          router.refresh();
          toast.success(`${t('createprojecttoast')}`);
        },
        onError: () => {
          router.refresh();
          toast.error('Something went wrong', {
            description: 'Please try again later',
          });
        },
      },
    );
  };

  return (
    <>
      <Button
        color="primary"
        className=""
        onClick={() => setCreateProjectModalVisible(true)}
      >
        {t('newproject')}
      </Button>
      <CreateProjectModal
        visible={createProjectModalVisible}
        handleOnSubmit={createProject}
        handleOnClose={() => setCreateProjectModalVisible(false)}
      />
    </>
  );
};

export default CreateProjectButton;
