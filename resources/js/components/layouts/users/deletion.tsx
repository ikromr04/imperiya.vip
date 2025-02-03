import UsersDeleteForm from '@/components/forms/users/users-delete-form';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { User } from '@/types/users';
import React, { useState } from 'react';

type DeletionProps = {
  user: User;
};

function Deletion({
  user,
}: DeletionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="error"
        onClick={() => setIsOpen(true)}
      >
        <Icons.delete width={14} height={14} />
        Удалить пользователья
      </Button>
      <Modal isOpen={isOpen}>
        <UsersDeleteForm user={user} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}

export default Deletion;
