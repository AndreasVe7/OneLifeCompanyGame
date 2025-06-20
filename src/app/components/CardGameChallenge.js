'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ChallengeScreen.module.css';

const NUM_CARDS = 6;

const CardGameChallenge = ({ onTimerEnd, onWin, onLose }) => {
  const [showFlash, setShowFlash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showCards, setShowCards] = useState(false);
  const [pickTimer, setPickTimer] = useState(10);
  const [picked, setPicked] = useState(null);
  const [winningCard, setWinningCard] = useState(null);
  const [message, setMessage] = useState('');

  // Initial challenge timer
  useEffect(() => {
    if (showCards) return;
    setTimer(10);
    setShowFlash(true);
    setShowContent(false);
    setTimeout(() => {
      setShowFlash(false);
      setTimeout(() => setShowContent(true), 500);
    }, 300);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setShowCards(true);
          setWinningCard(Math.floor(Math.random() * NUM_CARDS));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [showCards]);

  // Card picking timer
  useEffect(() => {
    if (!showCards || picked !== null) return;
    setPickTimer(10);
    const countdown = setInterval(() => {
      setPickTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          if (picked === null) onLose && onLose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [showCards, picked, onLose]);

  // Add this useEffect after handlePick
  useEffect(() => {
    if (picked === null) return;
    if (picked === winningCard) {
      setMessage('Gefeliciteerd! Je hebt 20% korting gewonnen!');
      const timeout = setTimeout(() => onWin && onWin(), 1200);
      return () => clearTimeout(timeout);
    } else {
      setMessage('Helaas, geen prijs onder deze kaart.');
      const timeout = setTimeout(() => onLose && onLose(), 1200);
      return () => clearTimeout(timeout);
    }
  }, [picked, winningCard, onWin, onLose]);

  // Update handlePick to only setPicked(idx)
  const handlePick = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
  };

  if (showCards) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.timer}>{pickTimer}</div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
            {[...Array(NUM_CARDS)].map((_, idx) => (
              <div key={idx} style={{ cursor: picked === null ? 'pointer' : 'default', opacity: picked !== null && picked !== idx ? 0.5 : 1 }} onClick={() => handlePick(idx)}>
                <Image src="/cardgamecard.png" alt={`Card ${idx+1}`} width={120} height={180} />
              </div>
            ))}
          </div>
          {picked !== null && <div style={{ fontSize: '2rem', color: picked === winningCard ? '#48923E' : '#C81E1E', marginTop: '1rem' }}>{message}</div>}
          {picked === null && <div style={{ fontSize: '1.2rem', color: '#fff', marginTop: '1rem' }}>Kies een kaart! Onder één kaart zit 20% korting.</div>}
        </div>
      </div>
    );
  }

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
              src="/cardgametext.png"
              alt="Card Game Text"
              width={500}
              height={500}
              className={styles.group2Image}
              priority
            />
            <Image
              src="/cardgamecard.png"
              alt="Card Game Card"
              width={500}
              height={500}
              className={styles.tshirtImage}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGameChallenge; 