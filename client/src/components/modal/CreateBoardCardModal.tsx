import { createBoardCardSchema } from '@/schemas/project.schema';
import { CreateBoardCardFormData } from '@/types/project.types';
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
  listId: string;
  handleOnClose: () => void;
  handleOnSubmit: (listId: string, title: string) => void;
}

const CreateBoardCardModal: FC<CreateProjectModalProps> = ({
  visible,
  listId,
  handleOnClose,
  handleOnSubmit,
}) => {
  const t = useTranslations('Project');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateBoardCardFormData>({
    resolver: zodResolver(createBoardCardSchema),
  });

  const submitData = async (formData: CreateBoardCardFormData) => {
    const title = formData['title'];
    handleOnSubmit(listId, title);
  };

  return (
    <Modal isOpen={visible} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Card</ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <form onSubmit={handleSubmit(submitData)}>
          <ModalBody pb={6}>
            <div className="">
              <div className="">
                <FormControl className="mb-2">
                  <FormLabel>{t('title')}</FormLabel>
                  <Input
                    autoFocus
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

export default CreateBoardCardModal;
