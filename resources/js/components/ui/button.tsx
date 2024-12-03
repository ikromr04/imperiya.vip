import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  className,
  href,
  children,
  variant = 'primary',
  ...props
}: {
  className?: string;
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'text';
  [rest: string]: unknown;
}): JSX.Element {
  let variantClass = 'flex items-center gap-x-1 h-9 rounded-md px-4 transition-all duration-300';

  switch (variant) {
    case 'text':
      variantClass += ' text-blue-600 hover:text-blue-400 max-w-max';
      break;

    default:
      variantClass += ' bg-primary text-white font-semibold shadow-lg hover:bg-blue-600 hover:shadow-none';
      break;
  }

  if (href) {
    return (
      <Link className={classNames(className, variantClass)} to={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames(className, variantClass)} {...props}>
      {children}
    </button>
  );
}
