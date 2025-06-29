import React, { useState } from 'react';
import { Calendar, Sparkles, CheckCircle, Flower2, ChevronRight, Clock, MessageCircle, TrendingUp, BarChart3, History, Eye } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';

const moods = [
  { id: 'blooming', emoji: '🌸', label: 'Blooming', color: 'text-pink-500', gradient: 'from-pink-400 to-rose-400' },
  { id: 'amazing', emoji: '🤩', label: 'Amazing', color: 'text-yellow-500', gradient: 'from-yellow-400 to-orange-400' },
  { id: 'happy', emoji: '😊', label: 'Happy', color: 'text-green-500', gradient: 'from-green-400 to-emerald-400' },
  { id: 'good', emoji: '😌', label: 'Good', color: 'text-blue-500', gradient: 'from-blue-400 to-cyan-400' },
  { id: 'okay', emoji: '😐', label: 'Okay', color: 'text-gray-500', gradient: 'from-gray-400 to-slate-400' },
  { id: 'meh', emoji: '😕', label: 'Meh', color: 'text-orange-500', gradient: 'from-orange-400 to-red-400' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: 'text-blue-600', gradient: 'from-blue-500 to-indigo-500' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: 'text-purple-600', gradient: 'from-purple-500 to-pink-500' },
];

