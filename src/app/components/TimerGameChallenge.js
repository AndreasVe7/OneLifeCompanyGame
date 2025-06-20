'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './TimerGameChallenge.module.css';

const TimerGameChallenge = ({ onTimerEnd }) => {
  const [showFlash, setShowFlash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    // Red flash effect
    setTimeout(() => {
      setShowFlash(false);
      // Show content after flash
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }, 300);

    // Timer logic
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          onTimerEnd();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [onTimerEnd]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Image
          src="/transa.png"
          alt="Transa Logo"
          width={100}
          height={100}
          className={styles.logo}
        />
      </div>
      {showFlash && <div className={styles.flash} />}
      {showContent && (
        <div className={styles.content}>
          <div className={styles.timer}>{timer}</div>
          <div className={styles.challengeMainRow}>
            <Image
              src="/timergame.png"
              alt="Timer Game"
              width={500}
              height={500}
              className={styles.leftImage}
              priority
            />
            <Image
              src="/pngblack1.png"
              alt="Black PNG"
              width={500}
              height={500}
              className={styles.rightImage}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerGameChallenge; 