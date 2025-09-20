import type { Difficulty } from "../../types/types";
import styles from './DifficultySelector.module.scss';

interface DifficultySelectorProps {
    difficulty: Difficulty;
    onChange: (d: Difficulty) => void;
}

const options: { value: Difficulty; label: string }[] = [
    { value: "easy", label: "2 × 2" },
    { value: "medium", label: "4 × 4" },
    { value: "hard", label: "6 × 6" },
];

// Difficulty selector inline for MVP
export default function DifficultySelector({ difficulty, onChange }: DifficultySelectorProps) {
    return (
        <div className={styles.selector}>
            <span className={styles.label}>Difficulty:</span>
            <div className={styles.options}>
                {options.map((opt) => (
                    <label
                        key={opt.value}
                        className={`${styles.option} ${
                        difficulty === opt.value ? styles.active : ""
                        }`}
                    >
                        <input
                            type="radio"
                            name="difficulty"
                            value={opt.value}
                            checked={difficulty === opt.value}
                            onChange={() => onChange(opt.value)}
                        />
                        <span>{opt.label}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
  