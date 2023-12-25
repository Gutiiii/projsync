'use client';
import { FRONTEND_URL } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const ProjectNavbar = ({ projectId }: { projectId: string }) => {
  const pathName = usePathname();
  const path = `/projects/${projectId}`;
  const t = useTranslations('Project');

  return (
    <>
      <div className="sm:w-2/3 h-8 md:mt-20 mt-10 mx-auto flex justify-evenly md:text-2xl text-xl rounded-xl">
        <a href={path + '/board'}>
          <div className="group">
            <div className="cursor-pointer">{t('projectboard')}</div>
            {pathName.includes('board') ? (
              <div className="line h-px w-full bg-black mx-auto transition-all duration-300" />
            ) : (
              <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
            )}
          </div>
        </a>
        <a href={path + '/chat'}>
          <div className="group">
            <div className="cursor-pointer">Chat</div>
            {pathName.includes('chat') ? (
              <div className="line h-px w-full bg-black mx-auto transition-all duration-300" />
            ) : (
              <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
            )}
          </div>
        </a>
        <a href={path + '/information'}>
          <div className="group">
            <div className="cursor-pointer">{t('projectinformation')}</div>
            {pathName.includes('information') ? (
              <div className="line h-px w-full bg-black mx-auto transition-all duration-300" />
            ) : (
              <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
            )}
          </div>
        </a>
      </div>
      <div className="flex justify-center mt-8"></div>
    </>
  );
};

export default ProjectNavbar;
