import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import Tooltip from '@/components/ui/tooltip';
import { useAppSelector } from '@/hooks';
import { getAuthUser } from '@/store/auth-slice/auth-selector';
import React, { lazy, memo, ReactNode, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';

const UsersPhoneEditForm = lazy(() => import('@/components/forms/users/users-phone-edit-form'));

function PhoneNumbers(): ReactNode {
  const user = useAppSelector(getAuthUser);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return;

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="font-medium text-gray-900">Телефонные номера</h2>

          <Button variant="light" onClick={() => setIsOpen(true)}>
            <Icons.edit width={14} height={14} />
            <Tooltip label="Редактировать" position="left" />
          </Button>
        </header>

        <ul className="box__body flex flex-col gap-2">
          {user.phoneNumbers?.map(({ code, numbers }) => (
            <li key={numbers}>
              <Link className="flex items-center gap-2 w-max text-blue-600" to={`tel:+${code}${numbers}`}>
                <span className="flex items-center w-7 h-7 justify-center bg-blue-50 rounded text-success">
                  <Icons.phone width={16} height={16} />
                </span>
                +{code} {numbers}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <Suspense
            fallback={
              <div className="flex justify-center items-center p-4">
                <Spinner className="w-6 h-6" />
              </div>
            }
          >
            <UsersPhoneEditForm
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

export default memo(PhoneNumbers);
