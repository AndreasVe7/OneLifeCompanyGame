import React, { useEffect } from 'react';
import styles from './DecisionScreen.module.css';

const DecisionScreen = ({ timer, duration, onDoChallenge, onWalkAway, onTimerEnd }) => {
  // Call onTimerEnd when timer reaches 0
  useEffect(() => {
    if (timer === 0 && onTimerEnd) {
      onTimerEnd();
    }
  }, [timer, onTimerEnd]);

  // Calculate percentage for the timer bar
  const percent = duration > 0 ? (timer / duration) * 100 : 0;
  return (
    <div className={styles.container}>
      <div
        className={styles.greenSide}
        onClick={onDoChallenge}
        role="button"
        tabIndex={0}
        aria-label="Do the challenge"
      >
        <p className={styles.greenText}>DO THE</p>
        <p className={styles.greenText}>CHALLENGE</p>
      </div>
      <div
        className={styles.redSide}
        onClick={onWalkAway}
        role="button"
        tabIndex={0}
        aria-label="Walk away"
      >
        <p className={styles.redText}>WALK</p>
        <p className={styles.redText}>AWAY</p>
      </div>
      <div className={styles.timerBarWrapper}>
        <div className={styles.timerBar} style={{ width: percent + '%' }} />
      </div>
    </div>
  );
};

export default DecisionScreen; 