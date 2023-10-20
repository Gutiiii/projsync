import AdminProjects from '@/components/adminComponents/AdminProjects';
import UserProjects from '@/components/userComponents/UserProjects';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { useUserRole } from '@/hooks/authHooks/useUserRole';
import { FC } from 'react';

const Projects: FC = async () => {
  await useSigninRequiredServer();
  const role = await useUserRole();

  if (role === 'ADMIN') return <AdminProjects />;

  if (role === 'USER') return <UserProjects />;
};

export default Projects;
