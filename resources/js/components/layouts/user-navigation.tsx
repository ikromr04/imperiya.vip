import React, { BaseSyntheticEvent, ReactNode } from 'react';
import { useDropdown } from '../../hooks/use-dropdown';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthUser } from '../../store/auth-slice/auth-selector';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/auth-slice/auth-api-actions';
import { Icons } from '../icons';

export default function UserNavigation({
  className,
}: {
  className?: string;
}): ReactNode {
  const
    user = useAppSelector(getAuthUser),
    dispatch = useAppDispatch(),
    { ref, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();

  if (!user) return null;

  return (
    <div ref={ref} className={classNames(className, 'relative')}>
      <button
        className="relative z-0 flex w-9 h-9 rounded-full border border-gray-300 bg-gray-100 overflow-hidden"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.avatar &&
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={user.avatar}
            width={200}
            height={200}
            alt={user.name}
            onError={(evt: BaseSyntheticEvent) => evt.target.remove()}
          />}
        <Icons.user className="absolute -z-10 bottom-0 left-1/2 h-[88%] transform -translate-x-1/2 text-gray-300" />
        <span className="sr-only">{user.name}</span>
      </button>

      <div
        className={classNames(
          'absolute top-[calc(100%+12px)] right-0 border rounded-md py-1 bg-white shadow-sm text-sm min-w-max transition-all duration-300 text-gray-500',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <ul>
          <li>
            <Link className="flex w-full items-center h-8 transition-all duration-300 hover:bg-gray-100 px-3" to={AppRoute.Auth.Profile}>
              Перейти к профилью
            </Link>
          </li>
        </ul>

        <hr className="flex my-1" />

        <button
          className="flex w-full items-center h-8 transition-all duration-300 hover:bg-gray-100 px-3"
          type="button"
          onClick={() => dispatch(logoutAction())}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
