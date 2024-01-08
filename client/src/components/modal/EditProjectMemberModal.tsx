import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

interface EditProjectMemberModalProps {
  visible: boolean;
  handleOnClose: () => void;
  handleOnSubmit: (role: string, userProjectId: string) => void;
  handleOnRemove: (userProjectId: string) => void;
  userProjectId: string;
  userRole: string;
}

const EditProjectMemberModal: FC<EditProjectMemberModalProps> = ({
  visible,
  handleOnClose,
  handleOnRemove,
  handleOnSubmit,
  userProjectId,
  userRole,
}) => {
  const t = useTranslations('EditMemberModal');

  const [role, setRole] = useState<string>(userRole);
  const [isRoleChanged, setIsRoleChanged] = useState<boolean>(false);

  useEffect(() => {
    setIsRoleChanged(role !== userRole);
  }, [role, userRole]);

  return (
    <Modal isOpen={visible} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('header')}</ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <form onSubmit={() => handleOnSubmit(role, userProjectId)}>
          <ModalBody pb={6}>
            <div className="">
              <div className="">
                <FormControl>
                  <Select
                    isRequired
                    selectionMode="single"
                    defaultSelectedKeys={[userRole]}
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

          <footer className="flex justify-between mx-6 my-4">
            <div>
              <Button
                color="danger"
                className=""
                onClick={() => handleOnRemove(userProjectId)}
              >
                Remove{' '}
              </Button>
            </div>
            <div>
              {isRoleChanged && (
                <Button color="primary" className="mr-3" type="submit">
                  {t('safe')}
                </Button>
              )}
              <Button onClick={handleOnClose}>{t('cancel')}</Button>
            </div>
          </footer>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditProjectMemberModal;
