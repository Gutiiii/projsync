'use client';
import { Checkbox } from '@/components/ui/checkbox';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';

interface ShowClosedProjectsProps {}

const ShowClosedProjects: FC<ShowClosedProjectsProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="showclosed"
        onClick={() => {
          searchParams.get('showClosed')
            ? router.push(
                pathname + '?' + createQueryString('showClosed', 'false'),
              )
            : router.push(
                pathname + '?' + createQueryString('showClosed', 'true'),
              );
        }}
      />
      <label htmlFor="showclosed" className="text-lg font-medium leading-none">
        Show Closed Projects
      </label>
    </div>
  );
};

export default ShowClosedProjects;
