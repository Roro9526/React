import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TamagotchiState, TamagotchiAction } from '../types/tamagotchi';

const initialState: TamagotchiState = {
  energy: 100,
  hunger: 0,
  mood: 100,
  isSleeping: false,
  isPlaying: false,
};

function tamagotchiReducer(state: TamagotchiState, action: TamagotchiAction): TamagotchiState {
  switch (action.type) {
    case 'TICK':
      if (state.isSleeping) {
        return {
          ...state,
          energy: Math.min(100, state.energy + 1),
          hunger: Math.min(100, state.hunger + 0.5),
        };
      }
      return {
        ...state,
        energy: Math.max(0, state.energy - 0.5),
        hunger: Math.min(100, state.hunger + 0.5),
        mood: Math.max(0, state.mood - (state.hunger > 70 || state.energy < 30 ? 1 : 0.2)),
      };
    case 'FEED':
      return {
        ...state,
        hunger: Math.max(0, state.hunger - 30),
        mood: Math.min(100, state.mood + 5),
      };
    case 'SLEEP':
      return {
        ...state,
        isSleeping: true,
      };
    case 'WAKE':
      return {
        ...state,
        isSleeping: false,
      };
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
      };
    case 'END_GAME':
      return {
        ...state,
        isPlaying: false,
        energy: Math.max(0, state.energy - 10),
      };
    case 'GAME_RESULT':
      const moodChange = action.result === 'WIN' ? 20 : action.result === 'DRAW' ? 10 : 0;
      return {
        ...state,
        mood: Math.min(100, state.mood + moodChange),
      };
    default:
      return state;
  }
}

const TamagotchiContext = createContext<{
  state: TamagotchiState;
  dispatch: React.Dispatch<TamagotchiAction>;
} | null>(null);

export function TamagotchiProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(tamagotchiReducer, initialState);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <TamagotchiContext.Provider value={{ state, dispatch }}>
      {children}
    </TamagotchiContext.Provider>
  );
}

export function useTamagotchi() {
  const context = useContext(TamagotchiContext);
  if (!context) {
    throw new Error('useTamagotchi must be used within a TamagotchiProvider');
  }
  return context;
}