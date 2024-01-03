import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ProjectInformation from '@/components/projects/ProjectInformation';
import useAuthForProjects from '@/hooks/authHooks/useAuthForProjects';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { BACKEND_URL } from '@/lib/constants';
import { CurrentUser } from '@/types/project.types';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Information · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};

const ProjectInformationPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const session = await getServerSession(authOptions);

  const res = await fetch(BACKEND_URL + '/project/' + params.projectId, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + session?.backendTokens.accessToken,
    },
  });
  const data = await res.json();

  const res2 = await fetch(
    BACKEND_URL + '/project/invitations/' + params.projectId,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + session?.backendTokens.accessToken,
      },
    },
  );
  const invitationsdata = await res2.json();

  if (!data) return redirect('/projects');

  const currentUser = data.userProject.find(
    (item: CurrentUser) => item.userId === session?.user.id,
  );
  return (
    <div className="flex justify-center mt-8">
      <ProjectInformation
        project={data}
        currentUser={currentUser}
        invitations={invitationsdata}
      />
    </div>
  );
};

export default ProjectInformationPage;
