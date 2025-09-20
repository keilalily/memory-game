# Memory Game

## Overview
This is a Memory/Concentration card-matching game built with React and TypeScript. The game challenges players to match pairs of cards by flipping them over, testing their memory and concentration skills.

## Live Demo
[Memory Game]()

## Features
- **Game Board**: A grid of cards that players can flip to find matching pairs.
- **Game Controls**: Displays the timer, move counter, and a restart button.
- **Difficulty Levels**: Players can select different difficulty levels that adjust the grid size.
- **Responsive UI**: The game is designed to be playable on various screen sizes.
- **SCSS Modules**: Each component has its own scoped styles for better maintainability.

## Project Structure
```
memory-game
├── src
│   ├── components
│   │   ├── Card
│   │   │   ├── Card.module.scss
│   │   │   └── Card.tsx
│   │   ├── Controls
│   │   │   ├── Controls.module.scss
│   │   │   └── Controls.tsx
│   │   ├── DifficultySelector
│   │   │   ├── DifficultySelector.module.scss
│   │   │   └── DifficultySelector.tsx
│   │   ├── GameBoard
│   │   │   ├── GameBoard.module.scss
│   │   │   └── GameBoard.tsx
│   │   ├── Modal
│   │   │   ├── Modal.module.scss
│   │   │   └── Modal.tsx
│   ├── constants
│   │   └── data.ts
│   ├── hooks
│   │   └── useTimer.ts
│   ├── styles
│   │   ├── _mixins.scss
│   │   ├── _variables.scss
│   │   └── globals.scss
│   ├── types
│   │   └── types.ts
│   ├── utils
│   │   └── shuffle.ts
│   ├── App.tsx
│   ├── App.module.scss
│   ├── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/keilalily/memory-game.git
   ```
2. Navigate to the project directory:
   ```
   cd memory-game
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Game
To start the development server, run:
```
npm run dev
```
Open your browser and go to `http://localhost:5173` to play the game.

## Game Rules
- Flip two cards at a time to find matching pairs.
- If the cards match, they remain face-up; if not, they flip back over.
- Keep track of the number of moves and the time taken to complete the game.
- Use the difficulty selector to change the grid size for a more challenging experience.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.