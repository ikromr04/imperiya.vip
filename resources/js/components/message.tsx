import React, { ReactNode } from 'react';
import { PropsWithClassname } from '../types';
import classNames from 'classnames';

export type MessageProps = PropsWithClassname<{
  message?: [
    message: string,
    type: 'success' | 'error' | 'warn',
  ];
}>;

export default function Message({
  className,
  message,
}: MessageProps): ReactNode {
  if (!message) return null;

  return (
    <p className={classNames(className, `text-${message[1]}`)}>
      {message[0]}
    </p>
  );
}
