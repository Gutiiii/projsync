import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import UserAvatar from '@/components/auth/UserAvatar';
import ChangeLanguage from '@/components/helpers/ChangeLanguage';
import Logo from '@/components/ui/Logo';
import { Button } from '@nextui-org/react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import SignInButton from '../../auth/button/SignInButton';
import LandingHamburger from './LandingHamburger';

const LandingNav = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-[55px] pt-2 sticky top-0 inset-x-0 z-10 shadow-xl bg-gray-200">
      <div className="flex text-xl text-center items-center sm:justify-around justify-between mx-4">
        <div className="flex space-x-8">
          <button className="flex text-center items-center ">
            <Link href="/">
              <Logo />
            </Link>
          </button>
          <div className="group mx-auto mt-1.5 hidden sm:flex">
            <button>
              <Link href="/pricing">Pricing</Link>
            </button>
            <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
          </div>
        </div>

        <div className="items-center text-center hidden sm:flex">
          <div
            className={
              session?.user ? 'group mx-auto ml-24' : 'group mx-auto ml-36'
            }
          >
            <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
          </div>
        </div>
        <div className="sm:flex space-x-4 hidden">
          {session?.user ? (
            <>
              <Button color="primary">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserAvatar />
            </>
          ) : (
            <>
              <div className="group mx-auto mt-1.5">
                <SignInButton />
                <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
              </div>
              <Button color="primary">
                <Link href="/signup" className="flex items-center ">
                  Get Started
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
                </Link>
              </Button>
            </>
          )}
          <div className="items-end flex">
            <ChangeLanguage />
          </div>
        </div>
        <div className="sm:hidden flex cursor-pointer">
          <LandingHamburger />
        </div>
      </div>
    </div>
  );
};

export default LandingNav;
