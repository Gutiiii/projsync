'use client';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

import React, { FC, useState } from 'react';

interface ForgotPasswordModalProps {
  visible: boolean;
  handleOnClose: () => void;
  handleOnSubmit: (email: string, role: 'EDITOR' | 'VIEWER') => void;
}

const InviteMemberModal: FC<ForgotPasswordModalProps> = ({
  visible,
  handleOnClose,
  handleOnSubmit,
}) => {
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<'EDITOR' | 'VIEWER'>('EDITOR');
  const t = useTranslations('Project');
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
                required
                placeholder="E-Mail"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Select
                size="md"
                required
                onChange={(e: any) => setRole(e.target.value)}
                defaultValue={1}
              >
                <option value={1} disabled>
                  {t('selectheader')}
                </option>
                <option value="EDITOR">{t('select2')}</option>
                <option value="VIEWER">{t('select3')}</option>
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

            <Button onClick={handleOnClose}>{t('cancle')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default InviteMemberModal;
