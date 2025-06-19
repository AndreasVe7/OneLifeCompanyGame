'use client';
import { useState, useEffect } from 'react';
import styles from './WinScreen.module.css';

const WinScreen = ({ onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Play win sound
    const winSound = new Audio('/sounds/win.mp3');
    winSound.play();

    // Show confetti after a short delay
    setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    return () => {
      winSound.pause();
      winSound.currentTime = 0;
    };
  }, []);

  return (
    <div className={styles.container}>
      {showConfetti && (
        <div className={styles.confettiContainer}>
          {[...Array(50)].map((_, i) => (
            <div key={i} className={styles.confetti} />
          ))}
        </div>
      )}

      <div className={styles.content}>
        <h1 className={styles.title}>You made it.</h1>
        <p className={styles.subtitle}>ONE LIFE = ONE SHOT.</p>

        <div className={styles.rewardBox}>
          <h2>Je hebt gewonnen!</h2>
          <div className={styles.rewardCode}>
            <span>50% KORTINGSCODE:</span>
            <span className={styles.code}>OL50</span>
          </div>
          <p className={styles.rewardInfo}>
            Toon deze code bij de stand om je GRATIS hoodie te ontvangen
          </p>
        </div>

        <button 
          className={styles.restartButton}
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinScreen; 