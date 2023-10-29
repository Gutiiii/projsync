import { Input } from '@/components/ui/input';
import { createProjectSchema } from '@/schemas/project.schema';
import { CreateProjectFormData } from '@/types/project.types';
import {
  Button,
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
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../error/FormError';

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
        <ModalHeader>Passwort ändern</ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <form onSubmit={handleSubmit(submitData)}>
          <ModalBody pb={6}>
            <div className="">
              <div className="">
                <FormControl className="mb-2">
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
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
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Description"
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
            <Button colorScheme="blue" mr={3} type="submit">
              Erstellen
            </Button>
            <Button onClick={handleOnClose}>Abbrechen</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectModal;
