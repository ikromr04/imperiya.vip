import DescriptionList from '@/components/ui/description-list';
import { AppRoute } from '@/const/routes';
import { AsyncStatus } from '@/const/store';
import { RoleName } from '@/const/users';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchProfessionsAction } from '@/store/professions-slice/professions-api-actions';
import { getProfessions, getProfessionsStatus } from '@/store/professions-slice/professions-selector';
import { getUsers } from '@/store/users-slice/users-selector';
import { User } from '@/types/users';
import React, { Fragment, useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';

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

  useEffect(() => {
    if (professionsStatus === AsyncStatus.Idle) dispatch(fetchProfessionsAction());
  }, [dispatch, professionsStatus]);

  return (
    <section className="box">
      <header className="box__header">
        <h2 className="title md:!text-lg">{RoleName[user.role]}</h2>
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
  );
}

export default ParentInfo;
