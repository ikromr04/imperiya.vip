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
    <label className={classNames(className, 'relative flex flex-col')}>
      <span className="relative z-0 flex">
        <input
          className={classNames('input', (meta.error && meta.touched) ? 'border-red-400' : 'border-gray-200')}
          {...field}
          {...attributes}
          placeholder={placeholder}
        />
        <Label label={label} />
      </span>
      <ErrorMessage name={name} />
    </label>
  );
}
