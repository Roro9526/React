import React from 'react';
import { TamagotchiProvider } from './context/TamagotchiContext';
import { useTamagotchi } from './context/TamagotchiContext';
import { Stats } from './components/Stats';
import { RockPaperScissors } from './components/RockPaperScissors';
import { Moon, Sun, Gamepad2, Apple } from 'lucide-react';

function TamagotchiGame() {
  const { state, dispatch } = useTamagotchi();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">My Tamagotchi</h1>
        
        <Stats />

        <div className="mt-8 relative">
          <div className="w-48 h-48 mx-auto relative">
            <img
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200"
              alt="Tamagotchi pet"
              className={`w-full h-full object-cover rounded-full ${
                state.isSleeping ? 'opacity-50' : 'opacity-100'
              }`}
            />
            {state.isSleeping && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">😴</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <button
            onClick={() => dispatch({ type: state.isSleeping ? 'WAKE' : 'SLEEP' })}
            className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
              state.isSleeping
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {state.isSleeping ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            {state.isSleeping ? 'Wake' : 'Sleep'}
          </button>

          <button
            onClick={() => dispatch({ type: 'FEED' })}
            disabled={state.isSleeping}
            className="p-4 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 flex flex-col items-center gap-2"
          >
            <Apple className="w-6 h-6" />
            Feed
          </button>

          <button
            onClick={() => dispatch({ type: 'START_GAME' })}
            disabled={state.isSleeping}
            className="p-4 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50 flex flex-col items-center gap-2"
          >
            <Gamepad2 className="w-6 h-6" />
            Play
          </button>
        </div>

        {state.isPlaying && <RockPaperScissors />}
      </div>
    </div>
  );
}

function App() {
  return (
    <TamagotchiProvider>
      <TamagotchiGame />
    </TamagotchiProvider>
  );
}

export default App;