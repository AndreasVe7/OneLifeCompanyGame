import React, { useEffect, useState, useRef } from 'react';
import styles from './TimerReflexChallenge.module.css';

const randomTimes = [
  '00:02:01', '00:00:15', '00:01:23', '00:00:45', '00:00:30', '00:00:10', '00:00:05', '00:00:20', '00:00:50', '00:00:01'
];

const TimerReflexChallenge = ({ onWin, onLose }) => {
  const [currentTimer, setCurrentTimer] = useState('00:00:10');
  const [active, setActive] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Switch timers every 0.3s
    intervalRef.current = setInterval(() => {
      const idx = Math.floor(Math.random() * randomTimes.length);
      setCurrentTimer(randomTimes[idx]);
    }, 300);

    // Listen for spacebar only
    const handleKeyDown = (e) => {
      if (!active) return;
      if (e.code === 'Space') {
        setActive(false);
        clearInterval(intervalRef.current);
        if (currentTimer === '00:00:01') {
          onWin();
        } else {
          onLose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, currentTimer, onWin, onLose]);

  return (
    <div className={styles.container}>
      <div className={styles.centeredContent}>
        <div className={styles.timer} style={{ fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{currentTimer}</div>
        <div className={styles.instruction} style={{ fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PRESS SPACE WHEN YOU SEE 00:00:01!</div>
      </div>
    </div>
  );
};

export default TimerReflexChallenge; 