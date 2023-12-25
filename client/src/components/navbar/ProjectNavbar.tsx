'use client';
import { CurrentUser, Project } from '@/types/project.types';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import ProjectBoard from '../projects/ProjectBoard';
import ProjectInformation from '../projects/ProjectInformation';

const ProjectNavbar = ({
  project,
  currentUser,
  invitations,
}: {
  project: Project;
  currentUser: CurrentUser;
  invitations: any;
}) => {
  const [currentSection, setCurrentSection] = useState<string>('Project Board');
  const t = useTranslations('Project');

  return (
    <>
      <div className="sm:w-2/3 h-8 md:mt-20 mt-10 mx-auto flex justify-evenly md:text-2xl text-xl rounded-xl">
        <div
          className="group"
          onClick={() => setCurrentSection('Project Board')}
        >
          <div className="cursor-pointer">{t('projectboard')}</div>
          {currentSection === 'Project Board' ? (
            <div className="line h-px w-full bg-black mx-auto transition-all duration-300" />
          ) : (
            <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
          )}
        </div>
        <div className="group" onClick={() => setCurrentSection('Chat')}>
          <div className="cursor-pointer">Chat</div>
          {currentSection === 'Chat' ? (
            <div className="line h-px w-full bg-black mx-auto transition-all duration-300" />
          ) : (
            <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
          )}
        </div>
        <div
          className="group"
          onClick={() => setCurrentSection('Project Information')}
        >
          <div className="cursor-pointer">{t('projectinformation')}</div>
          {currentSection === 'Project Information' ? (
            <div className="line h-px w-full bg-black mx-auto transition-all duration-300" />
          ) : (
            <div className="line h-px group-hover:w-full w-0 bg-black mx-auto transition-all duration-300" />
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        {currentSection === 'Project Board' ? (
          <ProjectBoard />
        ) : currentSection === 'Chat' ? (
          <div>Chat</div>
        ) : currentSection === 'Project Information' ? (
          <ProjectInformation
            project={project}
            currentUser={currentUser}
            invitations={invitations}
          />
        ) : null}
      </div>
    </>
  );
};

export default ProjectNavbar;
