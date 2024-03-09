'use client';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Snippet,
} from '@nextui-org/react';

import React, { useState } from 'react';

const EasyLink = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <Button color="primary" onClick={() => setModalOpen(true)}>
        Easy Link
      </Button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Easy Link
              </ModalHeader>
              <ModalBody>
                <div className="flex">
                  <Snippet size="sm" symbol="" className="mx-auto mb-6">
                    https://public.projsync.io/123123123
                  </Snippet>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EasyLink;
