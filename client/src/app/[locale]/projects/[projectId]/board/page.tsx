import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ProjectBoard from '@/components/projects/ProjectBoard';
import useAuthForProjects from '@/hooks/authHooks/useAuthForProjects';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

export const metadata: Metadata = {
  title: 'Board · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};
const ProjectBoardPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const session = await getServerSession(authOptions);

  const auth = await useAuthForProjects(params.projectId);

  return (
    <ProjectBoard
      user={auth.data}
      projectId={params.projectId}
      token={session?.backendTokens.accessToken}
    />
  );
};

export default ProjectBoardPage;
