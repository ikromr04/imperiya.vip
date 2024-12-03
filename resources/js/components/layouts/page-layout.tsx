import React, { ReactNode } from 'react';
import PageHeader from './page-header';
import PrivateRoute from '../private-route';

export default function PageLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <PrivateRoute>
      <PageHeader />
      {children}
    </PrivateRoute>
  );
}
