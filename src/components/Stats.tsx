import React from 'react';
import { Battery, Pizza, Heart } from 'lucide-react';
import { useTamagotchi } from '../context/TamagotchiContext';

export function Stats() {
  const { state } = useTamagotchi();

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <Battery className={`w-6 h-6 ${state.energy > 50 ? 'text-green-500' : 'text-red-500'}`} />
        <span className="font-medium">{Math.round(state.energy)}%</span>
      </div>
      <div className="flex items-center gap-2">
        <Pizza className={`w-6 h-6 ${state.hunger < 50 ? 'text-green-500' : 'text-red-500'}`} />
        <span className="font-medium">{Math.round(state.hunger)}%</span>
      </div>
      <div className="flex items-center gap-2">
        <Heart className={`w-6 h-6 ${state.mood > 50 ? 'text-green-500' : 'text-red-500'}`} />
        <span className="font-medium">{Math.round(state.mood)}%</span>
      </div>
    </div>
  );
}