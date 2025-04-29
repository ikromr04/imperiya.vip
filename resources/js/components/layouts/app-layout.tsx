import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import PrivateRoute from '../private-route';
import AppSidebar from './app-sidebar/app-sidebar';
import { Outlet } from 'react-router-dom';

function AppLayout(): JSX.Element {
  return (
    <PrivateRoute>
      <div className="min-w-screen min-h-screen bg-gray-100 text-base">
        <AppSidebar />

        <div className="mx-4 md:mx-6 lg:mx-8">
          <Outlet />
        </div>
      </div>
    </PrivateRoute>
  );
}

export default AppLayout;
