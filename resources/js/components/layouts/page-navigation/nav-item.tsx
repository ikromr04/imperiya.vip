import React, { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { Icons } from '../../icons';
import classNames from 'classnames';

type

export default function NavItem({
  icon,
  href,
  ...props
}: {
  icon: keyof typeof Icons;
  href?: string;
  [props: string]: any;
}): JSX.Element {
  const
    { pathname } = useLocation(),
    Icon = Icons[icon];

  if (href) {
    const isActive = href != '/' ? pathname.startsWith(href) : (href === pathname);

    return (
      <li>
        <Link
          {...(props as LinkProps)}
          className={classNames('flex items-center justify-center w-9 h-9 rounded-r-md', isActive && 'bg-blue-50')}
          to={href}
        >
          <Icon className={isActive ? 'text-success' : ''} width={16} height={16} />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        className="flex items-center justify-center w-9 h-9"
      >
        <Icon width={16} height={16} />
      </button>
    </li>
  );
}
