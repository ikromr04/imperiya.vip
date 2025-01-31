import UsersSocialLinksEditForm from '@/components/forms/users/users-social-links-edit-form';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import Tooltip from '@/components/ui/tooltip';
import { User } from '@/types/users';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type SocialLinksProps = {
  user: User;
}

function SocialLinks({
  user,
}: SocialLinksProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="font-medium text-gray-900">Социальные сети</h2>

          <Button variant="light" onClick={() => setIsOpen(true)}>
            <Icons.edit width={14} height={14} />
            <Tooltip label="Редактировать" position="left" />
          </Button>
        </header>

        <div className="box__body flex flex-wrap gap-2">
          {user.socialLink?.facebook &&
            <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.socialLink.facebook} target="_blank">
              <Icons.facebook width={24} height={24} />
            </Link>}
          {user.socialLink?.instagram &&
            <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.socialLink?.instagram} target="_blank">
              <Icons.instagram width={24} height={24} />
            </Link>}
          {user.socialLink?.telegram &&
            <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.socialLink?.telegram} target="_blank">
              <Icons.telegram width={24} height={24} />
            </Link>}
          {user.socialLink?.odnoklassniki &&
            <Link className="flex shadow-md rounded-full transition-all duration-300 hover:shadow-none" to={user.socialLink?.odnoklassniki} target="_blank">
              <Icons.odnoklassniki width={24} height={24} />
            </Link>}
        </div>
      </section>

      <Modal isOpen={isOpen}>
        <UsersSocialLinksEditForm user={user} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}

export default SocialLinks;
