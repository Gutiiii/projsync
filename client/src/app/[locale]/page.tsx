import Footer from '@/components/Footer';
import LandingMain from '@/components/LandingMain';
import LandingNav from '@/components/navbar/landing/LandingNav';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="bg-gray-200 w-full">
        <LandingNav />
        <LandingMain />
        {/* <Footer /> */}
      </div>
    </>
  );
}
