import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Icons } from '../icons';
import classNames from 'classnames';

export default function PageNavigation({
  className,
}: {
  className?: string;
}): JSX.Element {
  const { pathname } = useLocation();

  return (
    <nav className={classNames('flex items-center lg:px-3 lg:grow lg:justify-between', className)}>
      <ul className="hidden lg:flex mr-auto text-blue-600 font-semibold">
        <li>
          <Link
            className={classNames(
              'flex items-center h-8 px-2 transition-colors duration-300 hover:text-blue-800',
              pathname.startsWith(AppRoute.Trips.Index) && 'text-blue-800',
            )}
            to={AppRoute.Trips.Index}
          >
            Поездки
          </Link>
        </li>
        <li>
          <Link
            className={classNames(
              'flex items-center h-8 px-2 transition-colors duration-300 hover:text-blue-800',
              pathname.startsWith(AppRoute.Help.Index) && 'text-blue-800',
            )}
            to={AppRoute.Help.Index}
          >
            Центр помощи
          </Link>
        </li>
      </ul>

      <ul className="flex items-center text-blue-600 font-semibold">
        <li>
          <Link
            className={classNames(
              'flex items-center p-2 rounded-full gap-x-2 transition-colors duration-300 hover:text-blue-800',
              pathname.startsWith(AppRoute.Search.Trip) && 'text-blue-800',
            )}
            to={AppRoute.Search.Trip}
          >
            <Icons.search width={28} height={28} />
            <span className="sr-only lg:not-sr-only">Искать</span>
          </Link>
        </li>
        <li>
          <Link
            className={classNames(
              'flex items-center p-2 rounded-full gap-x-2 transition-colors duration-300 hover:text-blue-800',
              pathname.startsWith(AppRoute.Publish.Trip) && 'text-blue-800',
            )}
            to={AppRoute.Publish.Trip}
          >
            <Icons.add width={28} height={28} />
            <span className="sr-only lg:not-sr-only">Опубликовать поездку</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
