import { Icons } from '@/components/icons';
import Button from '@/components/ui/button';
import DescriptionList from '@/components/ui/description-list';
import Modal from '@/components/ui/modal';
import Spinner from '@/components/ui/spinner';
import Tooltip from '@/components/ui/tooltip';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { RoleName } from '@/const/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import { getProfessions, getProfessionsStatus } from '@/store/professions-slice/professions-selector';
import { getUsers } from '@/store/users-slice/users-selector';
import { User } from '@/types/users';
import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

const RoleEditForm = lazy(()  => import('@/components/forms/users/role-edit-form/role-edit-form'));

type ParentInfoProps = {
  user: User;
};

function ParentInfo({
  user,
}: ParentInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const professionsStatus = useAppSelector(getProfessionsStatus);

  const users = useAppSelector(getUsers);
  const professions = useAppSelector(getProfessions);

  const children = users?.filter(({ id }) => user.parent?.children?.includes(id));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (professionsStatus === AsyncStatus.Idle) dispatch(fetchProfessionsAction());
  }, [dispatch, professionsStatus]);

  return (
    <>
      <section className="box">
        <header className="box__header">
          <h2 className="title md:!text-lg">{RoleName[user.role]}</h2>

          <Button variant="light" onClick={() => setIsOpen(true)}>
            <Icons.edit width={14} height={14} />
            <Tooltip label="Редактировать" position="left" />
          </Button>
        </header>

        <div className="relative">
          <DescriptionList
            className="box__body"
            list={{
              'Дети': children?.length ? children.map((child) => (
                <Fragment key={child.id}>
                  <Link className="text-blue-600" to={generatePath(AppRoute.Users.Show, { id: child.id })}>
                    {child.surname} {child.name}
                  </Link>
                  <br />
                </Fragment>
              )) : '-',
              'Сфера деятельности': professions?.find(({ id }) => user.parent?.professionId === id)?.name ?? '-',
              'Место работы': user.parent?.workplace ?? '-',
              'Должность': user.parent?.position ?? '-',
            }}
          />
          <div className="absolute top-[1px] right-0 rounded-br-md z-10 min-w-6 h-[calc(100%-1px)] pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </section>

      {isOpen && (
        <Modal isOpen={isOpen}>
          <Suspense fallback={<Spinner className="w-10 h-10" />}>
            <RoleEditForm
              user={user}
              setIsOpen={setIsOpen}
            />
          </Suspense>
        </Modal>
      )}
    </>
  );
}

export default ParentInfo;
