import ProjectBoard from '@/components/projects/ProjectBoard';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Board · ProjSync',
  description:
    'Project Sync let&apos;s you seemlessly communicate with your clients.',
};
const ProjectBoardPage = () => {
  return <ProjectBoard />;
};

export default ProjectBoardPage;
