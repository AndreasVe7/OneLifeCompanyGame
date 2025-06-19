import React, { useEffect, useState } from 'react';
import styles from './TimerScreen.module.css';

const TimerScreen = ({ onDone, onTimeout }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 1) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 1 && onTimeout) {
      onTimeout();
    }
  }, [timer, onTimeout]);

  // Format timer as 00:00:XX
  const formatTime = (t) => `00:00:${t.toString().padStart(2, '0')}`;

  return (
    <div className={styles.container}>
      <div className={styles.timer}>{formatTime(timer)}</div>
      <button className={styles.doneButton} onClick={onDone}>Done</button>
    </div>
  );
};

export default TimerScreen; 