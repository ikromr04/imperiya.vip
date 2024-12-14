import React, { ButtonHTMLAttributes } from 'react';
import { Icons } from '../icons';
import { LinkProps, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Button from './button';
import { PropsWithClassname } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNavigationCollapsedState } from '../../store/app-slice/app-selector';
import { collapseNavigationAction } from '../../store/app-slice/app-slice';

export type NavLinkProps = PropsWithClassname<{
  label: string;
  href?: string;
  icon: keyof typeof Icons;
} & (LinkProps | ButtonHTMLAttributes<HTMLButtonElement>)>;

export default function NavLink({
  className,
  label,
  href,
  icon,
  ...props
}: NavLinkProps) {
  const { pathname } = useLocation();
  const Icon = Icons[icon];
  const isActive = href && (href != '/' ? pathname.startsWith(href) : (href === pathname));
  const isNavigationCollapsed = useAppSelector(getNavigationCollapsedState);
  const dispatch = useAppDispatch();

  const children = <>
    <span className="flex items-center justify-center min-w-9 min-h-9">
      <Icon
        className={classNames(
          'group-[.active]:text-success transition-all duration-300',
          (icon === 'east') && !isNavigationCollapsed && '-scale-x-[1]'
        )}
        width={16}
        height={16}
      />
    </span>
    <span className={classNames(
      'flex items-center min-w-max transition-all duration-300 font-medium',
      isNavigationCollapsed && 'opacity-0'
    )}>
      {label}
    </span>
  </>;

  return (
    <Button
      onClick={() => { if (window.screen.width < 768) dispatch(collapseNavigationAction()); }}
      {...props}
      className={classNames(
        className,
        'flex items-center h-9 rounded-r-md group w-full transition-all duration-300 md:rounded-md xl:hover:bg-gray-100 text-gray-500 ',
        isActive && 'bg-blue-50 active',
      )}
      variant="default"
      href={href}
    >
      {children}
    </Button>
  );
}
