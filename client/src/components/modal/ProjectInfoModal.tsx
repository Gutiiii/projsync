import env from '@/lib/env';
import { ProjectCardType } from '@/types/project.types';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Resend } from 'resend';
import { ChangePasswordEmail } from '../../../../react-email/emails/ChangePasswordEmail';

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
  // const t = useTranslations('Create');
  const date = new Date(project.createdAt);
  const dateStr = date.toDateString();
  const router = useRouter();
  const dateWithoutWeekday = dateStr.substring(dateStr.indexOf(' ') + 1);

  return (
    <Modal isOpen={visible} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h1 className="text-2xl">Project Information</h1>{' '}
        </ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <ModalBody pb={6}>
          <p className="text-xl mb-4">Project Title: {project.title}</p>

          <p className="font-light text-lg">{project.description}</p>
          <p>Created on: {dateWithoutWeekday}</p>
          <p className="flex">
            Role:{' '}
            <p className="font-bold ml-1">{project.userProject['0'].role}</p>
          </p>
          <div className="flex space-x-1">
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
        </ModalBody>
        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} type="submit">
            {t('create')}
          </Button> */}
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => router.push('/projects/' + project.id)}
          >
            Open Project
          </Button>
          <Button onClick={handleOnClose}>Close</Button>{' '}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectInfoModal;
