import styles from './Card.module.scss';
import type { CardType } from '../../types/types';

interface CardProps extends CardType {
  onClick: (card: CardType) => void;
}

export default function Card({ id, value, isFlipped, isMatched, onClick }: CardProps) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick({ id, value, isFlipped, isMatched });
    }
  };

  return (
    <div
      className={`${styles.card} ${isFlipped || isMatched ? styles.flipped : ''}`}
      onClick={handleClick}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardBack}>?</div>
        <div className={styles.cardFront}>{value}</div>
      </div>
    </div>
  );
};