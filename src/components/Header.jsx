import React, { useState } from 'react';
import { Flower2, Sparkles, LogOut, User, BarChart3 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';

export default function Header({ currentView, onViewChange }) {
  const { user, logout } = useAuth();
  const { moodEntries } = useFirestore(user?.id || null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'mood', label: 'Mood', icon: Flower2 },
    { id: 'journal', label: 'Journal', icon: Sparkles },
    { id: 'analytics', label: 'Insights', icon: BarChart3 },
  ];

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  // Get the most recent mood entry
  const recentMood = moodEntries.length > 0 ? moodEntries[0] : null;

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-light text-slate-800">
                Mind<span className="font-medium">Bloom</span>
              </h1>
              <p className="text-xs text-slate-500 font-light">Your wellness journey</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      currentView === item.id
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden flex space-x-1 bg-slate-100 rounded-lg p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-white shadow-sm text-emerald-600'
                        : 'text-slate-600 hover:text-emerald-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </nav>

            {/* User Menu with Recent Mood */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 group"
              >
                {/* Profile Circle with Recent Mood or Default User Icon */}
                <div className="relative">
                  {recentMood ? (
                    <div className={`w-8 h-8 bg-gradient-to-br ${recentMood.mood.gradient} rounded-lg flex items-center justify-center text-lg border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                      {recentMood.mood.emoji}
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Small indicator dot for recent activity */}
                  {recentMood && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                  )}
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-800">{user.name}</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-xs text-slate-500">{user.email}</p>
                    {recentMood && (
                      <>
                        <span className="text-xs text-slate-300">•</span>
                        <p className="text-xs text-slate-500">
                          Feeling {recentMood.mood.label.toLowerCase()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center space-x-3 mb-2">
                      {recentMood ? (
                        <div className={`w-10 h-10 bg-gradient-to-br ${recentMood.mood.gradient} rounded-lg flex items-center justify-center text-lg`}>
                          {recentMood.mood.emoji}
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    
                    {recentMood && (
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium text-slate-700">Latest Mood</p>
                          <p className="text-xs text-slate-500">
                            {new Date(recentMood.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <p className="text-sm text-slate-800 font-medium">
                          {recentMood.mood.emoji} {recentMood.mood.label}
                        </p>
                        {recentMood.note && (
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            "{recentMood.note}"
                          </p>
                        )}
                      </div>
                    )}
                    
                    {!recentMood && (
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <p className="text-xs text-emerald-700 text-center">
                          🌱 Start tracking your mood to see it here!
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}