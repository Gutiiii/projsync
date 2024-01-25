'use client';
import { ProjectCardType } from '@/types/project.types';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from '@nextui-org/react';

import { Eye, FileEdit, Info, User2 } from 'lucide-react';
import { FC, useState } from 'react';
import ProjectModal from '../modal/ProjectModal';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
  id: string;
  role: 'CREATOR' | 'EDITOR' | 'VIEWER';
  onOpen: (id: string) => void;
  project: ProjectCardType;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  status,
  createdAt,
  id,
  onOpen,
  role,
  project,
}) => {
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const date = new Date(createdAt);
  const dateStr = date.toDateString();
  const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);

  const onClose = () => {
    setInfoModalVisible(false);
  };

  const onCardClick = (e: any) => {
    setInfoModalVisible(true);
  };

  const onSubmit = (id: string) => {
    onClose();
    onOpen(id);
  };

  return (
    <>
      <div onClick={(e) => onCardClick(e)}>
        <Card
          className={
            status === 'OPEN'
              ? 'px-4 border-2 pt-4  rounded-xl shadow-xl w-80 h-60 cursor-pointer hover:bg-gray-300 transition-background duration-200 border-black'
              : 'px-4 border-2 pt-4  rounded-xl shadow-xl w-80 h-60 cursor-pointer hover:bg-gray-300 transition-background duration-200 border-red-700'
          }
        >
          <CardHeader className="flex justify-between">
            <p className="text-xl font-bold">{title}</p>
            <div className="flex space-x-2">
              {role === 'CREATOR' ? (
                <User2 size={26} />
              ) : role === 'VIEWER' ? (
                <Eye className="" size={28} />
              ) : role === 'EDITOR' ? (
                <FileEdit className="mt-0.5" />
              ) : null}
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{description}</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p>Created: {dateWithoutWeekday}</p>
          </CardFooter>
        </Card>
      </div>

      {infoModalVisible && (
        <ProjectModal
          project={project}
          visible={infoModalVisible}
          handleOnClose={onClose}
        />
      )}
    </>
  );
};

export default ProjectCard;
