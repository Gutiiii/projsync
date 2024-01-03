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
import { Button, Input } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../error/FormError';

interface EditProjectMemberModalProps {
  visible: boolean;
  handleOnClose: () => void;
  handleOnSubmit: (title: string, description: string) => void;
}

const EditProjectMemberModal: FC<EditProjectMemberModalProps> = ({
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
              <div className="">
                <FormControl className="mb-2">
                  <FormLabel>{t('description')}</FormLabel>
                  <Input
                    isRequired
                    size="sm"
                    label={t('description')}
                    type="text"
                    className={errors.description ? 'border-red-500' : ''}
                    {...register('description')}
                  />
                  {errors.description && (
                    <FormError
                      variant="createproject"
                      error={errors.description.message}
                    />
                  )}
                </FormControl>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" className="mr-3" type="submit">
              {t('create')}
            </Button>
            <Button onClick={handleOnClose}>{t('cancle')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditProjectMemberModal;
