import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Trash2, Sparkles, User, Bot, AlertCircle, RefreshCw, Volume2, VolumeX, Copy, Check, BookOpen } from 'lucide-react';
import { sendChatMessage, getChatHistory, clearChatHistory } from '../services/api';

const AIAssistant = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Namaste! I'm your YogaVeda AI assistant. What would you like to learn about yoga today?",
      created_at: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const topicGroups = [
    {
      label: 'Ancient Philosophy & IKS',
      questions: [
        "What is the importance of yoga in Indian culture?",
        "Explain Patanjali's eight limbs of Ashtanga Yoga.",
        "What is the difference between Pranayama and Asana?"
      ]
    },
    {
      label: 'Asana Practice & Alignment',
      questions: [
        "Explain Surya Namaskar step-by-step.",
        "What is Vrikshasana and its balance benefits?",
        "How do I start practising yoga safely as a beginner?"
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const hist = await getChatHistory('default');
        if (hist && hist.length > 0) {
          setMessages(hist);
        }
      } catch (e) {
        console.warn('Could not fetch initial chat history:', e);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q && q.trim()) {
      handleSendMessage(q.trim());
    }
  }, [location.search]);

  // Clean speech synthesis
  const toggleSpeech = (id, text) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = (textToSend || inputText).trim();
    if (!query || loading) return;

    setErrorMsg(null);
    setInputText('');

    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query,
      created_at: new Date().toISOString()
    };

    const newMessagesList = [...messages, userMessage];
    setMessages(newMessagesList);
    setLoading(true);

    try {
      const historyPayload = newMessagesList
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));

      const res = await sendChatMessage(query, 'default', historyPayload);
      
      const assistantMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: res.response || "Namaste. I am reflecting upon your inquiry.",
        created_at: res.timestamp || new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setErrorMsg("We encountered an issue connecting to the Gemini knowledge service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (window.confirm("Are you sure you wish to clear your conversation history?")) {
      try {
        await clearChatHistory('default');
      } catch (e) {
        console.warn('Clear history failed:', e);
      }
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "Namaste! I'm your YogaVeda AI assistant. What would you like to learn about yoga today?",
          created_at: new Date().toISOString()
        }
      ]);
      setErrorMsg(null);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#A8B99A]/30 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EAE6D8] text-[11px] font-bold text-[#244B35] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Google Gemini-Powered IKS Tutor</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-[#183C2A]">
            Ask YogaVeda AI
          </h1>
          <p className="text-xs sm:text-sm text-[#777D52]">
            Authentic, historically grounded yoga knowledge and practice insights.
          </p>
        </div>

        <button
          onClick={handleClearChat}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#F7F5EB] border border-[#A8B99A]/40 text-xs font-semibold text-[#777D52] hover:text-red-700 hover:border-red-200 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Questions by Category */}
      <div className="bg-white p-5 rounded-3xl border border-[#A8B99A]/30 shadow-sm space-y-3">
        <span className="text-[11px] font-bold text-[#777D52] uppercase tracking-wider block">
          Curated Inquiries to Explore:
        </span>
        <div className="space-y-2">
          {topicGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <span className="text-[10px] font-semibold text-[#244B35]">{group.label}:</span>
              <div className="flex flex-wrap gap-2">
                {group.questions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-xs bg-[#F7F5EB] hover:bg-[#EAE6D8] text-[#183C2A] px-3 py-1.5 rounded-xl border border-[#A8B99A]/30 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white rounded-3xl border border-[#A8B99A]/30 shadow-sm p-4 sm:p-6 min-h-[460px] max-h-[580px] overflow-y-auto space-y-6">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  isUser
                    ? 'bg-[#183C2A] text-white'
                    : 'bg-[#244B35] text-[#C5A059] border border-[#C5A059]/40'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#244B35] text-[#F7F5EB] rounded-tr-none'
                    : 'bg-[#F7F5EB] text-[#183C2A] border border-[#A8B99A]/30 rounded-tl-none shadow-xs'
                }`}
              >
                {/* Formatted Text rendering */}
                <div className="whitespace-pre-line space-y-2 font-normal">
                  {m.content}
                </div>

                {/* Footer Controls: Audio TTS & Copy button for Assistant */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5 text-[10px]">
                  <span className={isUser ? 'text-[#A8B99A]' : 'text-[#777D52]'}>
                    {m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>

                  {!isUser && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSpeech(m.id, m.content)}
                        className="text-[#777D52] hover:text-[#244B35] p-1 rounded-md transition-colors"
                        title={speakingMessageId === m.id ? 'Stop Speech' : 'Listen with Voice'}
                      >
                        {speakingMessageId === m.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => copyToClipboard(m.id, m.content)}
                        className="text-[#777D52] hover:text-[#244B35] p-1 rounded-md transition-colors"
                        title="Copy message"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3.5 h-3.5 text-green-700" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-[#244B35] text-[#C5A059] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#C5A059]/40">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-[#F7F5EB] border border-[#A8B99A]/30 rounded-2xl rounded-tl-none px-5 py-4 text-xs text-[#777D52] flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#244B35] animate-ping" />
              <span className="font-serif italic">YogaVeda is consulting classical treatises...</span>
            </div>
          </div>
        )}

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center space-x-3"
      >
        <input
          type="text"
          placeholder="Ask anything about traditional yoga, Patanjali, or asanas..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={loading}
          className="flex-1 px-5 py-3.5 rounded-2xl bg-white border border-[#A8B99A]/40 text-sm text-[#183C2A] placeholder-[#777D52]/70 focus:outline-none focus:ring-2 focus:ring-[#244B35]/40 shadow-sm"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="px-6 py-3.5 rounded-2xl bg-[#244B35] text-[#F7F5EB] hover:bg-[#183C2A] disabled:opacity-50 font-bold text-sm shadow-md transition-all flex items-center space-x-2 border border-[#C5A059]/30"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Educational Notice */}
      <p className="text-[11px] text-center text-[#777D52]">
        YogaVeda AI provides educational traditional insights. Never replaces professional medical or clinical guidance.
      </p>
    </div>
  );
};

export default AIAssistant;
