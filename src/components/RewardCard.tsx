import React from 'react';
import { Reward } from '../types';
import * as Icons from 'lucide-react';

type IconName = keyof typeof Icons;

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (id: string) => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onRedeem }) => {
  const Icon = Icons[reward.icon as IconName];
  const canAfford = userPoints >= reward.pointsCost;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${!reward.available && 'opacity-60'}`}>
      <div className="flex items-center mb-3">
        <div className="p-2 rounded-full bg-indigo-100 mr-3">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{reward.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{reward.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="font-medium text-indigo-600">
          {reward.pointsCost} points
        </span>
        
        <button
          onClick={() => onRedeem(reward.id)}
          disabled={!canAfford || !reward.available}
          className={`px-4 py-2 rounded-full transition-colors ${
            !canAfford || !reward.available
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }`}
        >
          {!reward.available 
            ? 'Locked' 
            : canAfford 
              ? 'Redeem' 
              : `Need ${reward.pointsCost - userPoints} more points`}
        </button>
      </div>
    </div>
  );
};