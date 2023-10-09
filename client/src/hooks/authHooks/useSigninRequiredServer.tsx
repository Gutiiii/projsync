import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function useSigninRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect('/');
}
