'use client';
import { useState } from 'react';
import LoaderScreen from './LoaderScreen';
import StartScreen from './StartScreen';
import RulesScreen from './RulesScreen';
import ChallengeScreen from './ChallengeScreen';
import WinScreen from './WinScreen';
import LoseScreen from './LoseScreen';
import WalkAwayScreen from './WalkAwayScreen';

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState('loader');
  const [challenge, setChallenge] = useState(null);
  const [result, setResult] = useState(null);

  const handleLoaderComplete = () => {
    setCurrentScreen('start');
  };

  const handleStart = () => {
    setCurrentScreen('rules');
  };

  const handleRulesComplete = () => {
    setCurrentScreen('challenge');
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

  return (
    <div>
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
          onComplete={handleChallengeComplete}
          challenge={challenge}
        />
      )}
      {currentScreen === 'win' && (
        <WinScreen onRestart={handleRestart} />
      )}
      {currentScreen === 'lose' && (
        <LoseScreen onRestart={handleRestart} />
      )}
      {currentScreen === 'walkAway' && (
        <WalkAwayScreen onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Game; 