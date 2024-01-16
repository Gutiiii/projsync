'use client';
import { ProjectCardType } from '@/types/project.types';
import { ModalBody, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { Button } from '@nextui-org/react';
import { FileEdit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ProjectInfoProps {
  handleOnClose: () => void;
  project: ProjectCardType;
  role: string;
  changeIsEdit: () => void;
}
const ProjectInfo: FC<ProjectInfoProps> = ({
  handleOnClose,
  project,
  role,
  changeIsEdit,
}) => {
  const date = new Date(project.createdAt);
  const dateStr = date.toDateString();
  const router = useRouter();
  const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);
  return (
    <>
      <ModalHeader>
        <h1 className="text-2xl font-medium">Project Information</h1>
      </ModalHeader>{' '}
      <hr className="mx-4 " />
      <ModalCloseButton onClick={handleOnClose} />
      <ModalBody pb={6}>
        <p className="text-xl my-2 -mt-0.5 text-center font-semibold">
          {project.title}
        </p>
        <hr className="mx-4" />
        <p className="text-lg text-center mx-4 my-2">{project.description}</p>
        <hr className="mx-4 mb-4" />
        <div className="text-lg text-center">
          <p>Created: {dateWithoutWeekday}</p>
          <p className="flex justify-center">
            Role: <p className="font-bold ml-1">{role}</p>
          </p>
          <div className="flex space-x-1 justify-center">
            <p>Status: </p>
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
      </ModalBody>
      <footer
        className={
          role === 'CREATOR'
            ? 'flex m-2 justify-between mx-4'
            : 'flex m-2 justify-end mx-4'
        }
      >
        {role === 'CREATOR' && (
          <div className="flex items-center space-x-3">
            {' '}
            <FileEdit
              onClick={changeIsEdit}
              size={18}
              className="h-10 w-10 hover:rounded-full hover:bg-gray-300 active:bg-gray-400 active:scale-95 cursor-pointer p-1 mt-1 mx-2"
            />
            <Trash2
              size={18}
              className="h-10 w-10 hover:rounded-full hover:bg-gray-300 active:bg-gray-400 active:scale-95 cursor-pointer p-1 mt-1 mx-2 "
            />
          </div>
        )}

        <div className="flex">
          <Button
            className="mr-3"
            color="primary"
            onClick={() => router.push('/projects/' + project.id)}
          >
            Open Project
          </Button>
          <Button onClick={handleOnClose}>Close</Button>{' '}
        </div>
      </footer>
    </>
  );
};

export default ProjectInfo;
