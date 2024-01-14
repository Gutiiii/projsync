import { editProjectSchema } from '@/schemas/project.schema';
import { EditProjectFormData, ProjectCardType } from '@/types/project.types';
import {
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { FileEdit, Pencil, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../error/FormError';

interface ProjectInfoModalProps {
  project: ProjectCardType;
  visible: boolean;
  handleOnClose: () => void;
}

const ProjectInfoModal: FC<ProjectInfoModalProps> = ({
  project,
  visible,
  handleOnClose,
}) => {
  const t = useTranslations('Project');
  const { data: session } = useSession();
  const date = new Date(project.createdAt);
  const dateStr = date.toDateString();
  const router = useRouter();
  const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);
  const [title, setTitle] = useState<string>(project.title);
  const [description, setDescription] = useState<string>(project.description);
  const [status, setStatus] = useState<string>(project.status);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const userProject = project.userProject.find(
    (entry) => entry.userId === session?.user.id,
  );

  if (!userProject) return null;

  const role = userProject.role;

  useEffect(() => {
    setIsChanged(
      title !== project.title ||
        description !== project.description ||
        status !== project.status,
    );
  }, [
    title,
    description,
    status,
    project.title,
    project.description,
    project.status,
  ]);
  console.log(isChanged);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectSchema),
  });

  const submitData = async (formData: EditProjectFormData) => {
    console.log('SUBMIT');
    const title = formData['title'];
    const description = formData['description'];
    console.log(title, description, status);
    // setTitle('');
    // setDescription('');
    // setStatus('');
  };

  return (
    <Modal
      isOpen={visible}
      onClose={() => {
        setTitle('');
        setDescription('');
        setStatus('');
        setIsChanged(false);
        setIsEdit(false);
        handleOnClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        {isEdit ? (
          <>
            <ModalHeader>
              <h1 className="text-2xl font-medium">Edit Project</h1>
            </ModalHeader>{' '}
            <hr className="mx-4 " />
            <ModalCloseButton onClick={handleOnClose} />
            <form onSubmit={handleSubmit(submitData)}>
              <ModalBody pb={6}>
                <div className="">
                  <FormControl className="mb-2">
                    <FormLabel>{t('title')}</FormLabel>
                    <Input
                      isRequired
                      size="sm"
                      defaultValue={project.title}
                      label={t('title')}
                      type="text"
                      {...register('title')}
                      onChange={(e) => setTitle(e.target.value)}
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <FormError
                        variant="createproject"
                        error={errors.title.message}
                      />
                    )}
                  </FormControl>
                </div>
                <hr className="mx-4" />
                <div className="w-full">
                  <FormControl className="mb-2">
                    <FormLabel className="mt-2">{t('description')}</FormLabel>
                    <Textarea
                      isRequired
                      label={t('description')}
                      placeholder="Enter your description"
                      defaultValue={project.description}
                      className="w-full"
                      {...register('description')}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <FormError
                        variant="createproject"
                        className="min-w-full"
                        error={errors.description.message}
                      />
                    )}
                  </FormControl>
                </div>
                <hr className="mx-4 mb-2" />
                <div className="text-lg text-center">
                  <div className="">
                    <FormControl>
                      <FormLabel>STATUS</FormLabel>
                      <Select
                        isRequired
                        selectionMode="single"
                        defaultSelectedKeys={[project.status]}
                        size="sm"
                        onChange={(e) => setStatus(e.target.value)}
                        label="Change Project Status"
                      >
                        <SelectItem value="OPEN" key={'OPEN'}>
                          OPEN
                        </SelectItem>
                        <SelectItem value="CLOSED" key={'CLOSED'}>
                          CLOSED
                        </SelectItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </ModalBody>
              {/* TODO Make that when isEdit is true save and discard are justify-end */}
              <footer
                className={
                  role === 'CREATOR'
                    ? 'flex m-2 justify-between mx-4'
                    : isEdit
                    ? 'flex m-2 justify-end'
                    : 'flex m-2 justify-end mx-4'
                }
              >
                {role === 'CREATOR' && !isEdit && (
                  <div className="flex items-center space-x-3">
                    {' '}
                    <FileEdit
                      onClick={() => setIsEdit(true)}
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
                  {isChanged ? (
                    <Button className="mr-3" color="primary" type="submit">
                      Save
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => {
                      setIsEdit(false);
                      setIsChanged(false);
                      setTitle('');
                      setDescription('');
                      setStatus('');
                    }}
                  >
                    Discard Changes
                  </Button>
                </div>
              </footer>
            </form>
          </>
        ) : (
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
              <p className="text-lg text-center mx-4 my-2">
                {project.description}
              </p>
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
              {/* TODO Remove FIleEdit & TRash when isEdit not working yet */}
              {role === 'CREATOR' && (
                <div className="flex items-center space-x-3">
                  {' '}
                  <FileEdit
                    onClick={() => setIsEdit(true)}
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
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProjectInfoModal;
