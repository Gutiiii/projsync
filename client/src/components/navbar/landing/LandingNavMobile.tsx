import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Button } from '../../Button';
import ChangeLanguage from '../../ChangeLanguage';

interface LandingNavMobileProps {
  onClose: () => void;
}

const LandingNavMobile: FC<LandingNavMobileProps> = ({ onClose }) => {
  const landingnav = useTranslations('Landingnav');

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
          <li className="cursor-pointer">{landingnav('pricing')}</li>
          <div className="line h-px group-hover:w-16 w-0 bg-black mx-auto transition-all duration-300" />
        </div>
        <div className="group">
          <a href="/signin">
            <li className="cursor-pointer">{landingnav('login')}</li>
            <div className="line h-px group-hover:w-12 w-0 bg-black mx-auto transition-all duration-300" />
          </a>
        </div>
        <li className="cursor-pointer">
          {' '}
          <a href="/signup">
            {' '}
            <Button size="sm" className="mx-auto">
              {landingnav('getstarted')}
              <svg
                width="30"
                height="30"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 group-active:translate-x-10 transition-all duration-900"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </a>
        </li>
        <li>
          <ChangeLanguage />
        </li>
      </ul>
    </main>
  );
};

export default LandingNavMobile;
