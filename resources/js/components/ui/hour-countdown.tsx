import { ReactNode, useEffect, useState } from 'react';

const formatTime = (totalSeconds: number): string => {
  if (totalSeconds <= 0) return '00:00';

  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

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
