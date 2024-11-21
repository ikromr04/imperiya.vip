import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import Label from './label';
import classNames from 'classnames';
import ErrorMessage from './error-message';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  label?: string;
  placeholder?: string;
};

export default function Input({
  className,
  name,
  label,
  placeholder = '',
  ...attributes
}: InputProps): JSX.Element {
  const [field, meta] = useField(name);

  return (
    <label className={classNames(className, 'flex flex-col')}>
      <Label label={label} />
      <input
        className={classNames((meta.error && meta.touched) ? 'border-red-400' : 'border-gray-200', 'flex grow bg-gray-50 border border-gray-200 rounded h-9 px-4 leading-none text-base focus:outline-none hover:bg-gray-100 focus:border-brand focus:bg-gray-100')}
        {...field}
        {...attributes}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} />
    </label>
  );
}
