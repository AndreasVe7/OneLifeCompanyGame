import React from 'react';
import Image from 'next/image';
import styles from './ImageScreen.module.css';

const ImageScreen = () => (
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
        src="/groep 3 (2).png"
        alt="Groep 3"
        width={600}
        height={600}
        className={styles.centerImage}
        priority
      />
    </div>
  </div>
);

export default ImageScreen; 