'use client';
import Image from 'next/image';
import styles from './RulesScreen.module.css';

const RulesScreen = ({ onStart }) => {
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
      <div className={styles.content}>
        <div className={styles.imageReplacementContainer}>
          <Image
            src="/group-1-3.png"
            alt="Game Rules"
            width={1008}
            height={756}
            className={styles.rulesImage}
            priority
          />
        </div>
        <button 
          className={styles.startButton}
          onClick={onStart}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default RulesScreen; 