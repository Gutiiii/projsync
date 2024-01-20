'use client';
import { ProjectCardType } from '@/types/project.types';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import ProjectEdit from './ProjectEditModal';
import ProjectInfo from './ProjectInfoModal';

interface ProjectModalProps {
  project: ProjectCardType;
  visible: boolean;
  handleOnClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({
  project,
  visible,
  handleOnClose,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const userProject = project.userProject.find(
    (entry) => entry.userId === session?.user.id,
  );

  if (!userProject) {
    router.push('/projects');
    return null;
  }

  const role = userProject.role;

  const handleChangeIsEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Modal
      isOpen={visible}
      onClose={() => {
        handleOnClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        {isEdit ? (
          <ProjectEdit
            handleOnClose={handleOnClose}
            project={project}
            isEdit={isEdit}
            changeIsEdit={handleChangeIsEdit}
          />
        ) : (
          <>
            <ProjectInfo
              handleOnClose={handleOnClose}
              project={project}
              role={role}
              changeIsEdit={handleChangeIsEdit}
            />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
