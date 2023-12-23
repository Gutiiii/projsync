import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ProjectNavbar from '@/components/navbar/ProjectNavbar';
import AdminNavbar from '@/components/navbar/admin/AdminNavbar';
import UserNavbar from '@/components/navbar/user/UserNavbar';
import useAuthForProjects from '@/hooks/authHooks/useAuthForProjects';
import { useSigninRequiredServer } from '@/hooks/authHooks/useSigninRequiredServer';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  await useSigninRequiredServer();
  await useAuthForProjects(params.projectId);
  const session = await getServerSession(authOptions);

  const res = await fetch(BACKEND_URL + '/project/' + params.projectId, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + session?.backendTokens.accessToken,
    },
  });
  const data = await res.json();

  if (!data) return redirect('/projects');

  return (
    <>
      {session?.user.role === 'ADMIN' ? <AdminNavbar /> : <UserNavbar />}
      <ProjectNavbar project={data} />
    </>
  );
};

export default ProjectPage;
