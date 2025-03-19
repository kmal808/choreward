import { useState } from 'react'
import { UserProgress } from './components/UserProgress'
import { QuestCard } from './components/QuestCard'
import { RewardCard } from './components/RewardCard'
import { AdminPanel } from './components/AdminPanel'
import { mockQuests, mockRewards } from './data/mockData'
import { Quest, Reward, User } from './types'
import { Sword, Gift } from 'lucide-react'

const initialUser: User = {
  id: '1',
  name: 'Kruz',
  points: 275,
  level: 1,
  completedQuests: 5,
  redeemedRewards: [],
  isAdmin: true, // TODO: Replace with proper auth
}

function App() {
  const [user, setUser] = useState<User>(initialUser)
  const [quests, setQuests] = useState<Quest[]>(mockQuests)
  const [rewards, setRewards] = useState<Reward[]>(mockRewards)
  const [activeTab, setActiveTab] = useState<'quests' | 'rewards'>('quests')

  const handleCompleteQuest = (questId: string, stars?: number) => {
    setQuests((prevQuests) => {
      return prevQuests.map((quest) => {
        if (quest.id !== questId) return quest

        if (stars) {
          // Update stars
          const newStars = Math.min(stars, quest.totalStars)
          if (newStars <= quest.completedStars) return quest

          const completed = newStars === quest.totalStars
          return {
            ...quest,
            completedStars: newStars,
            completed,
            completedAt: completed ? new Date() : undefined,
          }
        } else if (quest.completedStars === quest.totalStars) {
          // Mark as complete
          return { ...quest, completed: true, completedAt: new Date() }
        }

        return quest
      })
    })

    const completedQuest = quests.find((q) => q.id === questId)
    if (completedQuest && stars && stars > completedQuest.completedStars) {
      const pointsPerStar = Math.floor(
        completedQuest.points / completedQuest.totalStars
      )
      const newPoints = (stars - completedQuest.completedStars) * pointsPerStar

      setUser((prevUser) => ({
        ...prevUser,
        points: prevUser.points + newPoints,
        completedQuests:
          stars === completedQuest.totalStars
            ? prevUser.completedQuests + 1
            : prevUser.completedQuests,
        level: Math.floor((prevUser.points + newPoints) / 1000),
      }))
    }
  }

  const handleRedeemReward = (rewardId: string) => {
    const reward = mockRewards.find((r) => r.id === rewardId)
    if (reward && reward.available && user.points >= reward.pointsCost) {
      setUser((prevUser) => ({
        ...prevUser,
        points: prevUser.points - reward.pointsCost,
        redeemedRewards: [...prevUser.redeemedRewards, rewardId],
      }))
    }
  }

  const handleUpdateQuest = (updatedQuest: Quest) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === updatedQuest.id ? updatedQuest : quest
      )
    )
  }

  const handleDeleteQuest = (questId: string) => {
    setQuests((prevQuests) =>
      prevQuests.filter((quest) => quest.id !== questId)
    )
  }

  const handleAddQuest = (newQuest: Quest) => {
    setQuests((prevQuests) => [...prevQuests, newQuest])
  }

  const handleUpdateReward = (updatedReward: Reward) => {
    setRewards((prevRewards) =>
      prevRewards.map((reward) =>
        reward.id === updatedReward.id ? updatedReward : reward
      )
    )
  }

  const handleDeleteReward = (rewardId: string) => {
    setRewards((prevRewards) =>
      prevRewards.filter((reward) => reward.id !== rewardId)
    )
  }

  const handleAddReward = (newReward: Reward) => {
    setRewards((prevRewards) => [...prevRewards, newReward])
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='max-w-4xl mx-auto p-6 space-y-6'>
        <UserProgress user={user} />

        {user.isAdmin && (
          <AdminPanel
            quests={quests}
            rewards={rewards}
            onUpdateQuest={handleUpdateQuest}
            onDeleteQuest={handleDeleteQuest}
            onAddQuest={handleAddQuest}
            onUpdateReward={handleUpdateReward}
            onDeleteReward={handleDeleteReward}
            onAddReward={handleAddReward}
          />
        )}

        <div className='bg-white rounded-lg p-4 shadow-md'>
          <div className='flex space-x-4 mb-6'>
            <button
              onClick={() => setActiveTab('quests')}
              className={`flex items-center px-4 py-2 rounded-full ${
                activeTab === 'quests'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              <Sword className='w-5 h-5 mr-2' />
              Quests
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`flex items-center px-4 py-2 rounded-full ${
                activeTab === 'rewards'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              <Gift className='w-5 h-5 mr-2' />
              Rewards
            </button>
          </div>

          <div className='space-y-4'>
            {activeTab === 'quests'
              ? quests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={handleCompleteQuest}
                  />
                ))
              : rewards.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    userPoints={user.points}
                    onRedeem={handleRedeemReward}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
