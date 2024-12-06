import React from 'react';
import NavList from '../ui/nav-list';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getNavigationCollapsedState } from '../../store/app-slice/app-selector';
import classNames from 'classnames';
import { collapseNavigationAction, toggleNavigationAction } from '../../store/app-slice/app-slice';
import { useRouteChange } from '../../hooks/use-route-change';

export default function PageSidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const isNavigationCollapsed = useAppSelector(getNavigationCollapsedState);

  useRouteChange(() => {
    if (window.screen.width < 768) dispatch(collapseNavigationAction());
  });

  return (
    <aside className={classNames(
      'bg-white shadow my-2 rounded-r-md h-max max-h-[calc(100vh-72px)] overflow-hidden transition-all duration-300 md:my-4 md:rounded-md',
      isNavigationCollapsed ? 'max-w-10 min-w-10 md:max-w-11 md:min-w-11' : 'max-w-52 min-w-52',
    )}>
      <nav className="flex flex-col max-h-[calc(100vh-72px)] no-scrollbar">
        <NavList links={[
          { label: 'Журнал', icon: 'journal', href: AppRoute.Journal },
        ]} />

        <hr className="border-gray-300" />

        <NavList
          className="overflow-y-scroll max-h-[50%] no-scrollbar"
          links={[
            { label: 'Расписание', icon: 'schedule', href: AppRoute.Schedule.Index },
            { label: 'Пользователи', icon: 'users', href: AppRoute.Users.Index },
            { label: 'Классы', icon: 'class', href: AppRoute.Class.Index },
            { label: 'Отчет', icon: 'monitoring', href: AppRoute.Monitoring.Index },
          ]}
        />

        <hr className="border-gray-300" />

        <NavList links={[
          { label: 'Настройки', icon: 'settings', href: AppRoute.Settings.Index },
          { label: 'Свернуть', icon: 'east', onClick: () => dispatch(toggleNavigationAction()) },
        ]} />
      </nav>
    </aside>
  );
}
