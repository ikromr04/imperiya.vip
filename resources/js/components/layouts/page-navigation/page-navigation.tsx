import classNames from 'classnames';
import React from 'react';
import NavItem from './nav-item';
import { AppRoute } from '../../../const';

export default function PageNavigation({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <nav className={classNames(className, 'flex flex-col')}>
      <ul className="flex flex-col p-1 pl-0">
        <NavItem
          href={AppRoute.Journal}
          label="Журнал"
          icon="journal"
        />
      </ul>

      <hr className="border-gray-300" />

      <ul className="flex flex-col p-1 pl-0">
        <NavItem icon="schedule" />
        <NavItem icon="users" />
        <NavItem icon="class" />
        <NavItem icon="monitoring" />
      </ul>

      <hr className="border-gray-300" />

      <ul className="flex flex-col p-1 pl-0">
        <NavItem icon="settings" />
        <NavItem icon="east" />
      </ul>
    </nav>
  );
}
