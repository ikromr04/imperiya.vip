import React, { ReactNode } from 'react';
import { PropsWithClassname } from '../types';
import classNames from 'classnames';

const MessageVariant = {
  'success': 'text-success',
  'error': 'text-error',
  'warn': 'text-warn',
};

export type MessageProps = PropsWithClassname<{
  message?: [
    message: string,
    type: keyof typeof MessageVariant,
  ];
}>;

export default function Message({
  className,
  message,
}: MessageProps): ReactNode {
  if (!message) return null;

  return (
    <p className={classNames(className, MessageVariant[message[1]])}>
      {message[0]}
    </p>
  );
}
