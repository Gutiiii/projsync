'use client';
import React, { FC, useState } from 'react';
import CreateProjectButton from './CreateProjectButton';
import ProjectsMap from './ProjectsMap';
import SearchProject from './SearchProject';
import ShowClosedProjects from './ShowClosedProjects';
import SortProjects from './SortProjects';

interface ProjectsProps {
  projects: any;
}

const Projects: FC<ProjectsProps> = ({ projects }) => {
  const [search, setSearch] = useState<string>('');

  const onChangeSearch = (value: string) => {
    setSearch(value);
  };
  return (
    <>
      <div className="flex justify-evenly mt-20 mb-8">
        <CreateProjectButton />
        <SearchProject onChange={onChangeSearch} />
        <div className="sm:flex space-x-2 grid grid-cols-1">
          <ShowClosedProjects />
          <SortProjects />
        </div>
      </div>
      <div className="flex justify-center">
        <ProjectsMap projects={projects} search={search} />
      </div>
    </>
  );
};

export default Projects;
