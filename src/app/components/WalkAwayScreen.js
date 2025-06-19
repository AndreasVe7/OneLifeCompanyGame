'use client';
import { useState, useEffect } from 'react';
import styles from './WalkAwayScreen.module.css';

const WalkAwayScreen = ({ onRestart, onWatchOthers }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Fade in content after a short delay
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  }, []);

  return (
    <div className={styles.container}>
      {showContent && (
        <div className={styles.content}>
          <div className={styles.messageBox}>
            <h1 className={styles.title}>Sometimes walking away feels safer...</h1>
            <p className={styles.subtitle}>But who said safe is exciting?</p>
          </div>

          <div className={styles.buttonContainer}>
            <button 
              className={`${styles.button} ${styles.restartButton}`}
              onClick={onRestart}
            >
              Restart
            </button>
            <button 
              className={`${styles.button} ${styles.watchButton}`}
              onClick={onWatchOthers}
            >
              Watch Others Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalkAwayScreen; 