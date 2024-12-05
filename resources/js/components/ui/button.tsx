import classNames from 'classnames';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { PropsWithClassname } from '../../types';

const ButtonVariant = {
  primary: 'flex items-center gap-x-1 h-9 rounded-md px-4 transition-all duration-300 bg-primary text-white font-semibold shadow-lg hover:bg-blue-600 hover:shadow-none',
  text: 'flex items-center gap-x-1 h-9 rounded-md px-4 transition-all duration-300 text-blue-600 hover:text-blue-400 max-w-max',
};

type ButtonProps = PropsWithClassname<PropsWithChildren<{
  href?: string;
  variant?: keyof typeof ButtonVariant;
} & (LinkProps | ButtonHTMLAttributes<HTMLButtonElement>)>>;

export default function Button({
  className,
  href,
  children,
  variant = 'primary',
  ...props
}: ButtonProps): JSX.Element {
  if (href) return (
    <Link
      {...(props as LinkProps)}
      className={classNames(className, ButtonVariant[variant])}
      to={href}
    >
      {children}
    </Link>
  );

  return (
    <button
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classNames(className, ButtonVariant[variant])}
    >
      {children}
    </button>
  );
}
