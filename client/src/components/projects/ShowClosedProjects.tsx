'use client';
import { Checkbox } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

interface ShowClosedProjectsProps {}

const ShowClosedProjects: FC<ShowClosedProjectsProps> = ({}) => {
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

  const showClosed = searchParams.get('showClosed') === 'true';
  return (
    <div className="flex items-center  cursor-pointer">
      <Checkbox
        defaultSelected={showClosed}
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
        className="sm:text-lg text-sm font-medium leading-none cursor-pointer"
      >
        {t('closedprojects')}
      </label>
    </div>
  );
};

export default ShowClosedProjects;
