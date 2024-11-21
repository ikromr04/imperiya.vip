import React from 'react';
import MainLogo from './main-logo';
import UserNavigation from './user-navigation';

export default function PageHeader(): JSX.Element {
  return (
    <header className="bg-white shadow py-3">
      <div className="container flex justify-between">
        <MainLogo imgClass="h-9 w-auto" />

        <UserNavigation />
      </div>
    </header>
  );
}
