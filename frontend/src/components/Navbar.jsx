import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Compass, Brain, Calendar, BookOpen, Menu, X, Heart, Wind, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import BreathingModal from './BreathingModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const ambientAudioRef = React.useRef(null);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  // Gentle Solfeggio 432 Hz Ambient Drone synthesis
  const toggleAmbientSound = () => {
    try {
      if (ambientPlaying) {
        if (ambientAudioRef.current) {
          ambientAudioRef.current.gain.exponentialRampToValueAtTime(0.0001, ambientAudioRef.current.ctx.currentTime + 1);
          setTimeout(() => {
            ambientAudioRef.current.osc1.stop();
            ambientAudioRef.current.osc2.stop();
            ambientAudioRef.current = null;
          }, 1000);
        }
        setAmbientPlaying(false);
      } else {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(432, ctx.currentTime);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(216, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        ambientAudioRef.current = { ctx, osc1, osc2, gain };
        setAmbientPlaying(true);
      }
    } catch (e) {
      console.warn('Ambient audio could not be initialized:', e);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Explore Poses', path: '/poses', icon: Compass },
    { name: 'AI Yoga Assistant', path: '/assistant', icon: Brain, badge: 'Gemini' },
    { name: 'Routine Generator', path: '/routine-generator', icon: Sparkles },
    { name: 'My Routines', path: '/my-routines', icon: Heart },
    { name: 'About IKS', path: '/about-iks', icon: BookOpen },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#F7F5EB]/90 dark:bg-[#0A1911]/90 border-b border-[#A8B99A]/30 dark:border-[#C5A059]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-full bg-[#244B35] flex items-center justify-center p-1.5 shadow-md shadow-[#244B35]/20 group-hover:scale-105 transition-transform duration-300 border border-[#C5A059]/40">
                <img 
                  src="/assets/illustrations/lotus-icon.svg" 
                  alt="YogaVeda AI" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-serif text-2xl font-extrabold tracking-tight text-[#183C2A] dark:text-[#F7F5EB] group-hover:text-[#244B35] transition-colors">
                    YogaVeda
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#244B35] text-[#C5A059] tracking-wider uppercase border border-[#C5A059]/30">
                    AI
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[9px] tracking-widest uppercase font-semibold text-[#777D52] dark:text-[#A8B99A]">
                    Gemini Connected
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                      active
                        ? 'bg-[#244B35] text-[#F7F5EB] shadow-sm'
                        : 'text-[#183C2A]/85 dark:text-[#F7F5EB]/80 hover:text-[#183C2A] dark:hover:text-white hover:bg-[#EAE6D8]/70 dark:hover:bg-white/10'
                    }`}
                  >
                    {Icon && <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#C5A059]' : 'text-[#777D52]'}`} />}
                    <span>{item.name}</span>
                    {item.badge && !active && (
                      <span className="ml-1 text-[9px] px-1.5 py-0.2 bg-[#C5A059]/20 text-[#244B35] dark:text-[#E6CA85] font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Tools */}
            <div className="hidden sm:flex items-center space-x-2.5">
              {/* Theme Toggle (Vedic / Forest Zen) */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-[#EAE6D8] dark:bg-white/10 text-[#183C2A] dark:text-[#E6CA85] hover:bg-[#A8B99A]/40 transition-colors"
                title={isDark ? 'Switch to Vedic Dawn theme' : 'Switch to Forest Zen dark theme'}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Pranayama Breathing Quick Button */}
              <button
                onClick={() => setShowBreathing(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#EAE6D8] dark:bg-white/10 text-[#244B35] dark:text-[#F7F5EB] hover:bg-[#A8B99A]/40 text-xs font-semibold border border-[#A8B99A]/40 dark:border-white/10 transition-colors"
                title="Open Pranayama Breathing Guide"
              >
                <Wind className="w-3.5 h-3.5 text-[#777D52]" />
                <span className="hidden md:inline">Prāṇāyāma</span>
              </button>

              {/* Ambient Sound Drone Toggle */}
              <button
                onClick={toggleAmbientSound}
                className={`p-2 rounded-xl border transition-colors ${
                  ambientPlaying
                    ? 'bg-[#244B35] text-[#C5A059] border-[#244B35] shadow-xs'
                    : 'bg-[#EAE6D8] dark:bg-white/10 text-[#777D52] dark:text-[#A8B99A] border-[#A8B99A]/40 dark:border-white/10 hover:bg-[#A8B99A]/40'
                }`}
                title={ambientPlaying ? 'Mute 432Hz ambient drone' : 'Play 432Hz ambient drone'}
              >
                {ambientPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Ask Assistant CTA */}
              <Link
                to="/assistant"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#244B35] to-[#183C2A] text-[#F7F5EB] text-xs font-bold shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#C5A059]/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Ask Gemini</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-[#EAE6D8] dark:bg-white/10 text-[#183C2A] dark:text-[#E6CA85]"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowBreathing(true)}
                className="p-2 rounded-xl bg-[#EAE6D8] dark:bg-white/10 text-[#244B35] dark:text-white"
                title="Breathe"
              >
                <Wind className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-[#183C2A] dark:text-[#F7F5EB] hover:bg-[#EAE6D8] dark:hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle navigation"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#A8B99A]/30 dark:border-white/10 bg-[#F7F5EB] dark:bg-[#0A1911] px-4 pt-3 pb-5 space-y-1 shadow-lg">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-[#244B35] text-[#F7F5EB]'
                      : 'text-[#183C2A] dark:text-[#F7F5EB] hover:bg-[#EAE6D8] dark:hover:bg-white/10'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-[#777D52]" />}
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 bg-[#C5A059] text-white font-bold rounded-full ml-auto">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Floating Pranayama Modal */}
      <BreathingModal isOpen={showBreathing} onClose={() => setShowBreathing(false)} />
    </>
  );
};

export default Navbar;
