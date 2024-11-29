import React, { InputHTMLAttributes, useId, useState } from 'react';
import { Icons } from '../../icons';
import classNames from 'classnames';
import Label from './partials/label';
import Input from './partials/input';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import { generateRandomPassword } from '../../../utils';
import { useField } from 'formik';

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  label?: string;
  generatable?: boolean;
  onGenerate?: (password: string) => void;
};

export default function PasswordField({
  name,
  className,
  label,
  generatable,
  onGenerate,
  ...props
}: PasswordFieldProps): JSX.Element {
  const
    [, , helper] = useField(name),
    uniqueId = useId(),
    [type, setType] = useState<'password' | 'text'>('password'),

    handleGenerateButtonClick = () => {
      const password = generateRandomPassword();

      if (onGenerate) {
        onGenerate(password);
      } else {
        helper.setValue(password);
      };
    };

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <div className="flex">
        <Label label={label} htmlFor={uniqueId} />
        {generatable &&
          <button className="relative flex justify-center items-center w-5 h-5 group" type="button" onClick={handleGenerateButtonClick}>
            <Icons.rotate className="text-green-600" width={12} height={12} />
            {/* <Tooltip label="Сгенерировать" position="right" /> */}
          </button>}
      </div>

      <div className="relative flex">
        <Input
          className={classNames('pr-10')}
          id={uniqueId}
          name={name}
          type={type}
          {...props}
        />

        <After icon={<>
          <button
            className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300"
            type="button"
            onClick={() => type === 'password' ? setType('text') : setType('password')}
          >
            {type === 'password'
              ? <Icons.eye width={20} />
              : <Icons.eyeSlash width={22} />}
          </button>
        </>} />
      </div>

      <ErrorMessage name={name} />
    </div>
  );
}
