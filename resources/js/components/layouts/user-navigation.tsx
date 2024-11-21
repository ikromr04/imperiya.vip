import React from 'react';
import { useDropdown } from '../../hooks/use-dropdown';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Icons } from '../icons';

export default function UserNavigation({
  className,
}: {
  className?: string;
}) {
  const
    { pathname } = useLocation(),
    { ref, isOpen, setIsOpen } = useDropdown<HTMLDivElement>();

  return (
    <div ref={ref} className={classNames('relative', className)}>
      <button
        className={classNames(
          'flex text-blue-600 p-2 rounded-full hover:text-blue-800 transition-colors duration-300',
          (pathname.startsWith(AppRoute.Auth.Index) || isOpen) && 'text-blue-800',
        )}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Профиль</span>
        <Icons.profile   width={32} height={32} />
      </button>

      <ul className={classNames(
        'absolute top-[calc(100%+8px)] lg:top-[calc(100%+16px)] left-0 flex flex-col bg-white text-blue-600 font-semibold p-1 gap-1 shadow-sm border rounded-md min-w-max w-[280px] transform transition-all duration-300',
        isOpen ? 'translate-x-0 lg:-translate-x-[calc(100%-48px)] visible' : 'translate-x-[100vw] invisible'
      )}>
        <li>
          <Link
            className={classNames(
              'flex rounded py-2 px-3 transition-colors hover:bg-blue-50 duration-300',
              pathname.startsWith(AppRoute.Auth.Login) && 'bg-blue-50'
            )}
            to={AppRoute.Auth.Login}
            onClick={() => setIsOpen(false)}
          >
            Вход
          </Link>
        </li>
        <li>
          <Link
            className={classNames(
              'flex rounded py-2 px-3 transition-colors hover:bg-blue-50 duration-300',
              pathname.startsWith(AppRoute.Auth.Register) && 'bg-blue-50'
            )}
            to={AppRoute.Auth.Register}
            onClick={() => setIsOpen(false)}
          >
            Регистрация
          </Link>
        </li>
      </ul>
    </div>
  );
}
