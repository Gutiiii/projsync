'use client';
import { CurrentUser, Project } from '@/types/project.types';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import ProjectBoard from '../projects/ProjectBoard';
import ProjectInformation from '../projects/ProjectInformation';

const ProjectNavbar = ({}) => {
  const pathName = usePathname();
  const t = useTranslations('Project');

  return (
    <>
      <div className="sm:w-2/3 h-8 md:mt-20 mt-10 mx-auto flex justify-evenly md:text-2xl text-xl rounded-xl">
        <a href={pathName + '/board'}>
          <div className="group">
            <div className="cursor-pointer">{t('projectboard')}</div>
            {pathName.includes('board') ? (
              <div className="line h-px w-full bg-black mx-auto transition-all duration-300" />
            ) : (
              <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
            )}
          </div>
        </a>
        <a href={pathName + '/chat'}>
          <div className="group">
            <div className="cursor-pointer">Chat</div>
            {pathName.includes('chat') ? (
              <div className="line h-px w-full bg-black mx-auto transition-all duration-300" />
            ) : (
              <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
            )}
          </div>
        </a>
        <a href={pathName + '/information'}>
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
      <div className="flex justify-center mt-8">
        {/* {currentSection === 'Project Board' ? (
          <ProjectBoard />
        ) : currentSection === 'Chat' ? (
          <div>Chat</div>
        ) : currentSection === 'Project Information' ? (
          <ProjectInformation
            project={project}
            currentUser={currentUser}
            invitations={invitations}
          />
        ) : null} */}
      </div>
    </>
  );
};

export default ProjectNavbar;
