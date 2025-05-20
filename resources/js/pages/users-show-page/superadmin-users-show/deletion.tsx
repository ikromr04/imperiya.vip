import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import { User } from '@/types/users';
import React, { lazy, Suspense, useState } from 'react';

const UsersDeleteForm = lazy(() => import('@/components/forms/users/users-delete-form'));

type DeletionProps = {
  user: User;
};

function Deletion({
  user,
}: DeletionProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>
        <Icons.delete width={14} height={14} />
        Удалить пользователья
      </Button>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <Suspense fallback={<Spinner className="w-8 h-8" />}>
            <UsersDeleteForm
              key={isOpen.toString()}
              user={user}
              setIsOpen={setIsOpen}
            />
          </Suspense>
        </Modal>
      )}
    </>
  );
}

export default Deletion;
