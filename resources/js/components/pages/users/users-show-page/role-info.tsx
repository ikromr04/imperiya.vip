import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import Tooltip from '@/components/ui/tooltip';
import { User } from '@/types/users';
import React from 'react';

type RoleInfoProps = {
  user: User;
};

function RoleInfo({
  user,
}: RoleInfoProps): JSX.Element {
  return (
    <section className="box">
      <header className="box__header">
        <h2 className="title !text-lg">{user.role.name}</h2>
        <Button variant="light">
          <Icons.edit width={14} height={14} />
          <Tooltip label="Редактировать" position="left" />
        </Button>
      </header>
      <div className="box__body">
        Нет данных
      </div>
    </section>
  );
}

export default RoleInfo;
