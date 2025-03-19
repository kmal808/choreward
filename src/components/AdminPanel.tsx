import React, { useState } from 'react';
import { Quest, Reward, Difficulty } from '../types';
import { PlusCircle, Pencil, Trash2, Save } from 'lucide-react';
import * as Icons from 'lucide-react';

interface AdminPanelProps {
  quests: Quest[];
  rewards: Reward[];
  onUpdateQuest: (quest: Quest) => void;
  onDeleteQuest: (id: string) => void;
  onAddQuest: (quest: Quest) => void;
  onUpdateReward: (reward: Reward) => void;
  onDeleteReward: (id: string) => void;
  onAddReward: (reward: Reward) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  quests,
  rewards,
  onUpdateQuest,
  onDeleteQuest,
  onAddQuest,
  onUpdateReward,
  onDeleteReward,
  onAddReward,
}) => {
  const [activeTab, setActiveTab] = useState<'quests' | 'rewards'>('quests');
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'epic'];
  const categories = ['chores', 'homework', 'sports', 'other'];
  const iconNames = Object.keys(Icons).filter(key => typeof Icons[key as keyof typeof Icons] === 'function');

  const handleAddQuest = () => {
    const newQuest: Quest = {
      id: Date.now().toString(),
      title: '',
      description: '',
      points: 0,
      difficulty: 'medium',
      category: 'chores',
      completed: false,
    };
    setEditingQuest(newQuest);
  };

  const handleAddReward = () => {
    const newReward: Reward = {
      id: Date.now().toString(),
      title: '',
      description: '',
      pointsCost: 0,
      icon: 'Gift',
      available: true,
    };
    setEditingReward(newReward);
  };

  const handleSaveQuest = (quest: Quest) => {
    if (quests.find(q => q.id === quest.id)) {
      onUpdateQuest(quest);
    } else {
      onAddQuest(quest);
    }
    setEditingQuest(null);
  };

  const handleSaveReward = (reward: Reward) => {
    if (rewards.find(r => r.id === reward.id)) {
      onUpdateReward(reward);
    } else {
      onAddReward(reward);
    }
    setEditingReward(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('quests')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'quests'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Manage Quests
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'rewards'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Manage Rewards
        </button>
      </div>

      {activeTab === 'quests' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Quests</h2>
            <button
              onClick={handleAddQuest}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Quest
            </button>
          </div>

          <div className="space-y-4">
            {quests.map(quest => (
              <div
                key={quest.id}
                className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
              >
                {editingQuest?.id === quest.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingQuest.title}
                      onChange={e =>
                        setEditingQuest({ ...editingQuest, title: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Quest title"
                    />
                    <textarea
                      value={editingQuest.description}
                      onChange={e =>
                        setEditingQuest({
                          ...editingQuest,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Quest description"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Points
                        </label>
                        <input
                          type="number"
                          value={editingQuest.points}
                          onChange={e =>
                            setEditingQuest({
                              ...editingQuest,
                              points: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Difficulty
                        </label>
                        <select
                          value={editingQuest.difficulty}
                          onChange={e =>
                            setEditingQuest({
                              ...editingQuest,
                              difficulty: e.target.value as Difficulty,
                            })
                          }
                          className="w-full p-2 border rounded"
                        >
                          {difficulties.map(diff => (
                            <option key={diff} value={diff}>
                              {diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Total Stars
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={editingQuest.totalStars || 1}
                          onChange={e =>
                            setEditingQuest({
                              ...editingQuest,
                              totalStars: parseInt(e.target.value) || 1,
                              completedStars: 0
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingQuest(null)}
                        className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveQuest(editingQuest)}
                        className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{quest.title}</h3>
                        <p className="text-gray-600">{quest.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingQuest(quest)}
                          className="p-1 text-gray-500 hover:text-indigo-500"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteQuest(quest.id)}
                          className="p-1 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-indigo-600 font-medium">
                        {quest.points} points
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          {
                            easy: 'bg-green-100 text-green-800',
                            medium: 'bg-yellow-100 text-yellow-800',
                            hard: 'bg-orange-100 text-orange-800',
                            epic: 'bg-purple-100 text-purple-800',
                          }[quest.difficulty]
                        }`}
                      >
                        {quest.difficulty}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Rewards</h2>
            <button
              onClick={handleAddReward}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Reward
            </button>
          </div>

          <div className="space-y-4">
            {rewards.map(reward => (
              <div
                key={reward.id}
                className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
              >
                {editingReward?.id === reward.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingReward.title}
                      onChange={e =>
                        setEditingReward({
                          ...editingReward,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Reward title"
                    />
                    <textarea
                      value={editingReward.description}
                      onChange={e =>
                        setEditingReward({
                          ...editingReward,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Reward description"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Points Cost
                        </label>
                        <input
                          type="number"
                          value={editingReward.pointsCost}
                          onChange={e =>
                            setEditingReward({
                              ...editingReward,
                              pointsCost: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Icon
                        </label>
                        <select
                          value={editingReward.icon}
                          onChange={e =>
                            setEditingReward({
                              ...editingReward,
                              icon: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded"
                        >
                          {iconNames.map(icon => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editingReward.available}
                          onChange={e =>
                            setEditingReward({
                              ...editingReward,
                              available: e.target.checked,
                            })
                          }
                          className="rounded border-gray-300"
                        />
                        <span>Available</span>
                      </label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingReward(null)}
                        className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveReward(editingReward)}
                        className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{reward.title}</h3>
                        <p className="text-gray-600">{reward.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingReward(reward)}
                          className="p-1 text-gray-500 hover:text-indigo-500"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteReward(reward.id)}
                          className="p-1 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-indigo-600 font-medium">
                        {reward.pointsCost} points
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          reward.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {reward.available ? 'Available' : 'Locked'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};