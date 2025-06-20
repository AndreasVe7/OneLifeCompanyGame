'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './TimerGameChallenge.module.css';

const SelfieChallengeScreen = ({ onTimerEnd, initialTime = 10 }) => {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    if (timer === 0) {
      onTimerEnd && onTimerEnd();
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, onTimerEnd]);

  return (
    <div className={styles.container} style={{ background: '#fff', color: '#000' }}>
      <div className={styles.topBar} style={{ background: '#141414' }}>
        <Image src="/transa.png" alt="Transa Logo" width={100} height={100} className={styles.logo} />
      </div>
      <div className={styles.content} style={{ background: '#fff' }}>
        <div className={styles.timer} style={{ color: '#000' }}>{timer}</div>
        <div className={styles.challengeMainRow}>
          <Image src="/selfiegame.png" alt="Selfie Game" width={400} height={400} className={styles.leftImage} priority />
          <Image src="/selfiegamelog.png" alt="Selfie Game Logo" width={400} height={400} className={styles.rightImage} priority />
        </div>
      </div>
    </div>
  );
};

export default SelfieChallengeScreen; 