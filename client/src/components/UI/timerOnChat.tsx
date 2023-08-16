import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAvailableMessages } from '../../redux/slices/availableChats/availableChatThunks';

export default function TimerOnChat({ timer }): JSX.Element {
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(timeRemaining.minutes, timeRemaining.seconds);
    if (timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds <= 0) {
      void dispatch(fetchAvailableMessages());
    }

    const createdAtDateObj = new Date(timer);
    const deleteDate = new Date(createdAtDateObj.getTime() + 30 * 1000);

    const updateTimer = () => {
      const currentTime = new Date();
      const timeDifference = deleteDate - currentTime;
      const roundedNumber = Math.ceil(timeDifference / 1000) * 1000;

      const hours = Math.floor(roundedNumber / (60 * 60 * 1000));
      const minutes = Math.floor((roundedNumber % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((roundedNumber % (60 * 1000)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    const timerInterval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timeRemaining]);

  useEffect(() => {
    const createdAtDateObj = new Date(timer);
    const deleteDate = new Date(createdAtDateObj.getTime() + 24 * 60 * 60 * 1000);

    const currentTime = new Date();
    const timeDifference = deleteDate - currentTime;

    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    setTimeRemaining({ hours, minutes, seconds });
  }, []);

  return (
    <Typography>
      {timeRemaining.hours}:
      {timeRemaining.minutes < 10 ? `0${timeRemaining.minutes}` : timeRemaining.minutes}:
      {timeRemaining.seconds < 10 ? `0${timeRemaining.seconds}` : timeRemaining.seconds}
    </Typography>
  );
}
