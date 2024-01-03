import AdminProjects from '@/components/adminComponents/AdminProjects';
import UserProjects from '@/components/userComponents/UserProjects';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { useUserRole } from '@/hooks/authHooks/useUserRole';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Projects · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};

const Projects: FC = async () => {
  await useSigninRequiredServer();
  const role = await useUserRole();

  if (role === 'ADMIN') return <AdminProjects />;

  if (role === 'USER') return <UserProjects />;
};

export default Projects;
