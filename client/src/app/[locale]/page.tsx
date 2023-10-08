import LandingMain from '@/components/LandingMain';
import LandingNav from '@/components/navbar/LandingNav';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log('SESSION: ', session);
  return (
    <>
      <div className="bg-gray-200 w-full">
        <LandingNav />
        <LandingMain />
      </div>
    </>
  );
}
