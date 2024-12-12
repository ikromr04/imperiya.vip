import React, { PropsWithChildren } from 'react';
import PageHeader from './page-header';
import PrivateRoute from '../private-route';
import PageSidebar from './page-sidebar';
import { useAppSelector } from '../../hooks';
import { getNavigationCollapsedState } from '../../store/app-slice/app-selector';
import classNames from 'classnames';

export default function PageLayout({
  children,
}: PropsWithChildren): JSX.Element {
  const isNavigationCollapsed = useAppSelector(getNavigationCollapsedState);

  return (
    <PrivateRoute>
      <PageHeader />

      <div className="flex gap-2 h-[calc(100vh-52px)] py-2 mr-[5vw] overflow-hidden md:overflow-visible  md:gap-4 md:h-[calc(100vh-52px)] md:py-4 md:mx-auto md:w-[90vw] md:max-w-[1728px]">
        <PageSidebar className={isNavigationCollapsed ? 'max-w-10 min-w-10 md:max-w-11 md:min-w-11' : 'max-w-52 min-w-52'} />

        <div className={classNames(
          'flex flex-col transition-all duration-300',
          isNavigationCollapsed ? 'w-[calc(100%-48px)] md:w-[calc(100%-60px)]' : 'w-[calc(100%-216px)] md:w-[calc(100%-224px)]'
        )}>
          {children}
        </div>
      </div>
    </PrivateRoute>
  );
}
