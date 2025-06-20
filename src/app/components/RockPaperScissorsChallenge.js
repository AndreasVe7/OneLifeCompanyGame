'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './TimerGameChallenge.module.css';

const RockPaperScissorsChallenge = ({ phase, onTimerEnd, onStart, onCounterDone, initialTime = 10 }) => {
  const [timer, setTimer] = useState(initialTime);
  const [winCount, setWinCount] = useState(0);

  // Initial challenge screen with timer and images
  useEffect(() => {
    if (phase !== 'challenge') return;
    if (timer === 0) {
      onTimerEnd && onTimerEnd();
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, phase, onTimerEnd]);

  // Reset timer when phase changes to challenge
  useEffect(() => {
    if (phase === 'challenge') setTimer(initialTime);
  }, [phase, initialTime]);

  // Reset winCount when phase changes to counter
  useEffect(() => {
    if (phase === 'counter') setWinCount(0);
  }, [phase]);

  if (phase === 'explanation') {
    return (
      <div className={styles.container} style={{ background: '#fff', color: '#000' }}>
        <div className={styles.topBar} style={{ background: '#141414' }}>
          <Image src="/transa.png" alt="Transa Logo" width={100} height={100} className={styles.logo} />
        </div>
        <div className={styles.content} style={{ background: '#fff' }}>
          <div style={{ fontSize: '2.2rem', color: '#000', marginBottom: '2rem', textAlign: 'center', maxWidth: 700 }}>
            If you win <b>3 times in a row</b> at Rock Paper Scissors with different people each time, you win a shirt!<br /><br />
            Press START when you are ready to begin.
          </div>
          <button style={{ marginTop: 40, fontSize: '2rem', padding: '1rem 3rem', borderRadius: 8, background: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }} onClick={onStart}>
            START
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'counter') {
    return (
      <div className={styles.container} style={{ background: '#fff', color: '#000' }}>
        <div className={styles.topBar} style={{ background: '#141414' }}>
          <Image src="/transa.png" alt="Transa Logo" width={100} height={100} className={styles.logo} />
        </div>
        <div className={styles.content} style={{ background: '#fff', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '7rem', fontWeight: 'bold', margin: '2rem 0', textAlign: 'center' }}>{winCount}/3</div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button style={{ fontSize: '2rem', padding: '1rem 3rem', borderRadius: 8, background: '#48923E', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {
              if (winCount + 1 === 3) {
                onCounterDone && onCounterDone('win');
              } else {
                setWinCount((c) => c + 1);
              }
            }}>
              DONE
            </button>
            <button style={{ fontSize: '2rem', padding: '1rem 3rem', borderRadius: 8, background: '#C81E1E', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => onCounterDone && onCounterDone('fail')}>
              FAIL
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Initial challenge screen (timer + images)
  return (
    <div className={styles.container} style={{ background: '#fff', color: '#000' }}>
      <div className={styles.topBar} style={{ background: '#141414' }}>
        <Image src="/transa.png" alt="Transa Logo" width={100} height={100} className={styles.logo} />
      </div>
      <div className={styles.content} style={{ background: '#fff' }}>
        <div className={styles.timer} style={{ color: '#000' }}>{timer}</div>
        <div className={styles.challengeMainRow}>
          <Image src="/bladsteenschaar.png" alt="Rock Paper Scissors" width={400} height={400} className={styles.leftImage} priority />
          <Image src="/bladsteen.png" alt="Rock Paper" width={400} height={400} className={styles.rightImage} priority />
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissorsChallenge; 