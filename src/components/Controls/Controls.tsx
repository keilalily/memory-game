import styles from "./Controls.module.scss";

interface ControlsProps {
  moves: number;
  time: number;
  onRestart: () => void;
}

export default function Controls({ moves, time, onRestart }: ControlsProps) {
    return (
        <div className={styles.controls}>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span>Moves:</span>
                    <span>{moves}</span>
                </div>
                <div className={styles.stat}>
                    <span>Time:</span>
                    <span>{time}s</span>
                </div>
            </div>
            <button className={styles.restartButton} onClick={onRestart}>
                Restart
            </button>
        </div>
    );
};