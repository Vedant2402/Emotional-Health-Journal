import React from 'react';
import { TrendingUp, Calendar, Flower2, Star, BarChart3, PenTool } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';

export default function Analytics() {
  const { user } = useAuth();
  const { moodEntries, journalEntries, loading } = useFirestore(user?.id || null);

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600">Loading your insights...</p>
        </div>
      </div>
    );
  }

  const getWeeklyMoodData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    }).reverse();

    return last7Days.map(dateStr => {
      const entry = moodEntries.find(entry => 
        new Date(entry.date).toDateString() === dateStr
      );
      return {
        date: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
        mood: entry?.mood || null,
      };
    });
  };

  const getMoodStats = () => {
    if (moodEntries.length === 0) return null;

    const moodCounts = moodEntries.reduce((acc, entry) => {
      acc[entry.mood.label] = (acc[entry.mood.label] || 0) + 1;
      return acc;
    }, {});

    const mostCommon = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    const recentMood = moodEntries[0]?.mood; // First entry since they're ordered by createdAt desc

    return {
      totalEntries: moodEntries.length,
      mostCommonMood: mostCommon ? { label: mostCommon[0], count: mostCommon[1] } : null,
      recentMood,
      moodCounts,
    };
  };

  const getStreakData = () => {
    if (moodEntries.length === 0) return { currentStreak: 0, longestStreak: 0 };

    // Sort entries by date
    const sortedEntries = [...moodEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    // Check if today has an entry
    const today = new Date().toDateString();
    const hasToday = sortedEntries.some(entry => 
      new Date(entry.date).toDateString() === today
    );

    if (hasToday) {
      currentStreak = 1;
      
      // Count consecutive days
      for (let i = 1; i < sortedEntries.length; i++) {
        const currentDate = new Date(sortedEntries[i-1].date);
        const nextDate = new Date(sortedEntries[i].date);
        const diffTime = currentDate.getTime() - nextDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          currentStreak++;
          tempStreak++;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    tempStreak = 1;
    for (let i = 1; i < sortedEntries.length; i++) {
      const currentDate = new Date(sortedEntries[i-1].date);
      const nextDate = new Date(sortedEntries[i].date);
      const diffTime = currentDate.getTime() - nextDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak };
  };

  const weeklyData = getWeeklyMoodData();
  const moodStats = getMoodStats();
  const streakData = getStreakData();

  const affirmations = [
    "You're doing great by taking care of your mental health! 💖",
    "Every day you track your mood is a step toward self-awareness ✨",
    "Your feelings are valid and worthy of attention 🌸",
    "You're building healthy habits that will last a lifetime 🌟",
    "Your mind is blooming with each moment of mindfulness 🌺",
  ];

  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Your Insights
        </h2>
        <p className="text-gray-600 text-sm sm:text-base px-4">Understanding your emotional patterns</p>
        
        {/* Debug info - remove this in production */}
        <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
          Debug: {moodEntries.length} mood entries, {journalEntries.length} journal entries loaded
        </div>
      </div>

      {/* Affirmation Card */}
      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white text-center">
        <Star className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 opacity-80" />
        <p className="text-base sm:text-lg font-medium">{randomAffirmation}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
              <Flower2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{moodEntries.length}</p>
              <p className="text-xs sm:text-sm text-gray-600">Mood check-ins</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{journalEntries.length}</p>
              <p className="text-xs sm:text-sm text-gray-600">Journal entries</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{streakData.currentStreak}</p>
              <p className="text-xs sm:text-sm text-gray-600">Current streak</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{streakData.longestStreak}</p>
              <p className="text-xs sm:text-sm text-gray-600">Longest streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Mood Tracker */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">This Week's Mood Journey</h3>
        <div className="flex justify-between items-end space-x-1 sm:space-x-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex-1 text-center">
              <div className="mb-2 sm:mb-3">
                {day.mood ? (
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto rounded-full bg-gradient-to-br ${day.mood.gradient} flex items-center justify-center text-base sm:text-xl border-2 border-white shadow-lg`}>
                    {day.mood.emoji}
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-12 sm:h-12 mx-auto rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full"></div>
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-gray-600">{day.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Breakdown */}
      {moodStats && moodStats.moodCounts && Object.keys(moodStats.moodCounts).length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Mood Breakdown</h3>
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(moodStats.moodCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([mood, count]) => (
                <div key={mood} className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 text-sm sm:text-base">{mood}</span>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                        style={{ width: `${(count / moodStats.totalEntries) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Most Common Mood */}
      {moodStats && moodStats.mostCommonMood && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl border border-emerald-100 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Your Most Common Mood</h3>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-xl sm:text-2xl">
              {moodStats.recentMood?.emoji || '😊'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{moodStats.mostCommonMood.label}</p>
              <p className="text-gray-600 text-sm sm:text-base">
                Recorded {moodStats.mostCommonMood.count} times 
                ({Math.round((moodStats.mostCommonMood.count / moodStats.totalEntries) * 100)}% of entries)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {moodEntries.length === 0 && journalEntries.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Start Building Insights</h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-4">
            Track your moods and write journal entries to see your emotional patterns bloom
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 text-sm sm:text-base">
              Track Your First Mood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}