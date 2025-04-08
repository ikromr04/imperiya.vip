import RoleEditForm from '@/components/forms/users/role-edit-form/role-edit-form';
import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import Modal from '@/components/ui/modal';
import Tooltip from '@/components/ui/tooltip';
import { AppRoute } from '@/const/routes';
import { RoleName } from '@/const/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { User, Users } from '@/types/users';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

type RoleInfoProps = {
  users: Users;
  user: User;
};

function RoleInfo({
  users,
  user,
}: RoleInfoProps): JSX.Element {
  let list: { [term: string]: ReactNode; } = {};
  const [isOpen, setIsOpen] = useState(false);
  const grades = useAppSelector(getGrades);
  const dispatch = useAppDispatch();
  const grade = grades.data?.find(({ id }) => id === user.student?.gradeId);
  const mother = users.find(({ id }) => id === user.student?.motherId);
  const father = users.find(({ id }) => id === user.student?.fatherId);
  const children = users.filter(({ id }) => user.parent?.children?.includes(id));

  useEffect(() => {
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
  }, [dispatch, grades.data, grades.isFetching]);

  switch (user.role) {
    // case user.superadmin !== undefined:
    //   break;
    // case user.admin !== undefined:
    //   break;
    // case user.director !== undefined:
    //   break;
    // case 'teacher':

    //   break;
    case 'student':
      list = {
        'Класс': grade ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Classes.Show, { id: grade.id })}>
            {grade.level} {grade.group}
          </Link> : '-',
        'Мать': mother ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: mother.id })}>
            {mother.name}
          </Link> : '-',
        'Отец': father ?
          <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: father.id })}>
            {father.name}
          </Link> : '-',
      };
      break;
    case 'parent':
      list = {
        'Дети': children ? children.map((child) => (
          <Fragment key={child.id}>
            <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: child.id })}>
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
        <RoleEditForm
          grade={grade}
          mother={mother}
          father={father}
          children={children}
          user={user}
          setIsOpen={setIsOpen}
        />
      </Modal>
    </>
  );
}

export default RoleInfo;
