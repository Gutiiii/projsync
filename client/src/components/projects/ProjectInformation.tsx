import { Project } from '@/types/project.types';
import React from 'react';

const ProjectInformation = ({ project }: { project: Project }) => {
  return (
    <div className="">
      <div className="pr-8 text-3xl font-thin ">Project Information</div>
      <div>{project.title}</div>
    </div>
  );
};

export default ProjectInformation;
