import React from 'react';
import Image from 'next/image';
import styles from './ThankYouScreen.module.css';

const ThankYouScreen = () => (
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
      <Image
        src="/group-3-2.png"
        alt="Group 3"
        width={900}
        height={900}
        className={styles.centerLogo}
        priority
      />
    </div>
  </div>
);

export default ThankYouScreen; 