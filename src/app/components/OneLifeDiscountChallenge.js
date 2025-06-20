'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ChallengeScreen.module.css';

const OneLifeDiscountChallenge = ({ onTimerEnd, initialTime = 10 }) => {
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
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Image src="/transa.png" alt="Transa Logo" width={100} height={100} className={styles.logo} />
      </div>
      <div className={styles.content}>
        <div className={styles.timer}>{timer}</div>
        <div className={styles.challengeMainRow}>
          <Image src="/onelifediscounttext.png" alt="One Life Discount Text" width={500} height={500} className={styles.group2Image} priority />
          <Image src="/onelifediscount.png" alt="One Life Discount" width={500} height={500} className={styles.tshirtImage} priority />
        </div>
      </div>
    </div>
  );
};

export default OneLifeDiscountChallenge; 