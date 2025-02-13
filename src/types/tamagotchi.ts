export type TamagotchiState = {
  energy: number;
  hunger: number;
  mood: number;
  isSleeping: boolean;
  isPlaying: boolean;
};

export type TamagotchiAction =
  | { type: 'TICK' }
  | { type: 'FEED' }
  | { type: 'SLEEP' }
  | { type: 'WAKE' }
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'GAME_RESULT'; result: 'WIN' | 'DRAW' | 'LOSE' };

export type GameChoice = 'rock' | 'paper' | 'scissors' | null;