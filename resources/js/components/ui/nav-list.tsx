import React from 'react';
import NavLink, { NavLinkProps } from './nav-link';
import classNames from 'classnames';

type NavListProps = {
  className?: string;
  links: NavLinkProps[];
};

export default function NavList({
  className,
  links,
}: NavListProps): JSX.Element {
  return (
    <ul className={classNames(className, 'flex flex-col p-1 pl-0 gap-1 md:pl-1')}>
      {links.map((link) => (
        <li key={link.label}>
          <NavLink {...link} />
        </li>
      ))}
    </ul>
  );
}
