'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropDownMenu';
import { DE, US } from 'country-flag-icons/react/3x2';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const ChangeLanguage: FC = () => {
  const t = useTranslations('Landingnav');
  const pathName = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="h-10 bg-gray-300 hover:bg-gray-400 transition-all duration-200 flex w-24 rounded-md items-center text-center cursor-pointer border-black group">
          {pathName.startsWith('/de') ? (
            <div className="flex items-center text-center  ">
              <DE className="h-5 mx-2" />
              <div>DE</div>
              <ChevronDown className="group-active:rotate-180 transition-all duration-300" />
            </div>
          ) : (
            <div className="flex items-center text-center  ">
              <US className="h-5 mx-2" />
              <div className="">EN</div>
              <ChevronDown className="group-active:rotate-180 transition-all duration-300" />
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/" locale="en" className="flex">
            <US className="h-5 mx-2" />
            <p>{t('english')}</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/" locale="de" className="flex">
            <DE className="h-5 mx-2" />
            <p>{t('german')}</p>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeLanguage;
