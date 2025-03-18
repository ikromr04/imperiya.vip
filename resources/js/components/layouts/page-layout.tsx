import React, { PropsWithChildren } from 'react';
import PageSidebar from './page-sidebar';
import PrivateRoute from '../private-route';

function PageLayout({
  children,
}: PropsWithChildren): JSX.Element {

  return (
    <PrivateRoute>
      <div className="min-w-screen min-h-screen bg-gray-100 text-base">
        <PageSidebar />

        <div className="mx-4 md:mx-6 lg:mx-8">
          {children}
        </div>
      </div>
    </PrivateRoute>
  );
}

export default PageLayout;
