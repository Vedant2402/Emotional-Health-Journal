import React, { useState, useEffect } from 'react';
import { Flower2, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start circle transition after loading completes
          setTimeout(() => setShowTransition(true), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random increment between 5-20
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showTransition) {
      // Complete the transition after animation
      setTimeout(() => {
        setIsComplete(true);
        onLoadingComplete();
      }, 1000);
    }
  }, [showTransition, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Main Loading Screen */}
      <div className={`absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-blue-100/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-32 w-32 h-32 sm:w-48 sm:h-48 bg-yellow-100/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-red-300/40 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300/30 rounded-full animate-ping delay-500"></div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center space-y-8 sm:space-y-12 px-4">
          {/* Geometric Loading Animation */}
          <div className="relative flex flex-col items-center space-y-3 sm:space-y-4">
            {/* Top Circle - Blue/Yellow */}
            <div className="relative w-16 h-16 sm:w-24 sm:h-24">
              <div className="absolute inset-0 rounded-full overflow-hidden animate-spin" style={{ animationDuration: '3s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-yellow-400 to-yellow-500 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
              </div>
            </div>

            {/* Middle Circle - Yellow/Red (overlapping) */}
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 -mt-6 sm:-mt-8">
              <div className="absolute inset-0 rounded-full overflow-hidden animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-red-500 to-red-600 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
              </div>
            </div>

            {/* Bottom Circle - Red/Blue (overlapping) */}
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 -mt-6 sm:-mt-8">
              <div className="absolute inset-0 rounded-full overflow-hidden animate-spin" style={{ animationDuration: '3.5s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-blue-500 to-blue-600 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
              </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-yellow-200/20 to-red-200/20 rounded-full blur-xl animate-pulse"></div>
          </div>

          {/* App Logo and Name */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center animate-pulse">
                <Flower2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl font-light text-slate-800">
                  Mind<span className="font-medium text-emerald-600">Bloom</span>
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm">Your wellness journey</p>
              </div>
            </div>

            {/* Creator Name */}
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl font-light text-slate-700">
                <span className="text-slate-600">Vedant</span>
                <span className="font-medium text-emerald-600 ml-1">Kankate</span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm font-light">
                Crafting digital wellness experiences
              </p>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="w-64 sm:w-80 mx-auto space-y-3 sm:space-y-4">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-slate-600 text-xs sm:text-sm">
              <span>Loading your experience...</span>
              <span className="font-medium">{Math.round(Math.min(progress, 100))}%</span>
            </div>
          </div>

          {/* Loading Messages */}
          <div className="h-6">
            {progress < 30 && (
              <p className="text-slate-500 animate-fadeIn text-sm sm:text-base">Initializing wellness platform...</p>
            )}
            {progress >= 30 && progress < 60 && (
              <p className="text-slate-500 animate-fadeIn text-sm sm:text-base">Setting up your mood tracker...</p>
            )}
            {progress >= 60 && progress < 90 && (
              <p className="text-slate-500 animate-fadeIn text-sm sm:text-base">Preparing your journal space...</p>
            )}
            {progress >= 90 && (
              <p className="text-slate-500 animate-fadeIn text-sm sm:text-base">Almost ready! ✨</p>
            )}
          </div>
        </div>
      </div>

      {/* Circle Transition Overlay */}
      <div className={`absolute inset-0 pointer-events-none ${showTransition ? 'block' : 'hidden'}`}>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full transition-all duration-1000 ease-in-out ${
          showTransition ? 'w-[200vmax] h-[200vmax]' : 'w-0 h-0'
        }`}></div>
      </div>
    </div>
  );
}