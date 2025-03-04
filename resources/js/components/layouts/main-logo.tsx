import React from 'react';
import classNames from 'classnames';

type MainLogoProps = {
  className?: string;
  imgClass?: string;
};

function MainLogo({
  className,
  imgClass,
}: MainLogoProps): JSX.Element {
  return (
    <a className={classNames(className, 'max-w-max max-h-max')} href="/">
      <picture>
        <source media="(min-width: 640px)" srcSet="/images/main-logo-dark.desktop.svg" width={185} height={52} />
        <source srcSet="/images/main-logo-dark.mobile.svg" width={40} height={40} />
        <img className={imgClass} src="/images/main-logo-dark.mobile.svg" alt="Логотип школы «Империя Знаний»" />
      </picture>
    </a>
  );
}

export default MainLogo;
