import React from 'react';
import NavList from '../ui/nav-list';
import { useAppDispatch } from '../../hooks/index';
import classNames from 'classnames';
import { toggleNavigationAction } from '../../store/app-slice/app-slice';
import { AppRoute } from '@/const/routes';

type PageSidebarProps = {
  className?: string;
};

function PageSidebar({
  className,
}: PageSidebarProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <aside className={classNames(className, 'static z-10 bg-white shadow rounded-r-md max-h-[calc(100vh-68px)]  transition-all duration-300 md:h-max md:rounded-md')}>
      <nav className="flex flex-col h-[calc(100vh-68px)] no-scrollbar md:max-h-[calc(100vh-84px)] md:h-auto">
        <NavList links={[
          { label: 'Журнал', icon: 'journal', href: AppRoute.Journal },
        ]} />

        <hr className="border-gray-300" />

        <NavList
          className="overflow-y-scroll overflow-x-hidden no-scrollbar"
          links={[
            { label: 'Расписание', icon: 'schedule', href: AppRoute.Schedule.Index },
            { label: 'Пользователи', icon: 'users', href: AppRoute.Users.Index },
            { label: 'Классы', icon: 'class', href: AppRoute.Classes.Index },
            { label: 'Отчет', icon: 'monitoring', href: AppRoute.Monitoring.Index },
          ]}
        />

        <hr className="border-gray-300 mt-auto" />

        <NavList links={[
          { label: 'Настройки', icon: 'settings', href: AppRoute.Settings.Index },
          { label: 'Свернуть', icon: 'east', onClick: () => dispatch(toggleNavigationAction()) },
        ]} />
      </nav>
    </aside>
  );
}

export default PageSidebar;
