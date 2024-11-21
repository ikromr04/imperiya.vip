import React from 'react';
import { useLocation } from 'react-router-dom';
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
      <div className={classNames(className, 'max-w-max max-h-max')}>
        <picture>
          <source media="(min-width: 640px)" srcSet="/images/main-logo-dark.desktop.svg" width={185} height={52} />
          <source srcSet="/images/main-logo-dark.mobile.svg" width={40} height={40} />
          <img src="/images/main-logo-dark.mobile.svg" alt="Логотип школы «Империя Знаний»" />
        </picture>
      </div>
    );
  }

  return (
    <a className={classNames(className, 'max-w-max max-h-max')} href="/">
      <picture>
        <source media="(min-width: 640px)" srcSet="/images/main-logo-dark.desktop.svg" width={185} height={52} />
        <source srcSet="/images/main-logo-dark.mobile.svg" width={40} height={40} />
        <img src="/images/main-logo-dark.mobile.svg" alt="Логотип школы «Империя Знаний»" />
      </picture>
    </a>
  );
}
