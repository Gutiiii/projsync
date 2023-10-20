import UserAvatar from '@/components/auth/UserAvatar';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Button } from '../../Button';
import ChangeLanguage from '../../ChangeLanguage';

interface AdminNavMobileProps {
  onClose: () => void;
}

const AdminNavMobile: FC<AdminNavMobileProps> = ({ onClose }) => {
  const t = useTranslations('Admin');

  return (
    <main className="absolute inset-0 text-center w-full z-20 bg-gray-400 h-screen grid overflow-hidden ">
      <div className="flex justify-between">
        <div className="mt-2 ml-4 text-xl">ProjSync.</div>
        <div
          className="h-10 w-10 hover:rounded-full hover:bg-gray-500 active:bg-gray-600 active:scale-95 cursor-pointer p-1 mt-1 mx-2"
          onClick={onClose}
        >
          <X height={30} width={30} className="mr-2" />
        </div>
      </div>
      <ul className="space-y-5">
        <div className="group mx-auto">
          <li className="cursor-pointer">
            {' '}
            <a href="/projects">{t('projects')}</a>
          </li>
          <div className="line h-px group-hover:w-16 w-0 bg-black mx-auto transition-all duration-300" />
        </div>
        <div className="group mx-auto">
          <li className="cursor-pointer">
            {' '}
            <a href="/pricing">{t('pricing')}</a>
          </li>
          <div className="line h-px group-hover:w-16 w-0 bg-black mx-auto transition-all duration-300" />
        </div>
        <li className="space-y-4">
          <ChangeLanguage />
          <UserAvatar />
        </li>
      </ul>
    </main>
  );
};

export default AdminNavMobile;
