import { useState, useEffect } from 'react';
import {
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
  serverTimestamp,
  remove
} from 'firebase/database';
import { database } from '../lib/firebase';

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

    const moodsRef = ref(database, 'moods');
    const moodQuery = query(moodsRef, orderByChild('userId'), equalTo(userId));

    const unsubscribe = onValue(moodQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => {
          // Sort by createdAt timestamp (most recent first)
          const aTime = a.createdAt || 0;
          const bTime = b.createdAt || 0;
          return bTime - aTime;
        });
        setMoodEntries(entries);
      } else {
        setMoodEntries([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching mood entries:', error);
      setMoodEntries([]);
      setLoading(false);
    });

    return () => off(moodQuery, 'value', unsubscribe);
  }, [userId]);

  // Subscribe to journal entries
  useEffect(() => {
    if (!userId) {
      setJournalEntries([]);
      return;
    }

    const journalsRef = ref(database, 'journals');
    const journalQuery = query(journalsRef, orderByChild('userId'), equalTo(userId));

    const unsubscribe = onValue(journalQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => {
          // Sort by createdAt timestamp (most recent first)
          const aTime = a.createdAt || 0;
          const bTime = b.createdAt || 0;
          return bTime - aTime;
        });
        setJournalEntries(entries);
      } else {
        setJournalEntries([]);
      }
    }, (error) => {
      console.error('Error fetching journal entries:', error);
      setJournalEntries([]);
    });

    return () => off(journalQuery, 'value', unsubscribe);
  }, [userId]);

  const addMoodEntry = async (entry) => {
    if (!userId) return { success: false, error: 'User not authenticated' };

    try {
      const moodsRef = ref(database, 'moods');
      await push(moodsRef, {
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
      const entryRef = ref(database, `moods/${entryId}`);
      await remove(entryRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      return { success: false, error: error.message };
    }
  };

  const addJournalEntry = async (entry) => {
    if (!userId) return { success: false, error: 'User not authenticated' };

    try {
      const journalsRef = ref(database, 'journals');
      await push(journalsRef, {
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

  return {
    moodEntries,
    journalEntries,
    loading,
    addMoodEntry,
    deleteMoodEntry,
    addJournalEntry
  };
};