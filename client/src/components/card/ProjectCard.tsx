'use client';
import { ProjectCardType } from '@/types/project.types';
import { Eye, FileEdit, Info, User2 } from 'lucide-react';
import { FC, useState } from 'react';
import OpenProjectModal from '../modal/OpenProjectModal';
import ProjectInfoModal from '../modal/ProjectInfoModal';

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const date = new Date(createdAt);
  const dateStr = date.toDateString();
  const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);

  const onClose = () => {
    setModalVisible(false);
  };

  const onInfoClose = () => {
    setInfoModalVisible(false);
  };

  const onCardClick = (e: any) => {
    if (e.target.id === 'info') return setInfoModalVisible(true);
    setModalVisible(true);
  };

  const onSubmit = (id: string) => {
    onClose();
    onOpen(id);
  };

  // const startSimulatedProgress = () => {
  //   setOpenProgress(0);

  //   const interval = setInterval(() => {
  //     setOpenProgress((prevProgress) => {
  //       if (prevProgress >= 95) {
  //         clearInterval(interval);
  //         return prevProgress;
  //       }
  //       return prevProgress + 5;
  //     });
  //   }, 500);

  //   return interval;
  // };

  return (
    <>
      <div
        className={
          status === 'OPEN'
            ? 'px-4 border-2 pt-4  rounded-xl shadow-xl w-80 h-80 cursor-pointer hover:bg-gray-300 transition-background duration-200 border-black'
            : 'px-4 border-2 pt-4  rounded-xl shadow-xl w-80 h-80 cursor-pointer hover:bg-gray-300 transition-background duration-200 border-red-700'
        }
        onClick={(e) => onCardClick(e)}
      >
        <div className="flex justify-between ">
          <p className="text-xl font-bold">{title}</p>
          <div className="flex space-x-2">
            {role === 'CREATOR' ? (
              <User2 size={26} />
            ) : role === 'VIEWER' ? (
              <Eye className="" size={28} />
            ) : role === 'EDITOR' ? (
              <FileEdit className="mt-0.5" />
            ) : null}
            <Info
              id="info"
              color="blue"
              size={25}
              width={25}
              className="text-end mt-0.5 cursor-pointer hover:opacity-50 transition-opacity duration-200"
            />
          </div>
        </div>
        <p className="text-lg mt-12">{description}</p>
        <p>Created At: {dateWithoutWeekday}</p>
      </div>
      <OpenProjectModal
        visible={modalVisible}
        handleOnClose={onClose}
        handleOnSubmit={onSubmit}
        id={id}
      />
      <ProjectInfoModal
        project={project}
        visible={infoModalVisible}
        handleOnClose={onInfoClose}
      />
    </>
  );
};

export default ProjectCard;
