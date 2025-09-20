import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import { useTimer } from './hooks/useTimer';
import type { Difficulty } from './types/types';
import './styles/globals.scss';
import styles from './App.module.scss';
import DifficultySelector from './components/DifficultySelector/DifficultySelector';
import Controls from './components/Controls/Controls';
import Modal from './components/Modal/Modal';

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [moves, setMoves] = useState(0);
  const { time, start, reset, stop } = useTimer();
  const [gameKey, setGameKey] = useState(0); // force GameBoard remount on restart
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRestart = () => {
    setMoves(0);
    reset();
    setGameKey((prev) => prev + 1); // remount GameBoard to reset
    setIsModalOpen(false);
  };

  const handleMove = () => setMoves((prev) => prev + 1);
  const handleGameStart = () => start();

  const handleGameEnd = () => {
    stop();
    setIsModalOpen(true);
  };

  return (
    <div className={styles.app}>
      <div className={styles.leftPanel}>
        <h1 className={styles.title}>Memory Game</h1>
        <DifficultySelector
          difficulty={difficulty}
          onChange={(newDifficulty) => {
            setDifficulty(newDifficulty);
            setMoves(0);
            reset(); // reset timer
            setGameKey((prev) => prev + 1); // remount GameBoard with new deck
          }}
        />
        <Controls moves={moves} time={time} onRestart={handleRestart} />
      </div>
      <div className={styles.rightPanel}>
        <GameBoard
          key={gameKey} // remount on restart
          difficulty={difficulty}
          onMove={handleMove}
          onGameStart={handleGameStart}
          onGameEnd={handleGameEnd}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleRestart}>
        <h2>🎉 Game Completed!</h2>
        <p>
          You finished in <strong>{moves}</strong> moves and{' '}
          <strong>{time}</strong> seconds.
        </p>
      </Modal>
    </div>
  );
};