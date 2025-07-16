import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Lock, 
  CheckCircle,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { curriculum, getCurriculumByLevel } from '../data/curriculum';

const LearnPage: React.FC = () => {
  const [expandedLevel, setExpandedLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>('beginner');
  const [completedLessons] = useState<number[]>([1, 2]); // Mock completed lessons
  
  const beginnerLessons = getCurriculumByLevel('beginner');
  const intermediateLessons = getCurriculumByLevel('intermediate');
  const advancedLessons = getCurriculumByLevel('advanced');
  
  const totalLessons = curriculum.length;
  const completedCount = completedLessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  const levelInfo = {
    beginner: {
      title: 'Beginner - Hoʻomaka',
      description: 'Master the basics of Hawaiian language',
      color: 'ocean',
      icon: BookOpen,
      lessons: beginnerLessons
    },
    intermediate: {
      title: 'Intermediate - Waena',
      description: 'Build conversational skills and cultural knowledge',
      color: 'tropical',
      icon: Star,
      lessons: intermediateLessons
    },
    advanced: {
      title: 'Advanced - Kiʻekiʻe',
      description: 'Achieve fluency and deep cultural understanding',
      color: 'sunset',
      icon: Sparkles,
      lessons: advancedLessons
    }
  };

  const isLessonUnlocked = (lesson: any) => {
    if (!lesson.prerequisites) return true;
    return lesson.prerequisites.every((prereq: number) => completedLessons.includes(prereq));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-display font-bold mb-2">
            E Aʻo i ka ʻŌlelo Hawaiʻi
          </h1>
          <p className="text-gray-600">
            Learn Hawaiian - 30 comprehensive lessons from beginner to fluent speaker
          </p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-bold mb-4">Your Learning Journey</h2>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-ocean via-tropical to-sunset h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm font-semibold">{completedCount}/{totalLessons} Lessons</span>
          </div>
          <p className="text-sm text-gray-600">Keep going! You're making great progress.</p>
        </motion.div>

        {/* Level Sections */}
        <div className="space-y-6">
          {(['beginner', 'intermediate', 'advanced'] as const).map((level, levelIndex) => {
            const info = levelInfo[level];
            const isExpanded = expandedLevel === level;
            const levelProgress = info.lessons.filter(lesson => 
              completedLessons.includes(lesson.id)
            ).length;

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: levelIndex * 0.1 }}
                className="card"
              >
                {/* Level Header */}
                <button
                  onClick={() => setExpandedLevel(isExpanded ? null : level)}
                  className="w-full flex items-center justify-between mb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-${info.color}-light flex items-center justify-center`}>
                      <info.icon className={`w-6 h-6 text-${info.color}`} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{info.title}</h3>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">
                      {levelProgress}/{info.lessons.length} completed
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Level Lessons */}
                {isExpanded && (
                  <div className="space-y-3 pt-4 border-t">
                    {info.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isUnlocked = isLessonUnlocked(lesson);

                      return (
                        <motion.div
                          key={lesson.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: lessonIndex * 0.05 }}
                        >
                          <Link
                            to={isUnlocked ? `/lesson/${lesson.id}` : '#'}
                            className={`block p-4 rounded-lg border transition-all ${
                              isUnlocked 
                                ? 'hover:shadow-md hover:border-ocean/30 cursor-pointer' 
                                : 'opacity-60 cursor-not-allowed'
                            } ${
                              isCompleted 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isCompleted 
                                  ? 'bg-green-100' 
                                  : isUnlocked 
                                  ? `bg-${info.color}-light` 
                                  : 'bg-gray-100'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : !isUnlocked ? (
                                  <Lock className="w-5 h-5 text-gray-400" />
                                ) : (
                                  <span className={`text-sm font-bold text-${info.color}`}>
                                    {lesson.id}
                                  </span>
                                )}
                              </div>

                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-semibold mb-1">
                                      {lesson.title}
                                      {lesson.titleHawaiian && (
                                        <span className="text-sm text-gray-500 ml-2">
                                          ({lesson.titleHawaiian})
                                        </span>
                                      )}
                                    </h4>
                                    <p className="text-sm text-gray-600">{lesson.description}</p>
                                    {lesson.culturalNote && (
                                      <p className="text-xs text-ocean mt-2 italic">
                                        💡 {lesson.culturalNote}
                                      </p>
                                    )}
                                  </div>
                                  <div className="text-right ml-4">
                                    <div className="text-sm font-semibold text-gray-900">
                                      {lesson.points} pts
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {lesson.duration} min
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 mt-2">
                                  <span className={`text-xs px-2 py-1 rounded-full bg-${info.color}-light text-${info.color}-dark`}>
                                    {lesson.category}
                                  </span>
                                  {!isUnlocked && lesson.prerequisites && (
                                    <span className="text-xs text-gray-500">
                                      Requires: Lessons {lesson.prerequisites.join(', ')}
                                    </span>
                                  )}
                                  {isUnlocked && !isCompleted && (
                                    <span className="text-xs text-ocean font-semibold">
                                      Ready to start →
                                    </span>
                                  )}
                                  {isCompleted && (
                                    <span className="text-xs text-green-600 font-semibold">
                                      ✓ Completed
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Motivational Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center card bg-gradient-to-r from-ocean-light to-tropical-light"
        >
          <h3 className="text-lg font-bold mb-2">E hoʻomau! Keep going!</h3>
          <p className="text-gray-700">
            Every lesson brings you closer to fluency in ʻŌlelo Hawaiʻi
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnPage;