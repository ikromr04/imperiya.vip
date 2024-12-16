import React, { InputHTMLAttributes, useId } from 'react';
import classNames from 'classnames';
import Label from './partials/label';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import Input from './partials/input';
import Before from './partials/before';
import Cleanable from './partials/cleanable';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  cleanable?: boolean;
  onClean?: () => void;
  className?: string;
  inputClassname?: string;
  label?: string;
  before?: JSX.Element;
  after?: JSX.Element;
};

export default function TextField({
  name,
  cleanable = false,
  onClean,
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
          {...props}
          className={classNames(
            inputClassname,
            (after || cleanable) && 'pr-8',
            (after && cleanable) && 'pr-16',
            before && 'pl-8',
          )}
          id={uniqueId}
          name={name}
        />

        <Cleanable
          className={classNames('absolute top-1/2', after ? 'right-8' : 'right-0')}
          name={name}
          cleanable={cleanable}
          onClean={onClean}
        />

        <After element={after} />
      </div>

      <ErrorMessage name={name} />
    </div>
  );
}
