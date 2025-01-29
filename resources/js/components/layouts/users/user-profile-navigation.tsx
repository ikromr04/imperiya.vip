import PrivateComponent from '@/components/ui/private-component';
import { AppRoute } from '@/const';
import { User } from '@/types/users';
import classNames from 'classnames';
import React from 'react';
import { generatePath, Link, useLocation } from 'react-router-dom';

type UserProfileNavigationProps = {
  user: User;
};

function UserProfileNavigation({
  user,
}: UserProfileNavigationProps): JSX.Element {
  const { pathname } = useLocation();

  return (
    <ul className="flex items-center font-medium text-slate-500">
      <li>
        <Link
          className={classNames(
            'flex items-center h-7 px-2 transition-all duration-300 border border-transparent',
            (generatePath(AppRoute.Users.Show, { userId: user.id }) != '/'
              ? pathname.startsWith(generatePath(AppRoute.Users.Show, { userId: user.id }))
              : (generatePath(AppRoute.Users.Show, { userId: user.id }) === pathname)) &&
            'rounded shadow bg-white border-gray-200'
          )}
          to={generatePath(AppRoute.Users.Show, { userId: user.id })}
        >
          Профиль
        </Link>
      </li>
      <PrivateComponent user={user} roles={['parent', 'teacher']}>
        <li>
          <Link
            className={classNames(
              'flex items-center h-7 px-2 transition-all duration-300 border border-transparent',
              (generatePath(AppRoute.Users.Show, { userId: user.id }) != '/'
                ? pathname.startsWith(generatePath(AppRoute.Users.Show, { userId: user.id }))
                : (generatePath(AppRoute.Users.Show, { userId: user.id }) === pathname))
            )}
            to={generatePath(AppRoute.Users.Show, { userId: user.id })}
          >
            Образование
          </Link>
        </li>
        <li>
          <Link
            className={classNames(
              'flex items-center h-7 px-2 transition-all duration-300 border border-transparent',
              (generatePath(AppRoute.Users.Show, { userId: user.id }) != '/'
                ? pathname.startsWith(generatePath(AppRoute.Users.Show, { userId: user.id }))
                : (generatePath(AppRoute.Users.Show, { userId: user.id }) === pathname))
            )}
            to={generatePath(AppRoute.Users.Show, { userId: user.id })}
          >
            Трудовая деятельность
          </Link>
        </li>
      </PrivateComponent>
      <PrivateComponent user={user} roles={['student', 'teacher']}>
        <li>
          <Link
            className={classNames(
              'flex items-center h-7 px-2 transition-all duration-300 border border-transparent',
              (generatePath(AppRoute.Users.Show, { userId: user.id }) != '/'
                ? pathname.startsWith(generatePath(AppRoute.Users.Show, { userId: user.id }))
                : (generatePath(AppRoute.Users.Show, { userId: user.id }) === pathname))
            )}
            to={generatePath(AppRoute.Users.Show, { userId: user.id })}
          >
            Расписание
          </Link>
        </li>
      </PrivateComponent>
    </ul>
  );
}

export default UserProfileNavigation;
