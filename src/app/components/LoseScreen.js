'use client';
import { useState, useEffect } from 'react';
import styles from './LoseScreen.module.css';

const LoseScreen = ({ onRestart }) => {
  const [showTimer, setShowTimer] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Play lose sound
    const loseSound = new Audio('/sounds/lose.mp3');
    loseSound.play();

    // Flicker effect for timer
    const flickerInterval = setInterval(() => {
      setShowTimer(prev => !prev);
    }, 200);

    // Show content after flicker
    setTimeout(() => {
      clearInterval(flickerInterval);
      setShowTimer(false);
      setShowContent(true);
    }, 2000);

    return () => {
      clearInterval(flickerInterval);
      loseSound.pause();
      loseSound.currentTime = 0;
    };
  }, []);

  return (
    <div className={styles.container}>
      {showTimer && (
        <div className={styles.timer}>00:00:01</div>
      )}
      
      {showContent && (
        <div className={styles.content}>
          <h1 className={styles.title}>Too late.</h1>
          <p className={styles.subtitle}>One second can cost it all.</p>

          <div className={styles.messageBox}>
            <p className={styles.message}>
              De tijd is om. Maar geen zorgen, je kunt het opnieuw proberen!
            </p>
          </div>

          <button 
            className={styles.restartButton}
            onClick={onRestart}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default LoseScreen; 