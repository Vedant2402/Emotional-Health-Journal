import React, { useState } from 'react';
import Header from './components/Header';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import Analytics from './components/Analytics';
import AuthPage from './components/AuthPage';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('mood');
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'mood':
        return <MoodTracker />;
      case 'journal':
        return <Journal />;
      case 'analytics':
        return <Analytics />;
      default:
        return <MoodTracker />;
    }
  };

  // Show loading screen first
  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600">Loading MindBloom...</p>
        </div>
      </div>
    );
  }

  // Show auth page if user is not logged in
  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
      />
      <main className="flex-1 pb-8">
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  );
}

export default App;