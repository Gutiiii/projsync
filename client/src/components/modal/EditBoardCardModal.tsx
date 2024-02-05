import { Card, Project } from '@/types/project.types';
import {
  ClockCircleOutlined,
  DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined,
  EditTwoTone,
} from '@ant-design/icons';
import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Button, Divider, Select, SelectItem } from '@nextui-org/react';
import Link from 'antd/es/typography/Link';
import { Text, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

interface EditProjectMemberModalProps {
  visible: boolean;
  handleOnClose: () => void;
  handleOnSubmit: (role: string, userProjectId: string) => void;
  handleOnRemove: (userProjectId: string) => void;
  card: Card;
  userRole: string;
}

const EditBoardCardModal: FC<EditProjectMemberModalProps> = ({
  visible,
  handleOnClose,
  handleOnRemove,
  handleOnSubmit,
  card,
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
        <ModalHeader>
          {card.title}
          <EditTwoTone className="ml-3 cursor-pointer " />
        </ModalHeader>
        <Divider className="-mb-1" />
        <ModalCloseButton onClick={handleOnClose} />
        <form onSubmit={() => console.log('SUBMIT')}>
          <ModalBody pb={6}>
            <div className="flex items-center my-2 text-center">
              <Text size={'15'} className="mr-2" />
              {card.description ? (
                <p>{card.description}</p>
              ) : (
                <Link className="text-sm">Add task description</Link>
              )}
              {card.description}
            </div>
            <Divider />
            <div className="flex items-center my-3">
              <ClockCircleOutlined className="mr-2" size={15} />
              {card.dueDate ? (
                <p>{card.dueDate}</p>
              ) : (
                <Link className="text-sm">Add due date</Link>
              )}
            </div>
            <Divider />
            <div className="flex items-center my-3">
              <ClockCircleOutlined className="mr-2" size={15} />
              {card.dueDate ? (
                <p>{card.dueDate}</p>
              ) : (
                <Link className="text-sm">Add due date</Link>
              )}
            </div>
            <Divider />
          </ModalBody>

          <footer className="flex justify-end mx-6 my-4">
            <div className="flex items-center text-red-500 cursor-pointer hover:text-opacity-80 transition-opacity duration-200">
              <Trash2 size={15} className="mr-2" />
              <p className="text-sm">Delete card</p>
              {/* {isRoleChanged && (
                <Button color="primary" className="mr-3" type="submit">
                  {t('safe')}
                </Button>
              )}
              <Button onClick={handleOnClose}>{t('cancel')}</Button> */}
            </div>
          </footer>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditBoardCardModal;
