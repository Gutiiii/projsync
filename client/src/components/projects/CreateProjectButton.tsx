'use client';
import { useCreateProject } from '@/hooks/projectHooks/useCreateProject';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '../Button';
import CreateProjectModal from '../modal/CreateProjectModal';
import { Input } from '../ui/input';

const CreateProjectButton = () => {
  const router = useRouter();
  const [createProjectModalVisible, setCreateProjectModalVisible] =
    useState<boolean>(false);
  const mutation = useMutation({ mutationFn: useCreateProject });
  const { data: session } = useSession();
  const token = session?.backendTokens.accessToken;
  const id = session?.user.id;
  const role = 'CREATOR';

  const createProject = (title: string, description: string) => {
    setCreateProjectModalVisible(false);
    mutation.mutateAsync({ title, description, id, token, role });
    router.refresh();
  };

  return (
    <>
      <Button
        variant={'info'}
        className=""
        onClick={() => setCreateProjectModalVisible(true)}
      >
        New Project
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
