import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export const useFirestore = (userId) => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to mood entries
  useEffect(() => {
    if (!userId) {
      setMoodEntries([]);
      setLoading(false);
      return;
    }

    const moodsRef = collection(firestore, 'moods');
    const moodQuery = query(
      moodsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(moodQuery, 
      (snapshot) => {
        const entries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to ISO string for consistency
          date: doc.data().date || doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
        }));
        setMoodEntries(entries);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching mood entries:', error);
        setMoodEntries([]);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  // Subscribe to journal entries
  useEffect(() => {
    if (!userId) {
      setJournalEntries([]);
      return;
    }

    const journalsRef = collection(firestore, 'journals');
    const journalQuery = query(
      journalsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(journalQuery,
      (snapshot) => {
        const entries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to ISO string for consistency
          date: doc.data().date || doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
        }));
        setJournalEntries(entries);
      },
      (error) => {
        console.error('Error fetching journal entries:', error);
        setJournalEntries([]);
      }
    );

    return unsubscribe;
  }, [userId]);

  const addMoodEntry = async (entry) => {
    if (!userId) return { success: false, error: 'User not authenticated' };

    try {
      const moodsRef = collection(firestore, 'moods');
      await addDoc(moodsRef, {
        ...entry,
        userId,
        createdAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error adding mood entry:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteMoodEntry = async (entryId) => {
    if (!userId) return { success: false, error: 'User not authenticated' };

    try {
      const entryRef = doc(firestore, 'moods', entryId);
      await deleteDoc(entryRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      return { success: false, error: error.message };
    }
  };

  const addJournalEntry = async (entry) => {
    if (!userId) return { success: false, error: 'User not authenticated' };

    try {
      const journalsRef = collection(firestore, 'journals');
      await addDoc(journalsRef, {
        ...entry,
        userId,
        createdAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error adding journal entry:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteJournalEntry = async (entryId) => {
    if (!userId) return { success: false, error: 'User not authenticated' };

    try {
      const entryRef = doc(firestore, 'journals', entryId);
      await deleteDoc(entryRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    moodEntries,
    journalEntries,
    loading,
    addMoodEntry,
    deleteMoodEntry,
    addJournalEntry,
    deleteJournalEntry
  };
};