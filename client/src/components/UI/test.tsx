import React from 'react';

export function timeConvert(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function TimerPart({ timeProp }: { timeProp: number }): JSX.Element {
  const [time, setTime] = React.useState(() => timeProp);
  const [stop, setStop] = React.useState(true);
  const resetHandler = (): void => {
    setTime(timeProp);
    setStop(false);
  };
  React.useEffect(() => {
    if (time === 0) {
      setTimeout(() => {
        setTime(timeProp);
      }, 1000);
    }
    if (time > 0 && !stop) {
      const timer = setTimeout(() => {
        setTime(time + 1000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time, stop]);
  return (
    <div>
      TimerPart: {timeConvert(time)}
      <p>
        <button type="button" onClick={() => setStop(!stop)}>
          {stop ? 'Start' : 'Stop'}
        </button>
        <button type="button" onClick={resetHandler}>
          reset
        </button>
      </p>
    </div>
  );
}
