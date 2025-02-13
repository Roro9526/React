import React, { useState } from 'react';
import { useTamagotchi } from '../context/TamagotchiContext';
import type { GameChoice } from '../types/tamagotchi';

export function RockPaperScissors() {
  const { dispatch } = useTamagotchi();
  const [playerChoice, setPlayerChoice] = useState<GameChoice>(null);
  const [computerChoice, setComputerChoice] = useState<GameChoice>(null);
  const [result, setResult] = useState<string>('');

  const choices: GameChoice[] = ['rock', 'paper', 'scissors'];

  const play = (choice: GameChoice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    let gameResult: 'WIN' | 'DRAW' | 'LOSE';
    if (choice === computerChoice) {
      gameResult = 'DRAW';
      setResult('Draw!');
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      gameResult = 'WIN';
      setResult('You win!');
    } else {
      gameResult = 'LOSE';
      setResult('You lose!');
    }

    dispatch({ type: 'GAME_RESULT', result: gameResult });
    setTimeout(() => {
      dispatch({ type: 'END_GAME' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Rock Paper Scissors</h2>
        {!result ? (
          <div className="flex gap-4">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => play(choice)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">
              You chose {playerChoice} - Computer chose {computerChoice}
            </p>
            <p className="text-xl font-bold">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}