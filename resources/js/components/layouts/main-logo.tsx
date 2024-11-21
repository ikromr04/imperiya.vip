import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import classNames from 'classnames';

export default function MainLogo({
  className,
}: {
  className?: string;
}): JSX.Element {
  const { pathname } = useLocation();

  if (pathname === AppRoute.Index) {
    return (
      <div className={classNames('max-w-max max-h-max p-2', className)}>
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/logo-full.svg" width={64} height={25} />
          <source srcSet="/images/logo.svg" width={32} height={23} />
          <img className="w-10 h-auto lg:h-10 lg:w-auto" src="/images/logo.svg" alt="Логотип Poputi TJ" />
        </picture>
      </div>
    );
  }

  return (
    <Link className={classNames('max-w-max max-h-max p-2', className)} to="/">
      <picture>
        <source media="(min-width: 1024px)" srcSet="/images/logo-full.svg" width={64} height={25} />
        <source srcSet="/images/logo.svg" width={32} height={23} />
        <img className="w-10 h-auto lg:h-10 lg:w-auto" src="/images/logo.svg" alt="На главную страницу" />
      </picture>
    </Link>
  );
}
