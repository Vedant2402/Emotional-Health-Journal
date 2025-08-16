import React from 'react';
import { ExternalLink, Github, Linkedin, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-blue-50 border-t border-slate-200 mt-8 sm:mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Creator Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg sm:text-2xl font-light text-slate-800">
                  Crafted with <span className="text-red-500">♥</span> by
                </h3>
                <p className="text-xl sm:text-3xl font-light text-slate-700">
                  <span className="text-slate-600">Vedant</span>
                  <span className="font-medium text-emerald-600 ml-1">Kankate</span>
                </p>
              </div>
            </div>
            
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4">
              Passionate about creating digital experiences that promote mental wellness and emotional growth. 
              MindBloom is designed to help you track, understand, and nurture your emotional journey.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-8">
            <a
              href="https://vedant-kankate.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white rounded-lg sm:rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 transform hover:scale-105 w-full sm:w-auto justify-center"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              <span className="font-medium text-slate-700 group-hover:text-emerald-700 transition-colors text-sm sm:text-base">
                Portfolio
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/vedant-kankate/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">LinkedIn</span>
            </a>

            <a
              href="https://github.com/vedant2402"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800 text-white rounded-lg sm:rounded-xl hover:bg-slate-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">GitHub</span>
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">MindBloom</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
          </div>

          {/* Copyright */}
          <div className="space-y-1 sm:space-y-2">
            <p className="text-slate-500 text-xs sm:text-sm">
              © 2025 Vedant Kankate. All rights reserved.
            </p>
            <p className="text-slate-400 text-xs">
              Built with React, Firebase, and deep care for mental health recovery 🌸
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-10 left-10 w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-16 w-8 h-8 sm:w-12 sm:h-12 bg-blue-100/20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-300/40 rounded-full animate-ping delay-500"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}