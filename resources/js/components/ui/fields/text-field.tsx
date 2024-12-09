import React, { InputHTMLAttributes, useId } from 'react';
import classNames from 'classnames';
import Label from './partials/label';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import Input from './partials/input';
import Before from './partials/before';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  inputClassname?: string;
  label?: string;
  before?: JSX.Element;
  after?: JSX.Element;
};

export default function TextField({
  name,
  className,
  inputClassname,
  label,
  before,
  after,
  ...props
}: TextFieldProps): JSX.Element {
  const uniqueId = useId();

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <Label label={label} htmlFor={uniqueId} />

      <div className="relative flex">
        <Before element={before} />

        <Input
          className={classNames(
            inputClassname,
            after && 'pr-8',
            before && 'pl-8',
          )}
          id={uniqueId}
          name={name}
          {...props}
        />

        <After element={after} />
      </div>

      <ErrorMessage name={name} />
    </div>
  );
}
