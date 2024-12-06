import React, { PropsWithChildren } from 'react';
import PageHeader from './page-header';
import PrivateRoute from '../private-route';
import PageSidebar from './page-sidebar';

export default function PageLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <PrivateRoute>
      <PageHeader className="static z-10" />

      <div className="flex pr-[5vw] grow h-[calc(100vh-52px)] gap-2 md:pr-0 md:w-[90vw] md:max-w-[1728px] md:mx-auto md:gap-4">
        <PageSidebar />

        <div className="flex flex-col grow pt-2 pb-40 md:pt-4">
          {children}
        </div>
      </div>
    </PrivateRoute>
  );
}
