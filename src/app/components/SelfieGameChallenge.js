'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './TimerGameChallenge.module.css';

const SelfieGameChallenge = ({ onTimerEnd }) => {
  const [phase, setPhase] = useState('explanation'); // 'explanation' | 'timer'
  const [timer, setTimer] = useState(60);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (phase !== 'timer' || done) return;
    if (timer === 0) {
      onTimerEnd && onTimerEnd('lose');
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, timer, done, onTimerEnd]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (phase === 'explanation') {
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
          <div style={{ fontSize: '2.5rem', color: '#000', marginBottom: '2rem', textAlign: 'center', maxWidth: 700, fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            TAKE A SELFIE WITH 10 DIFFERENT PEOPLE WITHIN 1 MINUTE!<br />
            PRESS START WHEN YOU ARE READY TO BEGIN.
          </div>
          <button style={{ marginTop: 40, fontSize: '2rem', padding: '1rem 3rem', borderRadius: 8, background: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }} onClick={() => { setPhase('timer'); setTimer(60); setDone(false); }}>
            START
          </button>
        </div>
      </div>
    );
  }

  // Timer phase
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
        <div className={styles.timer} style={{ color: '#000', fontFamily: 'Impact, sans-serif', fontSize: '7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '2rem' }}>{formatTime(timer)}</div>
        <button style={{ marginTop: 40, fontSize: '2rem', padding: '1rem 3rem', borderRadius: 8, background: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }} onClick={() => { setDone(true); onTimerEnd && onTimerEnd('win'); }} disabled={done}>
          DONE
        </button>
      </div>
    </div>
  );
};

export default SelfieGameChallenge; 