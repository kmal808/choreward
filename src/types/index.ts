export type Difficulty = 'easy' | 'medium' | 'hard' | 'epic';

export interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: Difficulty;
  category: 'chores' | 'homework' | 'sports' | 'other';
  completed: boolean;
  totalStars: number;
  completedStars: number;
  dueDate?: Date;
  completedAt?: Date;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  icon: string;
  available: boolean;
}

export interface User {
  id: string;
  name: string;
  points: number;
  level: number;
  completedQuests: number;
  redeemedRewards: string[];
  isAdmin?: boolean;
}