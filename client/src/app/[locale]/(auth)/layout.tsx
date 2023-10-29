import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import ChangeLanguage from '@/components/helpers/ChangeLanguage';
import HomeComponent from '@/components/helpers/HomeComponent';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');
  return (
    <main>
      <div className="absolute top-0 left-0 mt-3 ml-3">
        <HomeComponent />
      </div>
      <div className="bg-gray-300 absolute top-0 right-0 mt-4 mr-4 rounded-md">
        <ChangeLanguage />
      </div>
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default layout;