export default function MoodTracker() {
  const { user } = useAuth();
  const { moodEntries, addMoodEntry, loading } = useFirestore(user?.id || null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllEntries, setShowAllEntries] = useState(false);
  const [viewMode, setViewMode] = useState('recent'); // 'recent' or 'history'

  const handleSave = async () => {
    if (!selectedMood || !user) return;

    setIsLoading(true);

    const result = await addMoodEntry({
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note.trim(),
    });

    if (result.success) {
      setShowSuccess(true);
      setSelectedMood(null);
      setNote('');
      setTimeout(() => setShowSuccess(false), 3000);
    }

    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatFullDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
        fullDate: dateStr,
        mood: entry?.mood || null,
        entry: entry || null,
      };
    });
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const recentEntries = showAllEntries ? moodEntries.slice(0, 10) : moodEntries.slice(0, 5);
  const weeklyData = getWeeklyMoodData();

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600">Loading your mood history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
          <CheckCircle className="w-4 h-4 inline mr-2" />
          Mood saved! Your wellness journey is blooming ✨
        </div>
      )}

      {/* Debug Info - Shows current data state */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
        <strong>Debug Info:</strong> {moodEntries.length} mood entries loaded
        {moodEntries.length > 0 && (
          <span> | Latest: {moodEntries[0]?.mood?.label} on {formatDate(moodEntries[0]?.date)}</span>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Mood Tracker */}
        <div className="lg:col-span-2 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">{today}</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              How are you feeling today?
            </h2>
            <p className="text-gray-600">Take a moment to check in with yourself and let your mind bloom</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 relative overflow-hidden ${
                  selectedMood?.id === mood.id
                    ? `border-transparent bg-gradient-to-br ${mood.gradient} shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Special Effects for Blooming */}
                {mood.id === 'blooming' && selectedMood?.id === mood.id && (
                  <>
                    {/* Floating Flowers */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 left-2 text-pink-300 animate-bounce delay-100">🌸</div>
                      <div className="absolute top-3 right-3 text-pink-200 animate-bounce delay-300">🌺</div>
                      <div className="absolute bottom-2 left-3 text-rose-300 animate-bounce delay-500">🌷</div>
                      <div className="absolute bottom-3 right-2 text-pink-400 animate-bounce delay-700">🌻</div>
                    </div>
                    {/* Petal Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-2xl animate-pulse"></div>
                  </>
                )}

                {/* Special Effects for Amazing */}
                {mood.id === 'amazing' && selectedMood?.id === mood.id && (
                  <>
                    {/* Sparkle Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1 left-2 text-yellow-300 animate-ping">✨</div>
                      <div className="absolute top-2 right-1 text-orange-300 animate-ping delay-200">⭐</div>
                      <div className="absolute bottom-1 left-1 text-yellow-400 animate-ping delay-400">💫</div>
                      <div className="absolute bottom-2 right-3 text-orange-400 animate-ping delay-600">🌟</div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-200 animate-ping delay-800">✨</div>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-2xl animate-pulse"></div>
                  </>
                )}

                <div className="text-center space-y-2 relative z-10">
                  <div className={`transition-all duration-300 ${
                    mood.id === 'blooming' && selectedMood?.id === mood.id 
                      ? 'text-6xl animate-pulse' 
                      : mood.id === 'amazing' && selectedMood?.id === mood.id
                      ? 'text-6xl animate-bounce'
                      : 'text-4xl'
                  }`}>
                    {mood.emoji}
                  </div>
                  <div className={`font-medium transition-all duration-200 ${
                    selectedMood?.id === mood.id ? 'text-white' : mood.color
                  }`}>
                    {mood.label}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedMood.gradient} flex items-center justify-center text-2xl relative overflow-hidden`}>
                  {selectedMood.emoji}
                  
                  {/* Special effects in the mood display */}
                  {selectedMood.id === 'blooming' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full animate-pulse"></div>
                  )}
                  {selectedMood.id === 'amazing' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Feeling {selectedMood.label}</h3>
                  <p className="text-sm text-gray-600">Want to add more context?</p>
                </div>
              </div>
              
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? (optional)"
                className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={3}
              />
              
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save My Mood</span>
                )}
              </button>
            </div>
          )}

          {/* Weekly Mood Overview */}
          {moodEntries.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <span>This Week's Journey</span>
              </h3>
              <div className="flex justify-between items-end space-x-2">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex-1 text-center group">
                    <div className="mb-3 relative">
                      {day.mood ? (
                        <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${day.mood.gradient} flex items-center justify-center text-xl border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 relative overflow-hidden`}>
                          {day.mood.emoji}
                          
                          {/* Special effects for weekly view */}
                          {day.mood.id === 'blooming' && (
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full animate-pulse"></div>
                          )}
                          {day.mood.id === 'amazing' && (
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      ) : (
                        <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                      )}
                      
                      {/* Tooltip on hover */}
                      {day.entry && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                            <div className="font-medium">{day.mood.label}</div>
                            {day.entry.note && (
                              <div className="text-gray-300 mt-1 max-w-32 truncate">
                                "{day.entry.note}"
                              </div>
                            )}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-medium text-gray-600">{day.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Mood History Section */}
          {moodEntries.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <History className="w-5 h-5 text-emerald-600" />
                  <span>Complete Mood History</span>
                </h3>
                <div className="text-sm text-gray-500">
                  {moodEntries.length} total entries
                </div>
              </div>
              
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {moodEntries.map((entry, index) => (
                  <div key={entry.id} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${entry.mood.gradient} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200 relative overflow-hidden`}>
                      {entry.mood.emoji}
                      
                      {/* Special effects in history */}
                      {entry.mood.id === 'blooming' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full animate-pulse"></div>
                      )}
                      {entry.mood.id === 'amazing' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{entry.mood.label}</h4>
                          <p className="text-sm text-gray-600">{formatFullDate(entry.date)}</p>
                          <p className="text-xs text-gray-500">{formatTime(entry.date)}</p>
                        </div>
                        <div className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full">
                          #{moodEntries.length - index}
                        </div>
                      </div>
                      {entry.note && (
                        <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-start space-x-2">
                            <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 text-sm">{entry.note}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Quick Stats and Recent */}
        <div className="space-y-6">
          {/* View Toggle */}
          <div className="bg-white rounded-2xl border border-gray-200 p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setViewMode('recent')}
                className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                  viewMode === 'recent'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Recent</span>
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                  viewMode === 'history'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>All</span>
              </button>
            </div>
          </div>

          {/* Recent Feelings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {viewMode === 'recent' ? 'Recent Feelings' : 'All Moods'}
                </h3>
              </div>
              {moodEntries.length > 5 && viewMode === 'recent' && (
                <button
                  onClick={() => setShowAllEntries(!showAllEntries)}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1 transition-colors"
                >
                  <span>{showAllEntries ? 'Show Less' : 'See More'}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showAllEntries ? 'rotate-90' : ''}`} />
                </button>
              )}
            </div>

            {moodEntries.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {(viewMode === 'history' ? moodEntries : recentEntries).map((entry, index) => (
                  <div key={entry.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${entry.mood.gradient} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200 relative overflow-hidden`}>
                      {entry.mood.emoji}
                      
                      {/* Special effects in sidebar */}
                      {entry.mood.id === 'blooming' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full animate-pulse"></div>
                      )}
                      {entry.mood.id === 'amazing' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 text-sm">{entry.mood.label}</p>
                        <div className="text-xs text-gray-500 flex items-center space-x-1">
                          <span>{formatDate(entry.date)}</span>
                          <span>•</span>
                          <span>{formatTime(entry.date)}</span>
                        </div>
                      </div>
                      {entry.note && (
                        <div className="mt-1 flex items-start space-x-1">
                          <MessageCircle className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 text-xs line-clamp-2">{entry.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Flower2 className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-gray-500 text-sm">No mood entries yet</p>
                <p className="text-gray-400 text-xs mt-1">Start tracking to see your journey</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          {moodEntries.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Your Progress</span>
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total check-ins</span>
                  <span className="font-semibold text-emerald-700">{moodEntries.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This week</span>
                  <span className="font-semibold text-emerald-700">
                    {moodEntries.filter(entry => {
                      const entryDate = new Date(entry.date);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return entryDate >= weekAgo;
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Latest mood</span>
                  <div className="flex items-center space-x-2">
                    {moodEntries[0] && (
                      <>
                        <span className="text-lg">{moodEntries[0].mood.emoji}</span>
                        <span className="font-semibold text-emerald-700 text-sm">{moodEntries[0].mood.label}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-200">
                  <p className="text-xs text-emerald-600 text-center">
                    Keep blooming! 🌸
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}