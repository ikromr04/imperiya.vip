import classNames from 'classnames';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  id: string;
};

export default function Input({
  name,
  id,
  className,
  ...props
}: InputProps): JSX.Element {
  const [field, meta] = useField(name);

  return (
    <input
      {...field}
      {...props}
      className={classNames(
        'flex grow bg-gray-50 min-w-0 border border-gray-200 rounded h-8 px-4 leading-none text-base focus:outline-none hover:bg-gray-100 focus:border-primary focus:bg-gray-100',
        (meta.error && meta.touched) ? 'border-red-400' : 'border-gray-200',
        className,
      )}
      id={id}
    />
  );
}
