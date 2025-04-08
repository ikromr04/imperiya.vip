import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import Label from './partials/label';
import Before from './partials/before';
import Input from './partials/input';
import Cleanable from './partials/cleanable';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import { nanoid } from 'nanoid';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  cleanable?: boolean;
  onClean?: () => void;
  className?: string;
  inputClassname?: string;
  label?: string;
  required?: boolean;
  before?: JSX.Element;
  after?: JSX.Element;
};

function TextField({
  name,
  cleanable = false,
  onClean,
  className,
  inputClassname,
  label,
  before,
  required,
  after,
  ...props
}: TextFieldProps): JSX.Element {
  const uniqueId = nanoid();

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <Label required={required} label={label} htmlFor={uniqueId} />

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

export default TextField;
