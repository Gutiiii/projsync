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
import { useRouter } from 'next/navigation';
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
          <h1 className="text-2xl font-medium">Project Information</h1>
        </ModalHeader>{' '}
        <hr className="mx-4 " />
        <ModalCloseButton onClick={handleOnClose} />
        <ModalBody pb={6}>
          <p className="text-xl my-2 -mt-0.5 text-center font-semibold">
            {project.title}
          </p>
          <hr className="mx-4" />
          <p className="text-lg text-center mx-4 my-2">{project.description}</p>
          <hr className="mx-4 mb-4" />
          <div className="text-lg">
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
