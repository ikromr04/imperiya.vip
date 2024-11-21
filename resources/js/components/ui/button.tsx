import classNames from 'classnames';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
}>;

export default function Button({
  className,
  children,
}: ButtonProps): JSX.Element {
  return (
    <button className={classNames(className, 'flex items-center h-11 bg-brand text-white font-semibold rounded-md shadow-lg px-4 transition-all duration-300 hover:bg-blue-600 hover:shadow-none')}>
      {children}
    </button>
  );
}
