'use client';
import { Checkbox } from '@nextui-org/react';
import { FC } from 'react';

interface ShowClosedProjectsProps {}

const ShowClosedProjects: FC<ShowClosedProjectsProps> = ({}) => {
  return <Checkbox radius="full">Show Closed Projects</Checkbox>;
};

export default ShowClosedProjects;
