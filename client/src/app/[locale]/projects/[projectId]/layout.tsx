import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ProjectNavbar from '@/components/navbar/ProjectNavbar';
import Sidebar from '@/components/navbar/Sidebar';
import AdminNavbar from '@/components/navbar/admin/AdminNavbar';
import UserNavbar from '@/components/navbar/user/UserNavbar';
import EasyLink from '@/components/projects/EasyLink';
import useAuthForProjects from '@/hooks/authHooks/useAuthForProjects';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { getServerSession } from 'next-auth';
import { FC } from 'react';

interface layoutProps {
  children: React.ReactNode;
  params: { projectId: string };
}

const layout: FC<layoutProps> = async ({ children, params }) => {
  await useSigninRequiredServer();
  await useAuthForProjects(params.projectId);
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session?.user.role === 'ADMIN' ? <AdminNavbar /> : <UserNavbar />}
      {/* <Sidebar /> */}
      <div className="absolute right-24 top-24">
        <EasyLink />
      </div>

      <ProjectNavbar projectId={params.projectId} />
      {children}
    </div>
  );
};

export default layout;
