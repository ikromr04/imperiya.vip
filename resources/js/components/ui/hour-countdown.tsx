import { formatTime } from '@/utils';
import { ReactNode, useEffect, useState } from 'react';

type HourCountdownProps = {
  secondsLeft: number;
};

function HourCountdown(props: HourCountdownProps): ReactNode {
  const [secondsLeft, setSecondsLeft] = useState<number>(props.secondsLeft);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return formatTime(secondsLeft);
};

export default HourCountdown;
