import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { BACKEND_URL } from '@/lib/constants';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const useAuthForProjects = async (projectId: string) => {
  const session = await getServerSession(authOptions);
  const res = await fetch(BACKEND_URL + `/project/auth/${projectId}`, {
    headers: {
      Authorization: `Bearer ${session?.backendTokens.accessToken}`,
    },
  });
  if (res.status !== 200) return redirect('/signin');
  const data = await res.json();
  return { data };
};

export default useAuthForProjects;
