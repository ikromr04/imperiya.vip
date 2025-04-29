import React, { ReactNode } from 'react';
import classNames from 'classnames';

const MessageVariant = {
  'success': 'text-success',
  'error': 'text-error',
  'warn': 'text-warn',
};

export type MessageProps = {
  className?: string;
  message?: [
    message: string,
    type: keyof typeof MessageVariant,
  ];
};

export default function Message({
  className,
  message,
}: MessageProps): ReactNode {
  if (!message) return;

  return (
    <p className={classNames(className, MessageVariant[message[1]])}>
      {message[0]}
    </p>
  );
}
