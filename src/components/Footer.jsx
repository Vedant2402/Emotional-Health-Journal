import React from 'react';
import { ExternalLink, Github, Linkedin, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-blue-50 border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          {/* Creator Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-light text-slate-800">
                  Crafted with <span className="text-red-500">♥</span> by
                </h3>
                <p className="text-3xl font-light text-slate-700">
                  <span className="text-slate-600">Vedant</span>
                  <span className="font-medium text-emerald-600 ml-1">Kankate</span>
                </p>
              </div>
            </div>
            
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Passionate about creating digital experiences that promote mental wellness and emotional growth. 
              MindBloom is designed to help you track, understand, and nurture your emotional journey.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex items-center justify-center space-x-8">
            <a
              href="https://vedantkankate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 transform hover:scale-105"
            >
              <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              <span className="font-medium text-slate-700 group-hover:text-emerald-700 transition-colors">
                Portfolio
              </span>
            </a>

            <a
              href="https://linkedin.com/in/vedantkankate"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </a>

            <a
              href="https://github.com/vedantkankate"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">MindBloom</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
          </div>

          {/* Copyright */}
          <div className="space-y-2">
            <p className="text-slate-500 text-sm">
              © 2024 Vedant Kankate. All rights reserved.
            </p>
            <p className="text-slate-400 text-xs">
              Built with React, Firebase, and lots of care for mental wellness 🌸
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-emerald-100/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-16 w-12 h-12 bg-blue-100/20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-300/40 rounded-full animate-ping delay-500"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}