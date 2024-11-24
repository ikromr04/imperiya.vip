import React, { useState } from 'react';
import Input from '../../ui/input/input';
import { Icons } from '../../icons';

export default function PasswordConfirmation(): JSX.Element {
  const [type, setType] = useState<'password' | 'text'>('password');

  return (
    <Input
      className="mb-4"
      name="password_confirmation"
      label="Подтвердите пароль"
      iconAfter={
        <button
          className="flex items-center justify-center w-full h-full hover:bg-gray-200 transition-all duration-300"
          type="button"
          onClick={() => type === 'password' ? setType('text') : setType('password')}
        >
          {type === 'password'
            ? <Icons.eye width={20} />
            : <Icons.eyeSlash width={22} />}
        </button>
      }
      type={type}
    />
  );
}
