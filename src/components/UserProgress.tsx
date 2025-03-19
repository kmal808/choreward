import React from 'react';
import { User } from '../types';
import { Trophy, Star, Award } from 'lucide-react';

interface UserProgressProps {
  user: User;
}

export const UserProgress: React.FC<UserProgressProps> = ({ user }) => {
  const nextLevel = (user.level + 1) * 1000;
  const progress = (user.points % 1000) / 10;

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-full">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-indigo-100">Level {user.level}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="text-xl font-bold">{user.points}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress to Level {user.level + 1}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-yellow-300 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-yellow-300" />
          <span>{user.completedQuests} quests completed</span>
        </div>
      </div>
    </div>
  );
};