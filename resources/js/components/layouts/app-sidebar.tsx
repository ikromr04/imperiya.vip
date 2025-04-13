import React, { useState } from 'react';
import { AppRoute } from '@/const/routes';
import { Icons } from '../icons';
import MainLogo from '../app-logo';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '@/store/auth-slice/auth-api-actions';
import { useAppDispatch } from '@/hooks';

function AppSidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <aside
        className={classNames(
          'fixed left-0 top-0 z-[100] flex flex-row-reverse h-screen transition-all duration-150 transform',
          isShown ? 'translate-x-0' : 'translate-x-[calc(-100%+10px)]'
        )}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <button
          className={classNames(
            'text-gray-500 cursor-context-menu transition-all duration-150',
            isShown && 'invisible opacity-0'
          )}
          type="button"
        >
          <Icons.menuArrowOpen width={10} />
        </button>

        <nav className="flex flex-col min-w-52 h-full bg-white border-r shadow">
          <MainLogo className="m-1 p-2" imgClass="h-9 w-auto" />

          <hr />

          <ul className="flex flex-col p-1 gap-1">
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Auth.Profile}
              >
                <Icons.accountCircle className="navlink__icon" width={16} height={16} />
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Lessons.Index}
              >
                <Icons.schedule className="navlink__icon" width={16} height={16} />
                Расписание
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Users.Index}
              >
                <Icons.users className="navlink__icon" width={16} height={16} />
                Пользователи
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Journal}
              >
                <Icons.journal className="navlink__icon" width={16} height={16} />
                Журнал
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Classes.Index}
              >
                <Icons.class className="navlink__icon" width={16} height={16} />
                Классы
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Lessons.Index}
              >
                <Icons.lessons className="navlink__icon" width={16} height={16} />
                Уроки
              </NavLink>
            </li> */}
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Auth.RegisterLinks}
              >
                <Icons.link className="navlink__icon" width={16} height={16} />
                Ссылки для регистрации
              </NavLink>
            </li>
          </ul>

          <hr className="mt-auto" />

          <ul className="flex flex-col p-1 gap-1">
            <li>
              <button
                className="navlink"
                type="button"
                onClick={() => dispatch(logoutAction())}
              >
                <Icons.logout className="navlink__icon" width={16} height={16} />
                Выйти
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <button
        className={classNames(
          'fixed left-0 top-0 z-50 w-screen h-screen transition-all duration-150 bg-black/10 backdrop-blur-[2px]',
          isShown ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        type="button"
        onClick={() => setIsShown(false)}
      ></button>
    </>
  );
}

export default AppSidebar;
