export interface CardType {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';