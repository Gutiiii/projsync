'use client';
import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { Input, Select, SelectItem } from '@nextui-org/react';

import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

import React, { FC, useState } from 'react';

interface InviteMemberModalProps {
  visible: boolean;
  handleOnClose: () => void;
  handleOnSubmit: (email: string, role: 'EDITOR' | 'VIEWER') => void;
}

const InviteMemberModal: FC<InviteMemberModalProps> = ({
  visible,
  handleOnClose,
  handleOnSubmit,
}) => {
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<'EDITOR' | 'VIEWER'>('EDITOR');
  const t = useTranslations('Project');
  //TODO Change to react Form for Email required
  return (
    <Modal isOpen={visible} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('inviteheader')}</ModalHeader>
        <ModalCloseButton onClick={handleOnClose} />
        <form>
          <ModalBody pb={6}>
            <p className="ml-1">{t('inputemail')}</p>

            <FormControl className="mb-2 mt-4">
              <Input
                isRequired
                size="sm"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Select
                isRequired
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
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              className="mr-3 cursor-pointer"
              onClick={() => {
                setEmail('');
                handleOnSubmit(email, role);
              }}
            >
              {t('sendinvite')}
            </Button>

            <Button onClick={handleOnClose}>{t('cancel')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default InviteMemberModal;
