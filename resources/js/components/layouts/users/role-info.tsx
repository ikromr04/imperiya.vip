import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import Tooltip from '@/components/ui/tooltip';
import { AppRoute } from '@/const';
import { User } from '@/types/users';
import React, { ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';

type RoleInfoProps = {
  user: User;
};

function RoleInfo({
  user,
}: RoleInfoProps): JSX.Element {
  let list: { [term: string]: ReactNode; } = {};

  switch (user.role.type) {
    case 'super-admin':

      break;
    case 'admin':

      break;
    case 'director':

      break;
    case 'teacher':

      break;
    case 'student':
      list = {
        'Класс': user.role.grade ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Classes.Show, { classId: user.role.grade?.id })}>
            {user.role.grade?.level} {user.role.grade?.group}
          </Link> : '-',
        'Мать': user.role.mother ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { userId: user.role.mother.id })}>
            {user.role.mother.name}
          </Link> : '-',
        'Отец': user.role.father ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { userId: user.role.father.id })}>
            {user.role.father.name}
          </Link> : '-',
      };
      break;
    case 'parent':
      list = {
        'Дети': user.role.children ? user.role.children.map((child) => (
          <>
            <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { userId: child.id })}>
              {child.name}
            </Link>
            <br />
          </>
        )) : '-',
      };
      break;
  }

  return (
    <section className="box">
      <header className="box__header">
        <h2 className="title !text-lg">{user.role.name}</h2>
        <Button variant="light">
          <Icons.edit width={14} height={14} />
          <Tooltip label="Редактировать" position="left" />
        </Button>
      </header>
      <div className="relative">
        <DescriptionList
          className="box__body"
          list={list}
        />
        <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
}

export default RoleInfo;
