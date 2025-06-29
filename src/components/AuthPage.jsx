import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles, Shield, CheckCircle2, Flower2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFirebaseErrorMessage = (error) => {
    if (error.includes('invalid-credential') || error.includes('user-not-found') || error.includes('wrong-password')) {
      return 'Hmm, those credentials don\'t look right. Double-check your email and password! 🤔';
    }
    if (error.includes('email-already-in-use')) {
      return 'This email is already part of our community! Try signing in instead. 😊';
    }
    if (error.includes('weak-password')) {
      return 'Let\'s make that password a bit stronger - at least 6 characters! 💪';
    }
    if (error.includes('invalid-email')) {
      return 'That email format doesn\'t look quite right. Mind checking it? 📧';
    }
    if (error.includes('too-many-requests')) {
      return 'Whoa there! Too many attempts. Take a breather and try again in a moment. ☕';
    }
    if (error.includes('network-request-failed')) {
      return 'Looks like there\'s a connection hiccup. Check your internet and try again! 🌐';
    }
    return 'Something unexpected happened. Let\'s try that again! ✨';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      let result;
      if (isSignUp) {
        result = await signUp(formData.email, formData.password, formData.name);
      } else {
        result = await signIn(formData.email, formData.password);
      }

      if (!result.success) {
        setErrors({ general: result.error || 'An error occurred' });
      } else if (isSignUp) {
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 4000);
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col relative overflow-hidden">
      {/* Header with Vedant Kankate */}
      <header className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-light text-slate-700">
              <span className="text-slate-600">Vedant</span>
              <span className="font-medium text-emerald-600 ml-1">Kankate</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <Flower2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-slate-600 font-medium">MindBloom</span>
            </div>
          </div>
          
          {/* Optional: Add a subtle indicator */}
          <div className="hidden md:flex items-center space-x-2 text-slate-400 text-xs">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Digital Wellness Platform</span>
          </div>
        </div>
      </header>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-200/25 to-pink-200/25 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-emerald-100 animate-bounce">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Welcome to MindBloom! 🌸</h3>
                <p className="text-gray-600">Your account has been created successfully. Get ready to start your wellness journey and watch your mind bloom!</p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-emerald-600">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Redirecting you to your dashboard...</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex pt-20">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Animated Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/30 rounded-full animate-ping delay-500"></div>
          
          {/* Floating Icons */}
          <div className="absolute top-1/4 left-1/4 animate-float">
            <Flower2 className="w-6 h-6 text-white/60" />
          </div>
          <div className="absolute bottom-1/3 right-1/3 animate-float delay-1000">
            <Sparkles className="w-5 h-5 text-white/50" />
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <div className="mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                <Flower2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-light leading-tight mb-6">
                What <span className="font-medium text-emerald-200">great emotional wellness</span><br />
                feels like for your life
              </h1>
              <p className="text-xl text-white/80 font-light leading-relaxed">
                Track your moods, journal your thoughts, and discover patterns in your mental health journey. Watch your mind bloom with our beautifully designed platform.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-white/60">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Trusted by thousands worldwide</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Flower2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-light text-slate-800">
                Mind<span className="font-medium">Bloom</span>
              </h1>
            </div>

            {/* Form Header */}
            <div className="mb-10">
              <h2 className="text-3xl font-light text-slate-800 mb-3">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-slate-500 text-lg font-light">
                {isSignUp 
                  ? 'Start your journey to better mental health ✨' 
                  : 'Continue your wellness journey 🌱'
                }
              </p>
            </div>

            {/* Creative Error Popup */}
            {errors.general && (
              <div className="mb-6 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl blur opacity-25"></div>
                <div className="relative p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-red-800 mb-1">Oops! Something went wrong</h4>
                    <p className="text-red-700 text-sm">{getFirebaseErrorMessage(errors.general)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 block">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400 ${
                        errors.name ? 'border-red-300 bg-red-50' : 'bg-white hover:border-slate-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.name}</span></p>}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'bg-white hover:border-slate-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.email}</span></p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'bg-white hover:border-slate-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.password}</span></p>}
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 block">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-800 placeholder-slate-400 ${
                        errors.confirmPassword ? 'border-red-300 bg-red-50' : 'bg-white hover:border-slate-300'
                      }`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.confirmPassword}</span></p>}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-4 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                <div className="relative flex items-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isSignUp ? 'Creating your space...' : 'Signing you in...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </div>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                    setErrors({});
                  }}
                  className="ml-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-200 relative group"
                >
                  <span className="relative z-10">{isSignUp ? 'Sign In' : 'Sign Up'}</span>
                  <div className="absolute inset-0 bg-emerald-50 rounded transform scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                </button>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Your data is secure and encrypted</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}