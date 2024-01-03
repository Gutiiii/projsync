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
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

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
  const t = useTranslations('EditMemberModal');
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
        <ModalHeader>{t('header')}</ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <form onSubmit={handleSubmit(submitData)}>
          <ModalBody pb={6}>
            <div className="">
              <div className="">
                <FormControl>
                  <Select
                    isRequired
    defaultSelectedKeys={React.}
                    size="sm"
                    onChange={(e: any) => setRole(e.target.value)}
                    label="Select a Role"
                  >
                    <SelectItem value="EDITOR" key={'EDITOR'}>
                      {t('select1')}
                    </SelectItem>
                    <SelectItem value="VIEWER" key={'VIEWER'}>
                      {t('select2')}
                    </SelectItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" className="mr-3" type="submit">
              {t('safe')}
            </Button>
            <Button onClick={handleOnClose}>{t('cancel')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditProjectMemberModal;
