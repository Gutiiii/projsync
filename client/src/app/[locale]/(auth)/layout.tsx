import ChangeLanguage from '@/components/ChangeLanguage';
import HomeComponent from '@/components/HomeComponent';
import { FC } from 'react';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
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
