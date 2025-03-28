import React from 'react';
import classNames from 'classnames';

type AppLogoProps = {
  className?: string;
  imgClass?: string;
};

function AppLogo({
  className,
  imgClass,
}: AppLogoProps): JSX.Element {
  return (
    <a className={classNames(className, 'max-w-max max-h-max')} href="/">
      <img
        className={imgClass}
        src="/images/app-logo.svg"
        width={185}
        height={51}
        alt="Логотип школы «Империя Знаний»"
      />
    </a>
  );
}

export default AppLogo;
