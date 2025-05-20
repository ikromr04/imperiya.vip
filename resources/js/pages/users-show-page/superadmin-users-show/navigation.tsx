import { AppRoute } from '@/const/routes';
import { User } from '@/types/users';
import classNames from 'classnames';
import React, { memo } from 'react';
import { generatePath, NavLink } from 'react-router-dom';

type NavigationProps = {
  user: User;
};

function Navigation({
  user,
}: NavigationProps): JSX.Element {
  return (
    <div className="relative">
      <ul className="flex items-center font-medium text-slate-500 overflow-scroll no-scrollbar py-4 pl-2 -ml-2 pr-7">
        <li>
          <NavLink
            className={({ isActive }) => classNames(
              'flex items-center h-7 px-2 transition-all duration-150 border border-transparent min-w-max',
              isActive && 'rounded shadow bg-white border-gray-200'
            )}
            to={generatePath(AppRoute.Users.Show, { id: user.id })}
          >
            Профиль
          </NavLink>
        </li>
      </ul>
      <div className="absolute top-0 right-0 z-10 min-w-6 h-full pointer-events-none bg-gradient-to-l from-gray-100 to-transparent"></div>
    </div>
  );
}

export default memo(Navigation);
