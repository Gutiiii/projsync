'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownAZ } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';

const SortProjects = () => {
  const t = useTranslations('Project');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex h-9 items-center text-center hover:outline bg-transparent active:scale-95 rounded-md px-2 mx-5 sm:mt-1">
            <ArrowDownAZ className="" />
            {t('sort')}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('sortOrder', 'title-asc'),
              );
            }}
          >
            {t('dropdown1')}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('sortOrder', 'title-desc'),
              );
            }}
          >
            {t('dropdown2')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('sortOrder', 'date-asc'),
              );
            }}
          >
            {t('dropdown3')}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('sortOrder', 'date-desc'),
              );
            }}
          >
            {t('dropdown4')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortProjects;
