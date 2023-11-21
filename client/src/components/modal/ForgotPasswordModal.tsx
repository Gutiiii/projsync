'use client';
import { Input } from '@/components/ui/input';
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

import React, { FC, useState } from 'react';

interface ForgotPasswordModalProps {
  visible: boolean;
  handleOnClose: () => void;
  handleOnSubmit: (email: string) => void;
}

const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({
  visible,
  handleOnClose,
  handleOnSubmit,
}) => {
  const [email, setEmail] = useState<string>('');
  return (
    <Modal isOpen={visible} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forgot Password?</ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <ModalBody pb={6}>
          <p className="ml-1">Input your E-Mail Adresse.</p>
          <FormControl className="mb-2 mt-4">
            <Input
              placeholder="E-Mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              setEmail('');
              handleOnSubmit(email);
            }}
          >
            Submit
          </Button>
          <Button onClick={handleOnClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordModal;
