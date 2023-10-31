'use client';
import { Checkbox } from '@/components/ui/checkbox';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';

interface ShowClosedProjectsProps {}

const ShowClosedProjects: FC<ShowClosedProjectsProps> = ({}) => {
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

  const showClosed = searchParams.get('showClosed') === 'true';

  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <Checkbox
        defaultChecked={showClosed}
        id="showclosed"
        onClick={() => {
          router.push(
            pathname +
              '?' +
              createQueryString('showClosed', String(!showClosed)),
          );
        }}
      />
      <label
        htmlFor="showclosed"
        className="sm:text-lg text-sm font-medium leading-none"
      >
        Closed Projects
      </label>
    </div>
  );
};

export default ShowClosedProjects;
