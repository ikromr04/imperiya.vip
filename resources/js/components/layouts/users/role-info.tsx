import RoleEditForm from '@/components/forms/users/role-edit-form/role-edit-form';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import Modal from '@/components/ui/modal';
import Tooltip from '@/components/ui/tooltip';
import { AppRoute } from '@/const/routes';
import { RoleName } from '@/const/users';
import { User } from '@/types/users';
import React, { Fragment, ReactNode, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

type RoleInfoProps = {
  user: User;
};

function RoleInfo({
  user,
}: RoleInfoProps): JSX.Element {
  let list: { [term: string]: ReactNode; } = {};
  const [isOpen, setIsOpen] = useState(false);

  switch (true) {
    case user.superadmin !== undefined:

      break;
    case user.admin !== undefined:

      break;
    case user.director !== undefined:

      break;
    case user.teacher !== undefined:

      break;
    case user.student !== undefined:
      list = {
        'Класс': user.student.grade ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Classes.Show, { classId: user.student.grade?.id })}>
            {user.student.grade?.level} {user.student.grade?.group}
          </Link> : '-',
        'Мать': user.student.mother ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { userId: user.student.mother.id })}>
            {user.student.mother.name}
          </Link> : '-',
        'Отец': user.student.father ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { userId: user.student.father.id })}>
            {user.student.father.name}
          </Link> : '-',
      };
      break;
    case user.parent !== undefined:
      list = {
        'Дети': user.parent.children ? user.parent.children.map((child) => (
          <Fragment key={child.toString()}>
            <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { userId: child.id })}>
              {child.name}
            </Link>
            <br />
          </Fragment>
        )) : '-',
      };
      break;
  }

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="title !text-lg">{RoleName[user.role]}</h2>
          <Button variant="light" onClick={() => setIsOpen(true)}>
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

      <Modal isOpen={isOpen}>
        <RoleEditForm user={user} setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}

export default RoleInfo;
