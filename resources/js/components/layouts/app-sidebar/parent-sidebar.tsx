import React, { useEffect, useState } from 'react';
import { AppRoute } from '@/const/routes';
import classNames from 'classnames';
import { generatePath, NavLink } from 'react-router-dom';
import { logoutAction } from '@/store/auth-slice/auth-api-actions';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Icons } from '@/components/icons';
import AppLogo from '@/components/app-logo';
import { getUsers } from '@/store/users-slice/users-selector';
import { fetchUsersAction } from '@/store/users-slice/users-api-actions';

function ParentSidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (!users.data && !users.isFetching) dispatch(fetchUsersAction());
  }, [dispatch, users.data, users.isFetching]);

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
          <AppLogo className="m-1 p-2" imgClass="h-9 w-auto" />

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
          </ul>

          <h2 className="text-sm text-gray-400 pl-4">Дети</h2>
          <ul className="flex flex-col p-1 gap-1">
            {users.data?.filter(({ role }) => role === 'student').map((user) => (
              <li key={user.id}>
                <NavLink
                  className={({ isActive }) => classNames('navlink', isActive && 'navlink--active')}
                  to={generatePath(AppRoute.Users.Show, { id: user.id })}
                  onClick={() => setIsShown(false)}
                >
                  <Icons.accountCircle className="navlink__icon" width={16} height={16} />
                  {user.surname} {user.name}
                </NavLink>
              </li>
            ))}
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

export default ParentSidebar;
