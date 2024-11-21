import React, { BaseSyntheticEvent, ReactNode } from 'react';
import { useDropdown } from '../../hooks/use-dropdown';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthUser } from '../../store/auth-slice/auth-selector';
import { AppRoute, DEFAULT_AVATAR_PATH } from '../../const';
import { Icons } from '../icons';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/auth-slice/auth-api-actions';

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
      <button className="flex items-center font-semibold gap-2 text-gray-900" type="button" onClick={() => setIsOpen(!isOpen)}>
        <img
          className="flex w-9 h-9 rounded-full object-cover border"
          src={user.avatar || DEFAULT_AVATAR_PATH}
          width={200}
          height={200}
          alt={user.name}
          onError={(evt: BaseSyntheticEvent) => evt.target.setAttribute('src', DEFAULT_AVATAR_PATH)}
        />
        <span className="sr-only">{user.name}</span>
        <Icons.caretDown className={classNames('transition-all duration-300 transform', isOpen && '-scale-y-100')} width={14} height={14} />
      </button>

      <div className={classNames('absolute top-[calc(100%+16px)] right-0 border rounded-md py-1 bg-white shadow-sm text-sm min-w-max transition-all duration-300', isOpen ? 'visible opacity-100' : 'invisible opacity-0')}>
        <ul>
          <li>
            <Link className="flex w-full items-center h-8 transition-all duration-300 hover:bg-gray-100 px-4" to={AppRoute.Auth.Profile}>
              Перейти к профилью
            </Link>
          </li>
        </ul>
        <hr className="flex my-1" />
        <button className="flex w-full items-center h-8 transition-all duration-300 hover:bg-gray-100 px-4" type="button" onClick={() => dispatch(logoutAction())}>
          Выйти
        </button>
      </div>
    </div>
  );
}
