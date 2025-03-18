import React, { BaseSyntheticEvent, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import Label from './label';
import Input from './input';
import { nanoid } from 'nanoid';
import Cleanable from './cleanable';
import After from './after';
import Before from './before';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  required?: boolean;
  before?: JSX.Element;
  after?: JSX.Element;
};

function TextField({
  className,
  label,
  value,
  onChange,
  required,
  before,
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
          className={classNames(
            after ? 'pr-16' : 'pr-8',
            before && 'pl-8',
          )}
          id={uniqueId}
          value={value}
          {...props}
          onChange={(evt: BaseSyntheticEvent) => onChange && onChange(evt.target.value)}
        />

        {value && (
          <Cleanable
            className={classNames('absolute top-1/2', after ? 'right-8' : 'right-0')}
            onClean={() => onChange && onChange('')}
          />
        )}

        <After element={after} />
      </div>
    </div>
  );
}

export default TextField;
