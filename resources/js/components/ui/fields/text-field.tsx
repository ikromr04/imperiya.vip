import React, { InputHTMLAttributes, useId } from 'react';
import classNames from 'classnames';
import Label from './partials/label';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import Input from './partials/input';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  label?: string;
  after?: JSX.Element;
};

export default function TextField({
  name,
  className,
  label,
  after,
  ...props
}: TextFieldProps): JSX.Element {
  const uniqueId = useId();

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <Label label={label} htmlFor={uniqueId} />

      <div className="relative flex">
        <Input
          className={classNames(after && 'pr-10')}
          id={uniqueId}
          name={name}
          {...props}
        />

        <After icon={after} />
      </div>

      <ErrorMessage name={name} />
    </div>
  );
}
