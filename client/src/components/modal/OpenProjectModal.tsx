'use client';
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
import React, { FC } from 'react';

interface CreateProjectModalProps {
  visible: boolean;
  id: string;
  handleOnClose: () => void;
  handleOnSubmit: (id: string) => void;
}

const OpenProjectModal: FC<CreateProjectModalProps> = ({
  visible,
  handleOnClose,
  handleOnSubmit,
  id,
}) => {
  return (
    <Modal isOpen={visible} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open This Project?</ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <ModalBody pb={6}></ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => handleOnSubmit(id)}>
            Proceed
          </Button>
          <Button onClick={handleOnClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OpenProjectModal;
