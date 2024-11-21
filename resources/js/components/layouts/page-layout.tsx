import React, { ReactNode } from 'react';
import PageHeader from './page-header';
import PageFooter from './page-footer';
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
      <PageFooter />
    </PrivateRoute>
  );
}
