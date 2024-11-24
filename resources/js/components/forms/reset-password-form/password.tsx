import React, { useState } from 'react';
import Input from '../../ui/input/input';
import { Icons } from '../../icons';
import Tooltip from '../../ui/tooltip';

export default function Password({
  onPasswordGenerate,
}: {
  onPasswordGenerate: () => void;
}): JSX.Element {
  const [type, setType] = useState<'password' | 'text'>('password');

  return (
    <Input
      className="mb-5"
      name="password"
      label={<>
        Новый пароль
        <button className="block ml-[6px]" type="button">
          <span className="group" onClick={onPasswordGenerate}>
            <Icons.rotate className="text-green-600" width={12} height={12} />
            <Tooltip label="Сгенерировать" position="right" />
          </span>
        </button>
      </>}
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
