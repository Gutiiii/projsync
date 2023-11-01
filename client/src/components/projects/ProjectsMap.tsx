'use client';
import { ProjectCardType } from '@/types/project.types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import ProjectCard from '../card/ProjectCard';

interface ProjectsMapProps {
  projects: any[];
  search: string;
}

const ProjectsMap: FC<ProjectsMapProps> = ({ projects, search }) => {
  const [isOpening, setIsOpening] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const showClosed = searchParams.get('showClosed') === 'true';
  const titleAsc = searchParams.get('sortOrder') === 'title-asc';
  const titleDesc = searchParams.get('sortOrder') === 'title-desc';
  const dateAsc = searchParams.get('sortOrder') === 'date-asc';
  const dateDesc = searchParams.get('sortOrder') === 'date-desc';

  const filteredProjects = () => {
    if (showClosed) {
      return projects.filter((project: ProjectCardType) => {
        return search.toLowerCase() === ''
          ? project
          : project.title.toLowerCase().includes(search.toLowerCase());
      });
    } else {
      return projects
        .filter((project: ProjectCardType) => {
          return search.toLowerCase() === ''
            ? project
            : project.title.toLowerCase().includes(search.toLowerCase());
        })
        .filter((project: ProjectCardType) => project.status !== 'CLOSED');
    }
  };

  const sortedProjects = () => {
    if (titleAsc) {
      return sortProjectByTitleAscending(filteredProjects());
    } else if (titleDesc) {
      return sortProjectByTitleDescending(filteredProjects());
    } else if (dateAsc) {
      return sortProjectByCreatedAtAscending(filteredProjects());
    } else if (dateDesc) {
      return sortProjectByCreatedAtDescending(filteredProjects());
    } else {
      return filteredProjects();
    }
  };

  const sortProjectByTitleAscending = (object: ProjectCardType[]) => {
    return object.sort((a, b) => {
      const titleA = a.title.toUpperCase(); // Convert titles to uppercase for case-insensitive sorting
      const titleB = b.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
  };

  const sortProjectByTitleDescending = (object: ProjectCardType[]) => {
    return object.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      if (titleA > titleB) {
        return -1;
      }
      if (titleA < titleB) {
        return 1;
      }
      return 0;
    });
  };

  const sortProjectByCreatedAtAscending = (object: ProjectCardType[]) => {
    return object.sort((a, b) => {
      const createdAtA = a.createdAt;
      const createdAtB = b.createdAt;

      if (createdAtA < createdAtB) {
        return -1;
      }
      if (createdAtA > createdAtB) {
        return 1;
      }
      return 0;
    });
  };

  const sortProjectByCreatedAtDescending = (object: ProjectCardType[]) => {
    return object.sort((a, b) => {
      const createdAtA = a.createdAt;
      const createdAtB = b.createdAt;

      if (createdAtA > createdAtB) {
        return -1;
      }
      if (createdAtA < createdAtB) {
        return 1;
      }
      return 0;
    });
  };

  const openingProject = (id: string) => {
    router.push('/projects/' + id);
  };

  return (
    <div className="relative">
      {filteredProjects().length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1">
          {sortedProjects().map((project: ProjectCardType) => (
            <ProjectCard
              createdAt={project.createdAt}
              status={project.status}
              title={project.title}
              description={project.description}
              role={project.userProject[0].role}
              id={project.id}
              key={project.id}
              onOpen={openingProject}
            />
          ))}
        </div>
      ) : (
        <div className="text-xl mt-2">No Projects Found</div>
      )}
      {/* {isOpening ? (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black">
          <Progress
            // indicatorColor={openProgress === 100 ? 'bg-green-500' : ''}
            // value={openProgress}
            value={50}
            className="relative backdrop-blur-md"
          />
        </div>
      ) : null} */}
    </div>
  );
};

export default ProjectsMap;
