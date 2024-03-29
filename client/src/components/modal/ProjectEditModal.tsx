'use client';
import { useEditProject } from '@/hooks/projectHooks/useEditProject';
import { editProjectSchema } from '@/schemas/project.schema';
import { EditProjectFormData, ProjectCardType } from '@/types/project.types';
import {
  FormControl,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ProjectEditProps {
  handleOnClose: () => void;
  project: ProjectCardType;
  isEdit: boolean;
  changeIsEdit: () => void;
}

const ProjectEdit: FC<ProjectEditProps> = ({
  handleOnClose,
  project,
  isEdit,
  changeIsEdit,
}) => {
  const { data: session } = useSession();
  const t = useTranslations('Project');
  const router = useRouter();
  const [title, setTitle] = useState<string>(project.title);
  const [description, setDescription] = useState<string>(project.description);
  const [status, setStatus] = useState<string>(project.status);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const mutation = useMutation({ mutationFn: useEditProject });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectSchema),
  });

  const submitData = async (formData: EditProjectFormData) => {
    const title = formData['title'];
    const description = formData['description'];
    const token = session?.backendTokens.accessToken;
    const id = project.id;
    const values = {
      id,
      token,
      title,
      description,
      status,
    };
    await mutation.mutateAsync(values, {
      onSuccess: () => {
        router.refresh();
        toast.success('Project Edited');
        handleOnClose();
      },
      onError: () => {
        router.refresh();
        toast.error('Something went wrong', {
          description: 'Please try again later',
        });
        handleOnClose();
      },
    });
  };

  const resetForm = () => {
    setTitle(project.title);
    setDescription(project.description);
    setStatus(project.status);
    changeIsEdit();
    setIsChanged(false);
  };

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

  return (
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
                isInvalid={errors.title?.message !== undefined}
                errorMessage={errors.title?.message}
              />
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
                isInvalid={errors.description?.message !== undefined}
                errorMessage={errors.description?.message}
              />
            </FormControl>
          </div>
          <hr className="mx-4 mb-2" />
          <div className="text-lg text-center">
            <div className="">
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  isRequired
                  selectionMode="single"
                  defaultSelectedKeys={[project.status]}
                  size="sm"
                  onChange={(e) => setStatus(e.target.value)}
                  label="Change Project Status"
                >
                  <SelectItem
                    value="OPEN"
                    key={'OPEN'}
                    className="text-green-500"
                  >
                    OPEN
                  </SelectItem>
                  <SelectItem
                    value="CLOSED"
                    key={'CLOSED'}
                    className="text-red-500"
                  >
                    CLOSED
                  </SelectItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </ModalBody>
        <footer className="flex m-2 justify-end mx-[22px]">
          <div className="flex">
            {isChanged ? (
              <Button className="mr-3" color="primary" type="submit">
                {mutation.isLoading ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  <p>Save</p>
                )}
              </Button>
            ) : null}
            <Button
              onClick={() => {
                resetForm();
              }}
            >
              Discard Changes
            </Button>
          </div>
        </footer>
      </form>
    </>
  );
};

export default ProjectEdit;
