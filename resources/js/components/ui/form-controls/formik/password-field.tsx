import React, { InputHTMLAttributes, useId, useState } from 'react';
import { Icons } from '../../../icons';
import classNames from 'classnames';
import Label from './partials/label';
import Input from './partials/input';
import After from './partials/after';
import ErrorMessage from './partials/error-message';
import { generateRandomPassword } from '../../../../utils';
import { useField } from 'formik';

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  label?: string;
  generatable?: boolean;
  onGenerate?: (password: string) => void;
};

function PasswordField({
  name,
  className,
  label,
  generatable,
  onGenerate,
  ...props
}: PasswordFieldProps): JSX.Element {
  const [, , helper] = useField(name);
  const uniqueId = useId();
  const [type, setType] = useState<'password' | 'text'>('password');

  const handleGenerateButtonClick = () => {
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
          <button
            className="relative flex justify-center items-center w-5 h-5 group"
            type="button"
            onClick={handleGenerateButtonClick}
          >
            <Icons.autorenew className="text-success" width={14} height={14} />
            <span className="sr-only">Сгенерировать пароль</span>
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

        <After element={<>
          <button
            className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300"
            type="button"
            onClick={() => type === 'password' ? setType('text') : setType('password')}
          >
            {type === 'password'
              ? <Icons.visibility width={20} />
              : <Icons.visibilityOff width={20} />}
          </button>
        </>} />
      </div>

      <ErrorMessage name={name} />
    </div>
  );
}

export default PasswordField;
