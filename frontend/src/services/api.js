import axios from 'axios';
import { YOGA_POSES } from '../data/poses';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const getPoses = async (filters = {}) => {
  try {
    const res = await api.get('/poses', { params: filters });
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, utilizing verified local pose data:', error.message);
    let results = [...YOGA_POSES];
    if (filters.category && filters.category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.difficulty && filters.difficulty !== 'All') {
      results = results.filter(p => p.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      results = results.filter(p =>
        p.sanskritName.toLowerCase().includes(s) ||
        p.englishName.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s)
      );
    }
    return results;
  }
};

export const getPoseById = async (id) => {
  try {
    const res = await api.get(`/poses/${id}`);
    return res.data;
  } catch (error) {
    console.warn(`Falling back to local pose lookup for ${id}`);
    const found = YOGA_POSES.find(p => p.id.toLowerCase() === id.toLowerCase());
    if (found) return found;
    throw error;
  }
};

export const sendChatMessage = async (message, sessionId = 'default', history = []) => {
  try {
    const res = await api.post('/chat', {
      message,
      session_id: sessionId,
      history,
    });
    return res.data;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};

export const getChatHistory = async (sessionId = 'default') => {
  try {
    const res = await api.get('/chat/history', { params: { session_id: sessionId } });
    return res.data;
  } catch (error) {
    console.warn('Could not load chat history from backend:', error.message);
    return [];
  }
};

export const clearChatHistory = async (sessionId = 'default') => {
  try {
    const res = await api.delete('/chat/history', { params: { session_id: sessionId } });
    return res.data;
  } catch (error) {
    console.warn('Could not clear remote chat history:', error.message);
    return { success: true };
  }
};

export const generateRoutine = async (goal, experience, duration) => {
  try {
    const res = await api.post('/generate-routine', {
      goal,
      experience,
      duration: parseInt(duration, 10),
    });
    return res.data;
  } catch (error) {
    console.error('Routine generation error:', error);
    throw error;
  }
};

export const getSavedRoutines = async () => {
  try {
    const res = await api.get('/routines');
    return res.data;
  } catch (error) {
    console.warn('Could not retrieve saved routines from backend, loading from localStorage:', error.message);
    const local = localStorage.getItem('yogaveda_saved_routines');
    return local ? JSON.parse(local) : [];
  }
};

export const saveRoutine = async (routineData) => {
  try {
    const res = await api.post('/routines', routineData);
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, saving routine to localStorage:', error.message);
    const local = localStorage.getItem('yogaveda_saved_routines');
    const routines = local ? JSON.parse(local) : [];
    const item = {
      ...routineData,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    routines.unshift(item);
    localStorage.setItem('yogaveda_saved_routines', JSON.stringify(routines));
    return item;
  }
};

export const deleteRoutine = async (id) => {
  try {
    const res = await api.delete(`/routines/${id}`);
    return res.data;
  } catch (error) {
    console.warn('Backend unavailable, deleting routine from localStorage:', error.message);
    const local = localStorage.getItem('yogaveda_saved_routines');
    if (local) {
      const routines = JSON.parse(local).filter(r => r.id !== id);
      localStorage.setItem('yogaveda_saved_routines', JSON.stringify(routines));
    }
    return { id };
  }
};

export const toggleFavoriteRoutine = async (id) => {
  try {
    const res = await api.patch(`/routines/${id}/favorite`);
    return res.data;
  } catch (error) {
    const local = localStorage.getItem('yogaveda_saved_routines');
    if (local) {
      const routines = JSON.parse(local).map(r => r.id === id ? { ...r, is_favorite: !r.is_favorite } : r);
      localStorage.setItem('yogaveda_saved_routines', JSON.stringify(routines));
    }
    return { id };
  }
};

export const logPracticeSession = async (sessionData) => {
  try {
    const res = await api.post('/sessions', sessionData);
    return res.data;
  } catch (error) {
    const local = localStorage.getItem('yogaveda_sessions');
    const sessions = local ? JSON.parse(local) : [];
    const item = { ...sessionData, id: Date.now(), completed_at: new Date().toISOString() };
    sessions.unshift(item);
    localStorage.setItem('yogaveda_sessions', JSON.stringify(sessions));
    return item;
  }
};

export const getPracticeSessions = async () => {
  try {
    const res = await api.get('/sessions');
    return res.data;
  } catch (error) {
    const local = localStorage.getItem('yogaveda_sessions');
    return local ? JSON.parse(local) : [];
  }
};

export const checkHealth = async () => {
  try {
    const res = await api.get('/health');
    return res.data;
  } catch (error) {
    return { status: 'offline', gemini: 'offline_knowledge_mode' };
  }
};
