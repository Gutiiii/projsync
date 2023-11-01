'use client';
import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import OpenProjectModal from '../modal/OpenProjectModal';
import { Progress } from '../ui/progress';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
  id: string;
  onOpen: (id: string) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  status,
  createdAt,
  id,
  onOpen,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const date = new Date(createdAt);
  const dateStr = date.toDateString();
  const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);

  const onClose = () => {
    setModalVisible(false);
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
        onClick={() => setModalVisible(true)}
      >
        <div className="flex justify-between ">
          <p className="text-xl font-bold">{title}</p>
          <Info
            color="blue"
            size={25}
            width={25}
            className="text-end mt-0.5 cursor-pointer hover:opacity-60 transition-opacity duration-200"
          />
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
    </>
  );
};

export default ProjectCard;
