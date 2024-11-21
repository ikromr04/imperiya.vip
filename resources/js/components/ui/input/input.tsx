import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import Label from './label';
import classNames from 'classnames';
import ErrorMessage from './error-message';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  label?: string;
};

export default function Input({
  className,
  name,
  label,
  ...attributes
}: InputProps): JSX.Element {
  const [field] = useField(name);

  return (
    <label className={classNames(className, 'relative flex flex-col')}>
      <span className="relative z-0 flex">
        <input
          className="input"
          {...field}
          {...attributes}
        />
        <Label label={label} />
      </span>
      <ErrorMessage name={name} />
    </label>
  );
}
