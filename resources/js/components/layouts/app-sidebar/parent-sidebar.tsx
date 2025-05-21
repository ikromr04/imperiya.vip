import React, { BaseSyntheticEvent, useEffect } from 'react';
import { AppRoute } from '@/const/routes';
import classNames from 'classnames';
import { generatePath, NavLink } from 'react-router-dom';
import { logoutAction } from '@/store/auth-slice/auth-api-actions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Icons } from '@/components/icons';
import AppLogo from '@/components/app-logo';
import { getUsers, getUsersStatus } from '@/store/users-slice/users-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';
import { AsyncStatus } from '@/const/store';

function ParentSidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(getUsersStatus);
  const users = useAppSelector(getUsers);

  const handleLinksClick = (evt: BaseSyntheticEvent) => evt.target.closest('aside').classList.remove('sidebar--shown');

  useEffect(() => {
    if (usersStatus === AsyncStatus.Idle) dispatch(fetchUsersAction());
  }, [dispatch, usersStatus]);

  return (
    <>
      <aside
        className="sidebar fixed left-0 top-0 z-[100] flex flex-row-reverse h-screen transition-all duration-150 transform"
        onMouseEnter={(evt: BaseSyntheticEvent) => evt.currentTarget.classList.add('sidebar--shown')}
        onMouseLeave={(evt: BaseSyntheticEvent) => evt.currentTarget.classList.remove('sidebar--shown')}
      >
        <button
          className="sidebar__toggler text-gray-500 cursor-context-menu transition-all duration-150"
          type="button"
        >
          <Icons.menuArrowOpen width={10} />
        </button>

        <nav className="flex flex-col min-w-52 h-full bg-white border-r shadow">
          <AppLogo className="m-1 p-2" imgClass="h-9 w-auto" />

          <hr />

          <ul className="flex flex-col p-1 gap-1">
            <li>
              <NavLink
                className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                to={AppRoute.Auth.Profile}
                onClick={handleLinksClick}
              >
                <Icons.accountCircle className="navlink__icon" width={16} height={16} />
                Профиль
              </NavLink>
            </li>
          </ul>

          <h2 className="text-sm text-gray-400 pl-4">Дети</h2>

          <ul className="flex flex-col p-1 gap-1">
            {users?.filter(({ role }) => role === 'student').map((user) => (
              <li key={user.id}>
                <NavLink
                  className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                  to={generatePath(AppRoute.Users.Show, { id: user.id })}
                  onClick={handleLinksClick}
                >
                  <Icons.accountCircle className="navlink__icon" width={16} height={16} />
                  {user.surname} {user.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <hr />

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
        className="sidebar-close fixed left-0 top-0 z-[90] w-screen h-screen transition-all duration-150 bg-black/10 backdrop-blur-[2px] invisible opacity-0"
        type="button"
        onClick={(evt: BaseSyntheticEvent) => evt.currentTarget.previousElementSibling.classList.remove('sidebar--shown')}
      ></button>
    </>
  );
}

export default ParentSidebar;
