import classNames from 'classnames';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { PropsWithClassname } from '../../types';
import { Icons } from '../icons';

const ButtonVariant = {
  primary: 'flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-300 bg-primary text-white text-sm shadow lg:hover:bg-blue-600 lg:hover:shadow-none',
  success: 'flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-300 bg-green-500 text-white text-sm shadow lg:hover:bg-green-600 lg:hover:shadow-none',
  error: 'flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-300 bg-red-500 text-white text-sm shadow lg:hover:bg-red-600 lg:hover:shadow-none',
  text: 'flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-300 max-w-max text-sm',
  light: 'flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-300 bg-white w-max text-sm shadow lg:hover:bg-gray-50 lg:hover:shadow-none',
  default: '',
};

type ButtonProps = PropsWithClassname<PropsWithChildren<{
  href?: string;
  variant?: keyof typeof ButtonVariant;
  icon?: keyof typeof Icons;
  iconClassname?: string;
} & (LinkProps | ButtonHTMLAttributes<HTMLButtonElement>)>>;

export default function Button({
  className,
  href,
  children,
  variant = 'primary',
  icon,
  iconClassname,
  ...props
}: ButtonProps): JSX.Element {
  const Icon = icon ? Icons[icon] : null;

  const childComponent = <>
    {Icon && <Icon className={iconClassname} width={14} height={14} />} {children}
  </>;

  if (href) {
    return (
      <Link
        {...(props as LinkProps)}
        className={classNames(className, ButtonVariant[variant])}
        to={href}
      >
        {childComponent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classNames(className, ButtonVariant[variant])}
    >
      {childComponent}
    </button>
  );
}
