'use client';

import { useDeleteProject } from '@/hooks/projectHooks/useDeleteProject';
import { ProjectCardType } from '@/types/project.types';
import { ModalBody, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { Button, Spinner } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { FileEdit, Lasso, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { toast } from 'sonner';

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
  const mutation = useMutation({ mutationFn: useDeleteProject });
  const { data: session } = useSession();
  const token = session?.backendTokens.accessToken;
  //TODO Add Modal for Delete Confirmation
  const deleteProject = () => {
    const id = project.id;
    const values = {
      id,
      token,
    };
    mutation.mutateAsync(values, {
      onSuccess: () => {
        handleOnClose();
        router.refresh();
        toast.success('Project Deleted');
      },
      onError: () => {
        handleOnClose();
        router.refresh();
        toast.error('Something went wrong', {
          description: 'Please try again later',
        });
      },
    });
  };
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
          <div className="flex items-center space-x-2">
            <div className="hover:rounded-full hover:bg-gray-300 active:bg-gray-400 active:scale-95 cursor-pointer p-1 mt-1 ">
              <FileEdit
                onClick={changeIsEdit}
                size={18}
                className="h-10 w-10 p-1"
              />
            </div>
            <div
              className={
                mutation.isLoading
                  ? ' mt-1 '
                  : 'hover:rounded-full hover:bg-gray-300 active:bg-gray-400 active:scale-95 cursor-pointer p-1 mt-1 '
              }
            >
              {mutation.isLoading ? (
                <Spinner size="md" className="mt-1 ml-1" />
              ) : (
                <Trash2
                  onClick={deleteProject}
                  size={18}
                  className="h-10 w-10 p-1"
                />
              )}
            </div>
          </div>
        )}

        <div className="flex">
          <Button
            className="mr-3"
            color="primary"
            onClick={() => router.push('/projects/' + project.id + '/board')}
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
