import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Patient'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, name) => {
    try {
      setLoading(true);
      
      // Create user account
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateProfile(result.user, { 
        displayName: name || email.split('@')[0] 
      });
      
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      
      // Ensure email and password are provided
      if (!email || !password) {
        return { success: false, error: 'Please enter both email and password' };
      }

      await signInWithEmailAndPassword(auth, email.trim(), password);
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return { success: false, error: 'No user is currently signed in' };
      }

      // Handle password update
      if (updates.newPassword && updates.currentPassword) {
        // Re-authenticate user before changing password
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          updates.currentPassword
        );
        
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, updates.newPassword);
        
        return { success: true };
      }

      // Handle profile updates (name and/or email)
      if (updates.name !== undefined || updates.email !== undefined) {
        const profileUpdates = {};
        
        if (updates.name !== undefined) {
          profileUpdates.displayName = updates.name;
        }
        
        // Update profile first
        if (Object.keys(profileUpdates).length > 0) {
          await updateProfile(currentUser, profileUpdates);
        }
        
        // Update email if provided and different from current
        if (updates.email && updates.email !== currentUser.email) {
          await updateEmail(currentUser, updates.email);
        }
        
        return { success: true };
      }

      return { success: false, error: 'No updates provided' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    updateUserProfile,
    logout
  };
};