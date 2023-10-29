import UserAvatar from '@/components/auth/UserAvatar';
import ChangeLanguage from '@/components/helpers/ChangeLanguage';
import { useTranslations } from 'next-intl';
import AdminHamburger from './AdminHamburger';

const AdminNavbar = ({}) => {
  const t = useTranslations('Admin');

  return (
    <div className="h-12 pt-2 sticky top-0 inset-x-0 z-10">
      <div className="flex text-xl text-center items-center sm:justify-around justify-between mx-4">
        <button className="flex text-center items-center">
          <a href="/dashboard">ProjSync.</a>
        </button>
        <div className="items-center text-center hidden sm:flex">
          <div className="flex space-x-52">
            <div className="group mx-auto">
              <button>
                <a href="/projects">{t('projects')}</a>
              </button>
              <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
            </div>
            <div className="group mx-auto">
              <button>
                <a href="/admin">Admin</a>
              </button>
              <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
            </div>
          </div>
        </div>
        <div className="sm:flex space-x-4 hidden">
          <div className="items-end flex space-x-6">
            <UserAvatar />
            <ChangeLanguage />
          </div>
        </div>
        <div className="sm:hidden flex cursor-pointer">
          <AdminHamburger />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
