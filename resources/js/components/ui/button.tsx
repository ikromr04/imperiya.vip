import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Icons } from '../icons';
import Spinner from './spinner';

const ButtonVariant = {
  primary: 'relative flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-150 bg-primary text-white text-sm shadow lg:hover:bg-blue-600 lg:hover:shadow-none',
  success: 'relative flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-150 bg-green-500 text-white text-sm shadow lg:hover:bg-green-600 lg:hover:shadow-none',
  danger: 'relative flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-150 bg-red-500 text-white text-sm shadow lg:hover:bg-red-600 lg:hover:shadow-none',
  warning: 'relative flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-150 bg-orange-400 text-white text-sm shadow lg:hover:bg-orange-500 lg:hover:shadow-none',
  text: 'relative flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-150 max-w-max text-sm',
  light: 'relative flex items-center gap-x-2 font-medium h-8 rounded-md px-4 transition-all duration-150 bg-white w-max text-sm shadow active:shadow-none lg:active:bg-gray-50 lg:hover:shadow-none',
  default: '',
};

type ButtonProps = {
  className?: string;
  children?: ReactNode;
  href?: string;
  loading?: boolean;
  variant?: keyof typeof ButtonVariant;
  icon?: keyof typeof Icons;
  iconClassname?: string;
} & (LinkProps | ButtonHTMLAttributes<HTMLButtonElement>);

export default function Button({
  className,
  href,
  children,
  variant = 'primary',
  icon,
  loading,
  iconClassname,
  ...props
}: ButtonProps): JSX.Element {
  const Icon = icon ? Icons[icon] : null;

  const childComponent = <>
    {loading && <Spinner className="absolute top-[calc(50%-10px)] left-[calc(50%-10px)] transform !w-5 !h-5 border-t-white m-auto" />}
    {Icon && <Icon className={classNames(iconClassname, loading && 'opacity-0')} width={14} height={14} />}
    {children}
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
      className={classNames(className, ButtonVariant[variant], loading && '!text-transparent opacity-60')}
    >
      {childComponent}
    </button>
  );
}
