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
import TimerGameChallenge from './components/TimerGameChallenge';
import TimerReflexChallenge from './components/TimerReflexChallenge';
import CardGameChallenge from './components/CardGameChallenge';
import SelfieGameChallenge from './components/SelfieGameChallenge';
import SelfieChallengeScreen from './components/SelfieChallengeScreen';
import RockPaperScissorsChallenge from './components/RockPaperScissorsChallenge';
import OneLifeDiscountChallenge from './components/OneLifeDiscountChallenge';
import styles from './page.module.css';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('loader');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [result, setResult] = useState(null);
  // Timer for DecisionScreen
  const DECISION_DURATION = 10; // seconds
  const [decisionTimer, setDecisionTimer] = useState(DECISION_DURATION);
  const [timerScreenActive, setTimerScreenActive] = useState(false);
  const [timerResult, setTimerResult] = useState(null); // 'win' or 'late'
  const [selfiePhase, setSelfiePhase] = useState('initial'); // 'initial' | 'decision' | 'challenge'
  const [rockPaperPhase, setRockPaperPhase] = useState('initial'); // 'initial' | 'explanation' | 'counter'
  const [includeFirstChallenge, setIncludeFirstChallenge] = useState(true);

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
    // Randomly pick a challenge
    let challenges = ['timerGameChallenge', 'cardGameChallenge', 'selfieGameChallenge', 'rockPaperScissorsChallenge', 'oneLifeDiscountChallenge'];
    if (includeFirstChallenge) {
      challenges = ['challenge', ...challenges];
    }
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setCurrentChallenge(randomChallenge);
    if (randomChallenge === 'selfieGameChallenge') {
      setSelfiePhase('initial');
    }
    if (randomChallenge === 'rockPaperScissorsChallenge') {
      setRockPaperPhase('initial');
    }
    setCurrentScreen(randomChallenge);
  };

  const handleChallengeTimerEnd = () => {
    if (currentChallenge === 'selfieGameChallenge') {
      setSelfiePhase('decision');
      setCurrentScreen('decision');
    } else if (currentChallenge === 'rockPaperScissorsChallenge') {
      setRockPaperPhase('decision');
      setCurrentScreen('decision');
    } else {
      setCurrentScreen('decision');
    }
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
    setCurrentChallenge(null);
    setResult(null);
  };

  const handleWatchOthers = () => {
    // Hier kunnen we later een gallery toevoegen van andere spelers
    setCurrentScreen('start');
  };

  const handleDoChallenge = () => {
    setTimerResult(null);
    if (currentChallenge === 'timerGameChallenge') {
      setCurrentScreen('timerReflex');
    } else if (currentChallenge === 'selfieGameChallenge') {
      setSelfiePhase('challenge');
      setCurrentScreen('selfieGameChallenge');
    } else if (currentChallenge === 'rockPaperScissorsChallenge') {
      setRockPaperPhase('explanation');
      setCurrentScreen('rockPaperScissorsChallenge');
    } else {
      setCurrentScreen('timer');
    }
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

  const handleStartTimerGameChallenge = () => {
    setCurrentScreen('timerGameChallenge');
  };

  const handleRockPaperStart = () => setRockPaperPhase('counter');
  const handleRockPaperCounterDone = (result) => {
    if (result === 'win') {
      setTimerResult('win');
      setCurrentScreen('timerResult');
    } else {
      setTimerResult('late');
      setCurrentScreen('timerResult');
    }
  };

  return (
    <main className={styles.main}>
      {currentScreen === 'loader' && (
        <LoaderScreen onComplete={handleLoaderComplete} />
      )}
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStart} includeFirstChallenge={includeFirstChallenge} setIncludeFirstChallenge={setIncludeFirstChallenge} />
      )}
      {currentScreen === 'rules' && (
        <RulesScreen onStart={handleRulesComplete} />
      )}
      {currentScreen === 'challenge' && (
        <ChallengeScreen onTimerEnd={handleChallengeTimerEnd} />
      )}
      {currentScreen === 'timerGameChallenge' && (
        <TimerGameChallenge onTimerEnd={handleChallengeTimerEnd} />
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
      {currentScreen === 'timerReflex' && (
        <TimerReflexChallenge 
          onWin={() => { setTimerResult('win'); setCurrentScreen('timerResult'); }}
          onLose={() => { setTimerResult('late'); setCurrentScreen('timerResult'); }}
        />
      )}
      {currentScreen === 'cardGameChallenge' && (
        <CardGameChallenge 
          onTimerEnd={handleChallengeTimerEnd}
          onWin={() => { setTimerResult('win'); setCurrentScreen('timerResult'); }}
          onLose={() => { setTimerResult('late'); setCurrentScreen('timerResult'); }}
        />
      )}
      {currentScreen === 'selfieGameChallenge' && selfiePhase === 'initial' && (
        <SelfieChallengeScreen onTimerEnd={handleChallengeTimerEnd} initialTime={10} />
      )}
      {currentScreen === 'selfieGameChallenge' && selfiePhase === 'challenge' && (
        <SelfieGameChallenge onTimerEnd={(result) => {
          if (result === 'win') {
            setTimerResult('win');
            setCurrentScreen('timerResult');
          } else {
            setTimerResult('late');
            setCurrentScreen('timerResult');
          }
        }} />
      )}
      {currentScreen === 'rockPaperScissorsChallenge' && rockPaperPhase === 'initial' && (
        <RockPaperScissorsChallenge phase="challenge" onTimerEnd={handleChallengeTimerEnd} initialTime={10} />
      )}
      {currentScreen === 'rockPaperScissorsChallenge' && rockPaperPhase === 'explanation' && (
        <RockPaperScissorsChallenge phase="explanation" onStart={handleRockPaperStart} />
      )}
      {currentScreen === 'rockPaperScissorsChallenge' && rockPaperPhase === 'counter' && (
        <RockPaperScissorsChallenge phase="counter" onCounterDone={handleRockPaperCounterDone} />
      )}
      {currentScreen === 'oneLifeDiscountChallenge' && (
        <OneLifeDiscountChallenge onTimerEnd={handleChallengeTimerEnd} initialTime={10} />
      )}
    </main>
  );
}
