import React from 'react';
import MainLogo from './main-logo';
import UserNavigation from './user-navigation';
import classNames from 'classnames';

type PageHeaderProps = {
  className?: string;
}

function PageHeader({
  className,
}: PageHeaderProps): JSX.Element {
  return (
    <header className={classNames(className, 'sticky z-20 bg-white shadow py-2')}>
      <div className="container flex justify-between">
        <MainLogo imgClass="h-9 w-auto" />

        <UserNavigation />
      </div>
    </header>
  );
}

export default PageHeader;
