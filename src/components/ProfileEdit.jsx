import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Save, X, AlertCircle, CheckCircle2, Camera, Edit3 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function ProfileEdit({ onClose }) {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'security'

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Profile validation
    if (activeTab === 'profile') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    // Security validation
    if (activeTab === 'security') {
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          newErrors.currentPassword = 'Current password is required to change password';
        }
        if (formData.newPassword.length < 6) {
          newErrors.newPassword = 'New password must be at least 6 characters';
        }
        if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFirebaseErrorMessage = (error) => {
    if (error.includes('wrong-password') || error.includes('invalid-credential')) {
      return 'Current password is incorrect. Please try again! 🔐';
    }
    if (error.includes('email-already-in-use')) {
      return 'This email is already in use by another account! 📧';
    }
    if (error.includes('weak-password')) {
      return 'Please choose a stronger password (at least 6 characters)! 💪';
    }
    if (error.includes('invalid-email')) {
      return 'Please enter a valid email address! ✉️';
    }
    if (error.includes('requires-recent-login')) {
      return 'For security, please sign out and sign back in before changing sensitive information! 🔒';
    }
    return 'Something went wrong. Please try again! ✨';
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      let result;
      
      if (activeTab === 'profile') {
        // Update profile information
        result = await updateUserProfile({
          name: formData.name.trim(),
          email: formData.email.trim(),
        });
      } else {
        // Update password
        result = await updateUserProfile({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
      }

      if (result.success) {
        setShowSuccess(true);
        if (activeTab === 'security') {
          // Clear password fields after successful update
          setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }));
        }
        setTimeout(() => {
          setShowSuccess(false);
          if (activeTab === 'profile') {
            onClose();
          }
        }, 2000);
      } else {
        setErrors({ general: result.error || 'An error occurred' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100">
        {/* Success Notification */}
        {showSuccess && (
          <div className="absolute top-4 left-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg z-10 animate-bounce">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">
                {activeTab === 'profile' ? 'Profile updated successfully! ✨' : 'Password changed successfully! 🔐'}
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <p className="text-sm text-gray-600">Update your account information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'profile'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === 'security'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Security</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl blur opacity-25"></div>
              <div className="relative p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-red-800 mb-1">Update Failed</h4>
                  <p className="text-red-700 text-sm">{getFirebaseErrorMessage(errors.general)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Profile Picture Section */}
              <div className="text-center pb-4 border-b border-gray-100">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-2xl text-white font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full border-2 border-emerald-500 flex items-center justify-center hover:bg-emerald-50 transition-colors">
                    <Camera className="w-3 h-3 text-emerald-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Profile picture coming soon!</p>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Display Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                      errors.name ? 'border-red-300 bg-red-50' : 'bg-white hover:border-gray-300'
                    }`}
                    placeholder="Enter your display name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.name}</span></p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'bg-white hover:border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.email}</span></p>}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 mb-1">Password Security</h4>
                    <p className="text-blue-700 text-xs">Choose a strong password to keep your wellness data secure. Leave blank to keep current password.</p>
                  </div>
                </div>
              </div>

              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Current Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                      errors.currentPassword ? 'border-red-300 bg-red-50' : 'bg-white hover:border-gray-300'
                    }`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.currentPassword && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.currentPassword}</span></p>}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">New Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                      errors.newPassword ? 'border-red-300 bg-red-50' : 'bg-white hover:border-gray-300'
                    }`}
                    placeholder="Enter new password (optional)"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.newPassword}</span></p>}
              </div>

              {/* Confirm Password */}
              {formData.newPassword && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Confirm New Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-400 ${
                        errors.confirmPassword ? 'border-red-300 bg-red-50' : 'bg-white hover:border-gray-300'
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm flex items-center space-x-1"><AlertCircle className="w-3 h-3" /><span>{errors.confirmPassword}</span></p>}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}