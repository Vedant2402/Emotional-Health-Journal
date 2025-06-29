import React, { useState } from 'react';
import { PenTool, Heart, Star, Zap, Coffee, CheckCircle, Flower2 } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';

const emotionTags = [
  { id: 'grateful', label: 'Grateful', icon: Heart, color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 'excited', label: 'Excited', icon: Star, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'motivated', label: 'Motivated', icon: Zap, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'peaceful', label: 'Peaceful', icon: Coffee, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'creative', label: 'Creative', icon: PenTool, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'blooming', label: 'Blooming', icon: Flower2, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
];

const prompts = [
  "What made you smile today?",
  "What are you grateful for right now?",
  "Describe a moment when you felt proud of yourself",
  "What's something new you learned today?",
  "What would you tell your past self?",
  "What are you looking forward to?",
  "How did your mind bloom today?",
];

export default function Journal() {
  const { user } = useAuth();
  const { journalEntries, addJournalEntry } = useFirestore(user?.id || null);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSave = async () => {
    if (!content.trim() || !user) return;

    setIsLoading(true);

    const result = await addJournalEntry({
      date: new Date().toISOString(),
      title: title.trim() || 'Untitled Entry',
      content: content.trim(),
      tags: selectedTags,
    });

    if (result.success) {
      setTitle('');
      setContent('');
      setSelectedTags([]);
      setIsWriting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    setIsLoading(false);
  };

  if (isWriting) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {showSuccess && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
            <CheckCircle className="w-4 h-4 inline mr-2" />
            Journal entry saved! Your thoughts are blooming ✨
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">New Journal Entry</h2>
          <button
            onClick={() => setIsWriting(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
          <p className="text-sm text-gray-600 mb-2">💭 Writing prompt:</p>
          <p className="text-emerald-700 font-medium">{currentPrompt}</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg font-medium"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your thoughts..."
            className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={8}
          />

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">How are you feeling? (optional)</p>
            <div className="flex flex-wrap gap-2">
              {emotionTags.map((tag) => {
                const Icon = tag.icon;
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                      selectedTags.includes(tag.id)
                        ? tag.color + ' shadow-sm'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-3 h-3 inline mr-1" />
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              disabled={!content.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Entry</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Your Journal
        </h2>
        <p className="text-gray-600">A safe space for your thoughts and feelings to bloom</p>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Ready to reflect?</h3>
            <p className="text-sm text-gray-600 mb-4">{currentPrompt}</p>
          </div>
          <button
            onClick={() => setIsWriting(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <PenTool className="w-4 h-4" />
            <span>Start Writing</span>
          </button>
        </div>
      </div>

      {journalEntries.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Entries</h3>
          <div className="grid gap-6">
            {journalEntries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{entry.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{entry.content}</p>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tagId) => {
                      const tag = emotionTags.find(t => t.id === tagId);
                      if (!tag) return null;
                      const Icon = tag.icon;
                      return (
                        <span key={tagId} className={`px-2 py-1 rounded-full text-xs ${tag.color}`}>
                          <Icon className="w-3 h-3 inline mr-1" />
                          {tag.label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {journalEntries.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Journey</h3>
          <p className="text-gray-600 mb-6">Your first journal entry is just a click away - let your thoughts bloom</p>
          <button
            onClick={() => setIsWriting(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
          >
            Write Your First Entry
          </button>
        </div>
      )}
    </div>
  );
}