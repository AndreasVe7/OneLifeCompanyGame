'use client';
import { useState, useEffect } from 'react';
import styles from './StartScreen.module.css';

const StartScreen = ({ onStart }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Create glitch effect
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100);
    }, 2000);

    // Play clock sound
    const clockSound = new Audio('/sounds/clock-tick.mp3');
    clockSound.loop = true;
    clockSound.play();

    return () => {
      clearInterval(glitchInterval);
      clockSound.pause();
      clockSound.currentTime = 0;
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${isGlitching ? styles.glitch : ''}`}>
        Ready to take a risk?
      </h1>
      <button 
        className={styles.startButton}
        onClick={onStart}
      >
        PRESS TO START
      </button>
      <div className={styles.bottomText}>
        <p className={styles.collaboration}>
          ONELIFECOMPANY X NEXT WAVE 2025
        </p>
      </div>
    </div>
  );
};

export default StartScreen; 