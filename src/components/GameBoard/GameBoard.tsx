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
    const [, setFlippedCards] = useState<CardType[]>([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const hasStarted = React.useRef(false);
    const pendingPair = React.useRef<CardType[]>([]);
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

        if (card.isFlipped || card.isMatched) return;

        if (!hasStarted.current) {
            onGameStart();
            hasStarted.current = true;
        }

        setCards((prev) => {
            const updated = prev.map((c) =>
                c.id === card.id ? { ...c, isFlipped: true } : c
            );

            const flippedUnmatched = updated.filter(
                (c) => c.isFlipped && !c.isMatched
            );

            if (flippedUnmatched.length === 2 && pendingPair.current.length === 0) {
                // store the pair so we don't double-count
                pendingPair.current = flippedUnmatched;
                onMove();

                const [firstCard, secondCard] = flippedUnmatched;

                if (firstCard.value === secondCard.value) {
                    setTimeout(() => {
                    setCards((cards) =>
                        cards.map((c) =>
                        c.value === firstCard.value
                            ? { ...c, isMatched: true }
                            : c
                        )
                    );
                    pendingPair.current = []; // reset
                    }, 200);
                } else {
                    setIsLocked(true);
                    setTimeout(() => {
                    setCards((cards) =>
                        cards.map((c) =>
                        c.id === firstCard.id || c.id === secondCard.id
                            ? { ...c, isFlipped: false }
                            : c
                        )
                    );
                    setIsLocked(false);
                    pendingPair.current = []; // reset
                    }, 1000);
                }
            }

            return updated;
        });
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