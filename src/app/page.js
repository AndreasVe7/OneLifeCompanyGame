'use client';
import { useState, useEffect } from 'react';
import LoaderScreen from './components/LoaderScreen';
import StartScreen from './components/StartScreen';
import RulesScreen from './components/RulesScreen';
import ChallengeScreen from './components/ChallengeScreen';
import WinScreen from './components/WinScreen';
import LoseScreen from './components/LoseScreen';
import WalkAwayScreen from './components/WalkAwayScreen';
import DecisionScreen from './components/DecisionScreen';
import TimerScreen from './components/TimerScreen';
import ThankYouScreen from './components/ThankYouScreen';
import styles from './page.module.css';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('loader');
  const [challenge, setChallenge] = useState(null);
  const [result, setResult] = useState(null);
  // Timer for DecisionScreen
  const DECISION_DURATION = 10; // seconds
  const [decisionTimer, setDecisionTimer] = useState(DECISION_DURATION);
  const [timerScreenActive, setTimerScreenActive] = useState(false);
  const [timerResult, setTimerResult] = useState(null); // 'win' or 'late'

  useEffect(() => {
    if (currentScreen === 'decision') {
      setDecisionTimer(DECISION_DURATION);
      const interval = setInterval(() => {
        setDecisionTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // You can add what happens when the timer ends here
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'timerResult') {
      setTimeout(() => {
        setCurrentScreen('thankyou');
      }, 5000);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'thankyou') {
      const timeout = setTimeout(() => {
        setCurrentScreen('loader');
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [currentScreen]);

  const handleLoaderComplete = () => {
    setCurrentScreen('start');
  };

  const handleStart = () => {
    setCurrentScreen('rules');
  };

  const handleRulesComplete = () => {
    setCurrentScreen('challenge');
  };

  const handleChallengeTimerEnd = () => {
    setCurrentScreen('decision');
  };

  const handleChallengeComplete = (result) => {
    setResult(result);
    if (result === 'win') {
      setCurrentScreen('win');
    } else if (result === 'lose') {
      setCurrentScreen('lose');
    } else {
      setCurrentScreen('walkAway');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('start');
    setChallenge(null);
    setResult(null);
  };

  const handleWatchOthers = () => {
    // Hier kunnen we later een gallery toevoegen van andere spelers
    setCurrentScreen('start');
  };

  const handleDoChallenge = () => {
    setTimerResult(null);
    setCurrentScreen('timer');
  };

  const handleWalkAway = () => {
    setCurrentScreen('start');
  };

  const handleDecisionTimerEnd = () => {
    setCurrentScreen('start');
  };

  const handleTimerDone = () => {
    setTimerResult('win');
    setCurrentScreen('timerResult');
  };

  const handleTimerTimeout = () => {
    setTimerResult('late');
    setCurrentScreen('timerResult');
  };

  const handleTimerResultBack = () => {
    setCurrentScreen('start');
  };

  return (
    <main className={styles.main}>
      {currentScreen === 'loader' && (
        <LoaderScreen onComplete={handleLoaderComplete} />
      )}
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      {currentScreen === 'rules' && (
        <RulesScreen onStart={handleRulesComplete} />
      )}
      {currentScreen === 'challenge' && (
        <ChallengeScreen
          onTimerEnd={handleChallengeTimerEnd}
        />
      )}
      {currentScreen === 'decision' && (
        <DecisionScreen
          timer={decisionTimer}
          duration={DECISION_DURATION}
          onDoChallenge={handleDoChallenge}
          onWalkAway={handleWalkAway}
          onTimerEnd={handleDecisionTimerEnd}
        />
      )}
      {currentScreen === 'timer' && (
        <TimerScreen onDone={handleTimerDone} onTimeout={handleTimerTimeout} />
      )}
      {currentScreen === 'timerResult' && (
        <div style={{
          width: '100vw',
          height: '100vh',
          background: timerResult === 'win' ? '#48923E' : '#C81E1E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <span style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: '5rem',
            color: '#fff',
            marginBottom: '2rem',
            letterSpacing: '0.05em',
          }}>
            {timerResult === 'win' ? 'U WON!' : 'TOO LATE :('}
          </span>
          <button
            style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: '2rem',
              padding: '1rem 3rem',
              borderRadius: '8px',
              border: 'none',
              background: '#fff',
              color: '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '2rem',
            }}
            onClick={handleTimerResultBack}
          >
            Back to Home
          </button>
        </div>
      )}
      {currentScreen === 'thankyou' && (
        <ThankYouScreen />
      )}
      {currentScreen === 'win' && (
        <WinScreen onRestart={handleRestart} />
      )}
      {currentScreen === 'lose' && (
        <LoseScreen onRestart={handleRestart} />
      )}
      {currentScreen === 'walkAway' && (
        <WalkAwayScreen 
          onRestart={handleRestart}
          onWatchOthers={handleWatchOthers}
        />
      )}
    </main>
  );
}
