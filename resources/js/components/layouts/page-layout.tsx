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

      <div className="flex pr-[5vw] grow h-[calc(100vh-52px)] gap-2">
        <PageSidebar />

        <div className="flex flex-col grow pt-4 pb-40">
          {children}
        </div>
      </div>
    </PrivateRoute>
  );
}
