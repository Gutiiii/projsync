import { createProjectSchema } from '@/schemas/project.schema';
import { CreateProjectFormData } from '@/types/project.types';
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
import { Button, Input, Textarea } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

interface CreateProjectModalProps {
  visible: boolean;
  handleOnClose: () => void;
  handleOnSubmit: (title: string, description: string) => void;
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({
  visible,
  handleOnClose,
  handleOnSubmit,
}) => {
  const t = useTranslations('Project');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });

  const submitData = async (formData: CreateProjectFormData) => {
    const title = formData['title'];
    const description = formData['description'];
    handleOnSubmit(title, description);
  };

  return (
    <Modal isOpen={visible} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modalheader')}</ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <form onSubmit={handleSubmit(submitData)}>
          <ModalBody pb={6}>
            <div className="">
              <div className="">
                <FormControl className="mb-2">
                  <FormLabel>{t('title')}</FormLabel>
                  <Input
                    isRequired
                    size="sm"
                    label={t('title')}
                    type="text"
                    {...register('title')}
                    isInvalid={errors.title?.message !== undefined}
                    errorMessage={errors.title?.message}
                  />
                </FormControl>
              </div>
              <div className="w-full">
                <FormControl className="mb-2">
                  <FormLabel>{t('description')}</FormLabel>
                  <Textarea
                    isRequired
                    label={t('description')}
                    placeholder="Enter your description"
                    className="w-full"
                    {...register('description')}
                    isInvalid={errors.description?.message !== undefined}
                    errorMessage={errors.description?.message}
                  />
                </FormControl>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" className="mr-3" type="submit">
              {t('create')}
            </Button>
            <Button onClick={handleOnClose}>{t('cancel')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectModal;
