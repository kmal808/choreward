import React from 'react';
import { Quest } from '../types';
import { CheckCircle2, Clock, Star, StarOff } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string, stars?: number) => void;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-orange-100 text-orange-800',
  epic: 'bg-purple-100 text-purple-800'
};

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${quest.completed ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{quest.title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${difficultyColors[quest.difficulty]}`}>
          {quest.difficulty}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{quest.description}</p>
      
      <div className="flex items-center space-x-2 mb-4">
        {[...Array(quest.totalStars)].map((_, index) => (
          <button
            key={index}
            onClick={() => onComplete(quest.id, index + 1)}
            disabled={quest.completed || index > quest.completedStars}
            className="transition-colors focus:outline-none"
          >
            {index < quest.completedStars ? (
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ) : (
              <StarOff className="w-5 h-5 text-gray-300" />
            )}
          </button>
        ))}
        <span className="text-sm text-gray-500 ml-2">
          {quest.completedStars}/{quest.totalStars} completed
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-yellow-600">{quest.points} points</span>
        </div>
        
        {quest.dueDate && (
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {new Date(quest.dueDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        <button
          onClick={() => onComplete(quest.id)}
          disabled={quest.completed}
          className={`flex items-center px-3 py-1 rounded-full transition-colors ${
            quest.completed
              ? 'bg-green-100 text-green-800'
              : quest.completedStars === quest.totalStars
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 mr-1" />
          {quest.completed 
            ? 'Completed!' 
            : quest.completedStars === quest.totalStars
              ? 'Mark Complete'
              : `${quest.totalStars - quest.completedStars} stars remaining`}
        </button>
      </div>
    </div>
  );
};