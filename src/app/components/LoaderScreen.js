'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './LoaderScreen.module.css';

const LoaderScreen = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [isBlackBackground, setIsBlackBackground] = useState(true);

  useEffect(() => {
    // Show content after a short delay
    setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Randomly switch backgrounds
    const backgroundInterval = setInterval(() => {
      setIsBlackBackground(prev => !prev);
    }, 2000);

    // Add space key listener
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(backgroundInterval);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.container} ${isBlackBackground ? styles.blackBackground : styles.whiteBackground}`}>
      {showContent && (
        <div className={styles.content}>
          <div className={styles.logoContainer}>
            <Image
              src={isBlackBackground ? "/transa.png" : "/Onelife2.png"}
              alt="One Life Company Logo"
              width={800}
              height={800}
              className={styles.logo}
              priority
            />
          </div>
          <div className={`${styles.bottomText} ${isBlackBackground ? styles.whiteText : styles.blackText}`}>
            <p className={styles.collaboration}>
              ONELIFECOMPANY X NEXT WAVE 2025
            </p>
            <p className={styles.instruction}>
              Press SPACE to continue
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoaderScreen; 