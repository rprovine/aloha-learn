import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Trophy, 
  Target, 
  Clock, 
  BookOpen,
  TrendingUp,
  Calendar,
  Star,
  Award
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    { icon: BookOpen, label: 'Lessons Completed', value: user.lessons_completed },
    { icon: Trophy, label: 'Total Points', value: user.total_points },
    { icon: Target, label: 'Current Streak', value: `${user.current_streak} days` },
    { icon: Clock, label: 'Daily Goal', value: `${user.daily_goal_minutes} min` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-2">
            Aloha, {user.full_name || user.username}!
          </h1>
          <p className="text-gray-600">Track your Hawaiian language learning journey</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-8 h-8 text-ocean" />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Recent Activity */}
          <div className="lg:col-span-2 card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ocean" />
              Recent Progress
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Basic Greetings</p>
                  <p className="text-sm text-gray-600">Completed 2 days ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">100 pts</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Numbers 1-10</p>
                  <p className="text-sm text-gray-600">In progress</p>
                </div>
                <div className="text-ocean font-semibold">75%</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-sunset" />
              Recent Achievements
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sunset-light rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-sunset" />
                </div>
                <div>
                  <p className="font-semibold">First Steps</p>
                  <p className="text-sm text-gray-600">Complete your first lesson</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-ocean-light rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-ocean" />
                </div>
                <div>
                  <p className="font-semibold">7 Day Streak</p>
                  <p className="text-sm text-gray-600">Practice 7 days in a row</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Continue Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-hawaiian-gradient rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to continue learning?
          </h2>
          <p className="mb-6">Pick up where you left off or start a new lesson</p>
          <a href="/learn" className="bg-white text-ocean px-8 py-3 rounded-lg font-semibold inline-block hover:scale-105 transition-transform">
            Continue Learning
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;