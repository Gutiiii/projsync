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
import { useTranslations } from 'next-intl';
import { FC } from 'react';

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
  const t = useTranslations('Create');
  const date = new Date(project.createdAt);
  const dateStr = date.toDateString();
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
          <p>Role: {project.userProject['0'].role}</p>
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
          <Button onClick={handleOnClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectInfoModal;
