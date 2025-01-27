import classNames from 'classnames';
import React from 'react';

type SpinnerProps = {
  className?: string;
}

export default function Spinner({
  className,
}: SpinnerProps): JSX.Element {
  return (
    <span
      className={classNames(
        'inline-block animate-rotation rounded-[50%] border-t-[2px] border-t-[#2979ff] border-r-[2px] border-r-transparent w-8 h-8',
        className
      )}
    ></span>
  );
}
