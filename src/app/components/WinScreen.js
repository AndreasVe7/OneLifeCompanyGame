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
          <h2 style={{ fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>YOU WON!</h2>
          <div className={styles.rewardCode}>
            <span style={{ fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>50% DISCOUNT CODE:</span>
            <span className={styles.code}>OL50</span>
          </div>
          <p className={styles.rewardInfo}>
            <span style={{ fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SHOW THIS CODE AT THE BOOTH TO GET YOUR FREE HOODIE</span>
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