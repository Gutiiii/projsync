'use client';
import { CurrentUser, Project } from '@/types/project.types';
import React from 'react';
import ProjectsMember from './ProjectsMember';

const ProjectInformation = ({
  project,
  currentUser,
}: {
  project: Project;
  currentUser: CurrentUser;
}) => {
  const date = new Date(project.createdAt);
  const dateStr = date.toDateString();
  const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);

  return (
    <div className="border-2 border-gray-300 lg:w-2/4 md:w-3/4 rounded-md shadow-xl mx-2 lg:mx-0 p-2">
      <div className="sm:pr-8 text-3xl font-thin text-center">
        Project Information
      </div>
      <div className="grid sm:grid-cols-2">
        <div>
          <p className="text-2xl font-semibold text-center mt-6">
            {project.title}
          </p>
          <p className="text-center mt-5 mx-6 text-lg">{project.description}</p>
          <div className="flex justify-center font-bold mt-5 mb-2 text-xl">
            <p className="mr-2">CREATED:</p>{' '}
            <p className="text-center">{dateWithoutWeekday}</p>
          </div>
          <div className="flex justify-center font-bold text-xl">
            <p className="mr-2">STATUS: </p>
            <p
              className={
                project.status === 'OPEN'
                  ? 'text-md font-bold text-green-500'
                  : 'text-md font-bold text-red-500'
              }
            >
              {project.status}
            </p>
          </div>
        </div>

        <div className="text-center sm:mt-6 mt-12">
          <ProjectsMember
            projectMembers={project.userProject}
            role={currentUser.role}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
