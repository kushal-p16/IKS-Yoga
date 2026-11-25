import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Heart, Trash2, Play, Calendar, Clock, Sparkles, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { getSavedRoutines, deleteRoutine, toggleFavoriteRoutine, getPracticeSessions, getChatHistory } from '../services/api';
import PracticeTimerModal from '../components/PracticeTimerModal';

const MyRoutines = () => {
  const [activeTab, setActiveTab] = useState('routines'); // 'routines' | 'history' | 'chats'
  const [routines, setRoutines] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPracticeRoutine, setSelectedPracticeRoutine] = useState(null);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [rData, sData, cData] = await Promise.all([
        getSavedRoutines(),
        getPracticeSessions(),
        getChatHistory('default')
      ]);
      setRoutines(rData || []);
      setSessions(sData || []);
      setChatMessages(cData || []);
    } catch (err) {
      console.warn('Error loading user routine data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this saved routine?")) {
      try {
        await deleteRoutine(id);
        setRoutines(prev => prev.filter(r => r.id !== id));
      } catch (err) {
        console.error('Delete routine failed:', err);
      }
    }
  };

  const handleToggleFav = async (id, e) => {
    e.stopPropagation();
    try {
      await toggleFavoriteRoutine(id);
      setRoutines(prev => prev.map(r => r.id === id ? { ...r, is_favorite: !r.is_favorite } : r));
    } catch (err) {
      console.error('Toggle favorite failed:', err);
    }
  };

  const totalPracticeMinutes = sessions.reduce((acc, s) => acc + (s.duration_minutes || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#A8B99A]/30 dark:border-white/10 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#777D52] dark:text-[#C5A059]">
            Personal Sādhana Dashboard
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#183C2A] dark:text-white mt-1">
            My Routines & Practice History
          </h1>
          <p className="text-xs sm:text-sm text-[#777D52] dark:text-[#A8B99A]">
            Review your saved AI sequences, track logged meditation sessions, and re-read dialogue insights.
          </p>
        </div>

        <Link
          to="/routine-generator"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#244B35] text-white font-bold text-xs shadow-md hover:bg-[#183C2A] transition-all border border-[#C5A059]/40"
        >
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>Create New Routine</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#112A1D] p-5 rounded-2xl border border-[#A8B99A]/30 dark:border-[#C5A059]/20 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#244B35] text-[#C5A059] flex items-center justify-center font-bold">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#777D52] dark:text-[#A8B99A]">Saved Routines</p>
            <p className="font-serif text-2xl font-bold text-[#183C2A] dark:text-white">{routines.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#112A1D] p-5 rounded-2xl border border-[#A8B99A]/30 dark:border-[#C5A059]/20 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#777D52] text-white flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#777D52] dark:text-[#A8B99A]">Sessions Completed</p>
            <p className="font-serif text-2xl font-bold text-[#183C2A] dark:text-white">{sessions.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#112A1D] p-5 rounded-2xl border border-[#A8B99A]/30 dark:border-[#C5A059]/20 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#C5A059] text-[#183C2A] flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#777D52] dark:text-[#A8B99A]">Total Practice Time</p>
            <p className="font-serif text-2xl font-bold text-[#183C2A] dark:text-white">{totalPracticeMinutes} mins</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#A8B99A]/30 dark:border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('routines')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeTab === 'routines'
              ? 'bg-[#244B35] text-white shadow-sm'
              : 'text-[#183C2A] dark:text-[#EAE6D8] hover:bg-[#EAE6D8] dark:hover:bg-white/10'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Routines ({routines.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeTab === 'history'
              ? 'bg-[#244B35] text-white shadow-sm'
              : 'text-[#183C2A] dark:text-[#EAE6D8] hover:bg-[#EAE6D8] dark:hover:bg-white/10'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Practice Tracker ({sessions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('chats')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeTab === 'chats'
              ? 'bg-[#244B35] text-white shadow-sm'
              : 'text-[#183C2A] dark:text-[#EAE6D8] hover:bg-[#EAE6D8] dark:hover:bg-white/10'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>AI Conversations ({chatMessages.length})</span>
        </button>
      </div>

      {/* Tab 1: Saved Routines */}
      {activeTab === 'routines' && (
        <div>
          {routines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routines.map((r) => (
                <div
                  key={r.id}
                  className="bg-white dark:bg-[#112A1D] rounded-3xl p-6 border border-[#A8B99A]/30 dark:border-[#C5A059]/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#EAE6D8] dark:bg-[#183C2A] text-[#244B35] dark:text-[#E6CA85] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        {r.goal}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => handleToggleFav(r.id, e)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            r.is_favorite ? 'text-red-500 fill-current' : 'text-[#777D52] hover:text-red-500'
                          }`}
                          title="Favorite Routine"
                        >
                          <Heart className={`w-4 h-4 ${r.is_favorite ? 'fill-red-500' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(r.id, e)}
                          className="p-1.5 rounded-lg text-[#777D52] hover:text-red-700 transition-colors"
                          title="Delete Routine"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#183C2A] dark:text-white">
                      {r.title}
                    </h3>

                    <div className="flex items-center space-x-3 text-xs text-[#777D52] dark:text-[#A8B99A] mt-2 mb-4">
                      <span>{r.experience}</span>
                      <span>•</span>
                      <span>{r.duration_minutes} minutes</span>
                      <span>•</span>
                      <span>{r.poses?.length || 0} poses</span>
                    </div>

                    <div className="flex items-center space-x-2 overflow-hidden py-1">
                      {r.poses?.slice(0, 4).map((p, pIdx) => (
                        <div
                          key={pIdx}
                          className="w-12 h-12 bg-[#F7F5EB] dark:bg-[#183C2A] rounded-xl border border-[#A8B99A]/30 p-1 flex-shrink-0"
                          title={p.name}
                        >
                          <img
                            src={p.image || '/assets/poses/sukhasana.svg'}
                            alt={p.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}
                      {r.poses?.length > 4 && (
                        <span className="text-xs text-[#777D52] dark:text-[#A8B99A] font-semibold pl-1">
                          +{r.poses.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPracticeRoutine(r)}
                    className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#244B35] text-white hover:bg-[#183C2A] font-bold text-xs shadow-sm transition-all border border-[#C5A059]/30"
                  >
                    <Play className="w-4 h-4 fill-current text-[#C5A059]" />
                    <span>Start Practice Timer</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-[#112A1D] rounded-3xl border border-[#A8B99A]/30 dark:border-white/10 space-y-4">
              <Bookmark className="w-12 h-12 text-[#777D52]/50 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#183C2A] dark:text-white">No Saved Routines Yet</h3>
              <p className="text-sm text-[#777D52] dark:text-[#A8B99A] max-w-sm mx-auto">
                Generate a personalized routine tailored to your goals and save it to your personal library.
              </p>
              <Link
                to="/routine-generator"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[#244B35] text-white font-bold text-sm"
              >
                <span>Generate Routine</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Practice Tracker History */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-[#112A1D] rounded-3xl p-6 border border-[#A8B99A]/30 dark:border-white/10 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#183C2A] dark:text-white">
            Completed Practice Log
          </h3>

          {sessions.length > 0 ? (
            <div className="divide-y divide-[#A8B99A]/20 dark:divide-white/10">
              {sessions.map((s, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#244B35]/10 text-[#244B35] dark:text-[#C5A059] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#183C2A] dark:text-white">{s.routine_title}</p>
                      <p className="text-xs text-[#777D52] dark:text-[#A8B99A]">
                        {s.completed_at ? new Date(s.completed_at).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently completed'}
                      </p>
                      {s.notes && (
                        <p className="text-[11px] text-[#183C2A]/70 dark:text-[#EAE6D8]/80 mt-0.5">{s.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-xs font-bold bg-[#F7F5EB] dark:bg-[#183C2A] px-3 py-1.5 rounded-xl border border-[#A8B99A]/30 dark:border-white/10 text-[#244B35] dark:text-[#E6CA85]">
                    {s.duration_minutes} minutes
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#777D52] space-y-3">
              <Calendar className="w-10 h-10 text-[#777D52]/40 mx-auto" />
              <p className="text-sm">No practice sessions logged yet.</p>
              <p className="text-xs">Complete any routine with the interactive practice timer to record sessions here!</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Chat History */}
      {activeTab === 'chats' && (
        <div className="bg-white dark:bg-[#112A1D] rounded-3xl p-6 border border-[#A8B99A]/30 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#183C2A] dark:text-white">
              Previous AI Dialogue History
            </h3>
            <Link
              to="/assistant"
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#244B35] dark:text-[#E6CA85] hover:text-[#183C2A]"
            >
              <span>Open Chat Interface</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {chatMessages.length > 0 ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#EAE6D8]/80 dark:bg-[#183C2A] text-[#183C2A] dark:text-[#EAE6D8] border border-[#A8B99A]/30 dark:border-white/10'
                      : 'bg-[#F7F5EB] dark:bg-[#07130D] text-[#244B35] dark:text-[#A8B99A] border border-[#A8B99A]/20 dark:border-white/5'
                  }`}
                >
                  <p className="font-bold uppercase tracking-wider text-[10px] mb-1 text-[#777D52] dark:text-[#C5A059]">
                    {msg.role === 'user' ? 'Seeker Inquiry' : 'YogaVeda AI Response'}
                  </p>
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#777D52] space-y-3">
              <MessageSquare className="w-10 h-10 text-[#777D52]/40 mx-auto" />
              <p className="text-sm">No previous messages recorded.</p>
              <Link
                to="/assistant"
                className="inline-flex items-center space-x-1 text-xs font-bold text-[#244B35]"
              >
                <span>Ask your first question now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Practice Timer Modal */}
      {selectedPracticeRoutine && (
        <PracticeTimerModal
          routine={selectedPracticeRoutine}
          onClose={() => setSelectedPracticeRoutine(null)}
          onSessionSaved={loadAllData}
        />
      )}
    </div>
  );
};

export default MyRoutines;
