'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownAZ } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { Button } from '../Button';

const SortProjects = () => {
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
          <div className="flex h-9 items-center text-center hover:outline bg-transparent active:scale-95 rounded-md px-2">
            <ArrowDownAZ className="" />
            Sort
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
            Sort Title Ascending
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('sortOrder', 'title-desc'),
              );
            }}
          >
            Sort Title Descending
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('sortOrder', 'date-asc'),
              );
            }}
          >
            Sort Creation Date Ascending
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('sortOrder', 'date-desc'),
              );
            }}
          >
            Sort Creation Date Descending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortProjects;
