import { useField } from 'formik';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import Label from './label';
import classNames from 'classnames';
import ErrorMessage from './error-message';
import IconAfter from './icon-after';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  label?: ReactNode;
  iconAfter?: ReactNode;
  placeholder?: string;
};

export default function Input({
  className,
  name,
  label,
  iconAfter,
  placeholder = '',
  ...attributes
}: InputProps): JSX.Element {
  const [field, meta] = useField(name);

  return (
    <label className={classNames(className, 'flex flex-col')}>
      <Label label={label} />
      <span className="relative flex">
        <input
          className={classNames(
            'flex grow bg-gray-50 border border-gray-200 rounded h-9 px-4 leading-none text-base focus:outline-none hover:bg-gray-100 focus:border-brand focus:bg-gray-100',
            (meta.error && meta.touched) ? 'border-red-400' : 'border-gray-200',
            iconAfter && 'pr-10',
          )}
          {...field}
          {...attributes}
          placeholder={placeholder}
        />
        <IconAfter icon={iconAfter} />
      </span>
      <ErrorMessage name={name} />
    </label>
  );
}
