'use client';
import { useState, useEffect } from 'react';
import styles from './CountdownScreen.module.css';

const CountdownScreen = ({ onComplete, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsComplete(true);
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    // Play tick sound
    const tickSound = new Audio('/sounds/clock-tick.mp3');
    tickSound.play();

    return () => {
      clearInterval(timer);
      tickSound.pause();
      tickSound.currentTime = 0;
    };
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    return `00:00:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.challengeReminder}>
        <h2 style={{ fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TAKE A SELFIE WITH SOMEONE IN OUR LINE WITHIN 30 SECONDS.</h2>
      </div>

      <div className={styles.timerContainer}>
        <div className={`${styles.timer} ${timeLeft <= 5 ? styles.warning : ''}`} style={{ fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <button 
        className={`${styles.completeButton} ${isComplete ? styles.disabled : ''}`}
        onClick={onComplete}
        disabled={isComplete}
      >
        I DID IT!
      </button>
    </div>
  );
};

export default CountdownScreen; 