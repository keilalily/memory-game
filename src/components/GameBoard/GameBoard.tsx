import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import type { CardType, Difficulty } from '../../types/types';
import { shuffleArray } from '../../utils/shuffle';
import styles from './GameBoard.module.scss';
import { EMOJIS } from '../../constants/data';

interface GameBoardProps {
    difficulty: Difficulty;
    onMove: () => void;
    onGameStart: () => void;
    onGameEnd: () => void;
}

const difficultySizes: Record<Difficulty, number> = {
    easy: 2,
    medium: 4,
    hard: 6,
};

export default function GameBoard({ difficulty, onMove, onGameStart, onGameEnd }: GameBoardProps) {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const hasStarted = React.useRef(false);
    const [isLocked, setIsLocked] = useState(false);

    // Initialize deck
    useEffect(() => {
        const size = difficultySizes[difficulty];
        const totalCards = size * size;
        const selected = EMOJIS.slice(0, totalCards / 2);
        const deck: CardType[] = shuffleArray([...selected, ...selected]).map((emoji, index) => ({
            id: index,
            value: emoji,
            isFlipped: false,
            isMatched: false,
        }));
        setCards(deck);
        setFlippedCards([]);
        setIsGameOver(false);
        
        hasStarted.current = false;
    }, [difficulty]);

    const handleCardClick = (card: CardType) => {
        if (isLocked) return; // block clicks while waiting to flip back

        setFlippedCards((prev) => {
            // Prevent clicking the same card again
            if (prev.some((c) => c.id === card.id)) return prev;

            // Case 1: first card flipped
            if (prev.length === 0) {
                flipCard(card.id);

                if (!hasStarted.current) {
                    onGameStart();
                    hasStarted.current = true;
                }

                return [card];
            }

            // Case 2: second card flipped
            if (prev.length === 1) {
                flipCard(card.id);
                onMove();

                const firstCard = prev[0];

                if (firstCard.value === card.value) {
                    // ✅ Match
                    setTimeout(() => {
                        setCards((cards) =>
                            cards.map((c) =>
                                c.value === card.value ? { ...c, isMatched: true } : c
                            )
                        );
                    }, 200);
                    return [];
                } else {
                    // ❌ No match → lock and flip back later
                    setIsLocked(true);
                    setTimeout(() => {
                        flipCard(firstCard.id, false);
                        flipCard(card.id, false);
                        setFlippedCards([]);
                        setIsLocked(false);
                    }, 1000);
                    return [...prev, card]; // temporarily store for feedback
                }
            }

            return prev;
        });
    };

    const flipCard = (id: number, flip = true) => {
        setCards((prev) =>
            prev.map((c) => (c.id === id ? { ...c, isFlipped: flip } : c))
        );
    };

    // Check for game end
    useEffect(() => {
        const totalCards = cards.length;
        const matchedCards = cards.filter((c) => c.isMatched).length;

        if (!isGameOver && matchedCards === totalCards && totalCards > 0) {
            setIsGameOver(true);
            onGameEnd();
        }
    }, [cards, isGameOver, onGameEnd]);

    const gridSize = difficultySizes[difficulty];

    return (
        <div
            className={styles.gameBoard}
            style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
        >
            {cards.map((card) => (
                <Card key={card.id} {...card} onClick={handleCardClick} />
            ))}
        </div>
    );
};