import { Icons } from '@/components/icons';
import { formatTime } from '@/utils';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type TimerProps = {
  secondsLeft: number;
};

function Timer(props: TimerProps): JSX.Element {
  const [secondsLeft, setSecondsLeft] = useState<number>(props.secondsLeft);
  const Icon = Icons[secondsLeft > 0 ? 'timer' : 'alarm'];

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <div
      className={classNames(
        'sticky top-4 z-30 flex justify-center items-center gap-2 text-xl font-medium rounded text-white px-4 h-9 ml-auto mb-4',
        (secondsLeft > 0) ? 'bg-success' : 'bg-danger',
      )}
    >
      <Icon width={16} height={16} />
      {formatTime(secondsLeft)}
    </div>
  );
}

export default Timer;
