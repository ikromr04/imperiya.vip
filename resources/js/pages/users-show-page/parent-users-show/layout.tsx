import Spinner from '@/components/ui/spinner';
import { AppRoute } from '@/const/routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { getUsers } from '@/store/users-slice/users-selector';
import React, { ReactNode, useEffect } from 'react';
import { generatePath, Link, NavLink, useParams } from 'react-router-dom';
import AppLayout from '@/components/layouts/app-layout';
import Button from '@/components/ui/button';
import { RoleName } from '@/const/users';
import { getGrades } from '@/store/grades-slice/grades-selector';
import { Icons } from '@/components/icons';
import { getNationalities } from '@/store/nationalities-slice/nationalities-selector';
import { fetchGradesAction } from '@/store/grades-slice/grades-api-actions';
import { fetchNationalitiesAction } from '@/store/nationalities-slice/nationalities-api-actions';
import DescriptionList from '@/components/ui/description-list';
import classNames from 'classnames';

type LayoutProps = {
  children: ReactNode;
};

function Layout({
  children,
}: LayoutProps): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const users = useAppSelector(getUsers);
  const user = users.data?.find((user) => user.id === +(params.id || 0)) || null;
  const grades = useAppSelector(getGrades);
  const grade = grades.data?.find(({ id }) => id === user?.student?.gradeId);
  const nationalities = useAppSelector(getNationalities);

  useEffect(() => {
    if (!user && params.id && !users.isFetching) dispatch(fetchUsersAction());
    if (!grades.data && !grades.isFetching) dispatch(fetchGradesAction());
    if (!nationalities.data && !nationalities.isFetching) dispatch(fetchNationalitiesAction());
  }, [user, params.id, dispatch, users.isFetching, grades.data, grades.isFetching, nationalities.data, nationalities.isFetching]);

  if (!user || !users.data) {
    return (
      <AppLayout>
        <Spinner className="w-8 h-8 m-2" />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="pt-4 pb-40">
        <header className="relative z-10 lg:flex lg:items-top lg:gap-4">
          <div className="relative min-w-36 max-w-36 min-h-36 max-h-36 !p-0 mb-2 lg:mb-0">
            <img
              className="block w-full h-full rounded-full object-cover border-[2px] border-white"
              src={user.avatarThumb || '/images/avatar.png'}
              width={144}
              height={144}
              alt={user.name}
            />
          </div>

          <div className="lg:grow lg:mt-20">
            <h1 className="title mb-1">{user.surname} {user.name}</h1>
            <span className="flex max-w-max text-center bg-blue-200 text-primary rounded-full text-sm py-1 px-2 leading-none">
              {RoleName[user.role]} {grade && `${grade?.level} ${grade.group}`}
            </span>
          </div>
        </header>

        <div className="relative">
          <ul className="flex items-center font-medium text-slate-500 overflow-scroll no-scrollbar py-4 pl-2 -ml-2 pr-7">
            <li>
              <NavLink
                className={({ isActive }) => classNames(
                  'flex items-center h-7 px-2 transition-all duration-150 border border-transparent min-w-max',
                  isActive && 'rounded shadow bg-white border-gray-200'
                )}
                to={generatePath(AppRoute.Users.Show, { id: user.id })}
                end
              >
                Профиль
              </NavLink>
            </li>
            {user.role === 'student' && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => classNames(
                      'flex items-center h-7 px-2 transition-all duration-150 border border-transparent min-w-max',
                      isActive && 'rounded shadow bg-white border-gray-200'
                    )}
                    to={generatePath(AppRoute.Users.Lessons, { id: user.id })}
                  >
                    Расписание
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => classNames(
                      'flex items-center h-7 px-2 transition-all duration-150 border border-transparent min-w-max',
                      isActive && 'rounded shadow bg-white border-gray-200'
                    )}
                    to={generatePath(AppRoute.Users.Diary, { id: user.id })}
                  >
                    Дневник
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="absolute top-0 right-0 z-10 min-w-6 h-full pointer-events-none bg-gradient-to-l from-gray-100 to-transparent"></div>
        </div>

        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[75%_1fr]">
          <div className="flex flex-col gap-4 grow">
            {children}
          </div>

          <div className="flex flex-col gap-4">
            <section className="box">
              <div className="box__header flex-col !items-start">
                <Button
                  className="flex items-center gap-2 text-blue-600 leading-none"
                  variant="default"
                  href={user.email ? `mailto:${user.email}` : ''}
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-success">
                    <Icons.mail width={16} height={16} />
                  </span>
                  {user.email ?? '-'}
                </Button>

                <Button
                  className={classNames(
                    'flex items-center gap-2 text-blue-600 leading-none',
                    !user.whatsapp && 'pointer-events-none',
                  )}
                  variant="default"
                  href={`https://wa.me/+${user.whatsapp?.code}${user.whatsapp?.numbers}`}
                  target="_blank"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded bg-blue-50 text-success">
                    <Icons.whatsapp width={16} height={16} />
                  </span>
                  {user.whatsapp ? `+${user.whatsapp.code} ${user.whatsapp.numbers}` : '-'}
                </Button>
              </div>

              <DescriptionList
                className="box__body"
                variant="detailed"
                list={{}}
              />
            </section>

            <section className="box">
              <div className="box__header">
                <h2 className="font-medium text-gray-900">Телефонные номера</h2>
              </div>

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

            <section className="box">
              <div className="box__header">
                <h2 className="font-medium text-gray-900">Социальные сети</h2>
              </div>

              <div className="box__body flex flex-wrap gap-2">
                {user.socialLink?.facebook &&
                  <Link className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none" to={user.socialLink.facebook} target="_blank">
                    <Icons.facebook width={24} height={24} />
                  </Link>}
                {user.socialLink?.instagram &&
                  <Link className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none" to={user.socialLink?.instagram} target="_blank">
                    <Icons.instagram width={24} height={24} />
                  </Link>}
                {user.socialLink?.telegram &&
                  <Link className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none" to={user.socialLink?.telegram} target="_blank">
                    <Icons.telegram width={24} height={24} />
                  </Link>}
                {user.socialLink?.odnoklassniki &&
                  <Link className="flex shadow-md rounded-full transition-all duration-150 hover:shadow-none" to={user.socialLink?.odnoklassniki} target="_blank">
                    <Icons.odnoklassniki width={24} height={24} />
                  </Link>}
              </div>
            </section>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default Layout;
