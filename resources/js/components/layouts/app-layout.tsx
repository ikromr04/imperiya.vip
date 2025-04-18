import React, { PropsWithChildren } from 'react';
import PrivateRoute from '../private-route';
import AppSidebar from './app-sidebar/app-sidebar';

function AppLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <PrivateRoute>
      <div className="min-w-screen min-h-screen bg-gray-100 text-base">
        <AppSidebar />

        <div className="mx-4 md:mx-6 lg:mx-8">
          {children}
        </div>
      </div>
    </PrivateRoute>
  );
}

export default AppLayout;
