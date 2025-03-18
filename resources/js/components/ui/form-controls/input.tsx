import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

function Input({
  className,
  ...props
}: InputProps): JSX.Element {
  return (
    <input
      {...props}
      className={classNames(
        'flex grow bg-gray-50 min-w-0 border border-gray-200 rounded h-8 px-4 leading-none text-base focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100',
        className,
      )}
    />
  );
}

export default Input;
