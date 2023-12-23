'use client';
import { Project } from '@/types/project.types';
import React, { useState } from 'react';
import ProjectBoard from '../projects/ProjectBoard';
import ProjectInformation from '../projects/ProjectInformation';

const ProjectNavbar = ({ project }: { project: Project }) => {
  const [currentSection, setCurrentSection] = useState<string>('Project Board');

  return (
    <>
      <div className="sm:w-2/3 h-8 md:mt-20 mt-10 mx-auto flex justify-evenly md:text-2xl text-xl rounded-xl">
        <div
          className="group"
          onClick={() => setCurrentSection('Project Board')}
        >
          <div className="cursor-pointer">Project Board</div>
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
          <div className="cursor-pointer">Project Information</div>
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
          <ProjectInformation project={project} />
        ) : null}
      </div>
    </>
  );
};

export default ProjectNavbar;
