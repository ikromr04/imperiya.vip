import { AppRoute } from '@/const/routes';
import classNames from 'classnames';
import React, { memo, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

function Navigation(): ReactNode {
  return (
    <div className="relative">
      <ul className="flex items-center font-medium text-slate-500 overflow-scroll no-scrollbar py-4 pl-2 -ml-2 pr-7">
        <li>
          <NavLink
            className={({ isActive }) => classNames(
              'flex items-center h-7 px-2 transition-all duration-150 border border-transparent min-w-max',
              isActive && 'rounded shadow bg-white border-gray-200'
            )}
            to={AppRoute.Auth.Profile}
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
