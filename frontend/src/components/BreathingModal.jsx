import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Wind } from 'lucide-react';

const BreathingModal = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState('inhale'); // 'inhale' | 'hold1' | 'exhale' | 'hold2'
  const [phaseProgress, setPhaseProgress] = useState(0); // 0 to 100
  const [isActive, setIsActive] = useState(true);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [technique, setTechnique] = useState('box'); // 'box' (4-4-4-4) | 'calm' (4-7-8)

  const intervals = technique === 'box'
    ? { inhale: 4, hold1: 4, exhale: 4, hold2: 4 }
    : { inhale: 4, hold1: 7, exhale: 8, hold2: 1 };

  const phaseNames = {
    inhale: { title: 'Pūraka (Inhale)', instruction: 'Breathe in slowly through your nose, expanding abdomen and chest.' },
    hold1: { title: 'Antara Kumbhaka (Hold)', instruction: 'Retain the breath effortlessly, keeping throat soft.' },
    exhale: { title: 'Recaka (Exhale)', instruction: 'Gently release breath through nose, feeling grounded.' },
    hold2: { title: 'Bāhya Kumbhaka (Pause)', instruction: 'Rest in pure stillness before the next wave of prana.' }
  };

  const playPhaseChime = (freq = 432) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {}
  };

  useEffect(() => {
    if (!isOpen || !isActive) return;

    const currentDuration = intervals[phase] * 1000;
    const intervalTime = 50; // update every 50ms for smooth expansion
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalTime;
      const percent = Math.min(100, (elapsed / currentDuration) * 100);
      setPhaseProgress(percent);

      if (elapsed >= currentDuration) {
        clearInterval(timer);
        // Transition to next phase
        if (phase === 'inhale') {
          playPhaseChime(528);
          setPhase('hold1');
        } else if (phase === 'hold1') {
          playPhaseChime(396);
          setPhase('exhale');
        } else if (phase === 'exhale') {
          playPhaseChime(432);
          setPhase('hold2');
        } else if (phase === 'hold2') {
          playPhaseChime(639);
          setCyclesCompleted(prev => prev + 1);
          setPhase('inhale');
        }
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isActive, phase, technique, soundEnabled]);

  if (!isOpen) return null;

  const getScale = () => {
    if (phase === 'inhale') {
      return 0.8 + (phaseProgress / 100) * 0.4; // 0.8 to 1.2
    } else if (phase === 'hold1') {
      return 1.2;
    } else if (phase === 'exhale') {
      return 1.2 - (phaseProgress / 100) * 0.4; // 1.2 to 0.8
    } else {
      return 0.8;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#112A1D]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#F7F5EB] rounded-3xl max-w-lg w-full border border-[#C5A059]/40 shadow-2xl overflow-hidden relative flex flex-col p-6 sm:p-8 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#A8B99A]/30">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-ping" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#244B35]">
              Prāṇāyāma Sanctuary
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl text-[#183C2A] hover:bg-[#EAE6D8] transition-colors"
              title={soundEnabled ? 'Mute chimes' : 'Enable chimes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#244B35]" /> : <VolumeX className="w-4 h-4 text-[#777D52]" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#183C2A] hover:bg-[#EAE6D8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Technique Selector */}
        <div className="flex rounded-2xl bg-[#EAE6D8] p-1 text-xs font-semibold">
          <button
            onClick={() => { setTechnique('box'); setPhase('inhale'); setPhaseProgress(0); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              technique === 'box' ? 'bg-[#244B35] text-white shadow-sm' : 'text-[#183C2A] hover:text-[#244B35]'
            }`}
          >
            Sama Vṛtti (Box 4-4-4-4)
          </button>
          <button
            onClick={() => { setTechnique('calm'); setPhase('inhale'); setPhaseProgress(0); }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              technique === 'calm' ? 'bg-[#244B35] text-white shadow-sm' : 'text-[#183C2A] hover:text-[#244B35]'
            }`}
          >
            Deep Relaxation (4-7-8)
          </button>
        </div>

        {/* Central Breathing Mandala Graphic */}
        <div className="relative py-8 flex flex-col items-center justify-center">
          {/* Animated Background Aura */}
          <div
            className="w-56 h-56 rounded-full bg-gradient-to-tr from-[#A8B99A]/40 via-[#C5A059]/25 to-[#244B35]/30 flex items-center justify-center transition-transform duration-100 ease-out shadow-inner"
            style={{ transform: `scale(${getScale()})` }}
          >
            <div className="w-40 h-40 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A059]/50 flex flex-col items-center justify-center text-center p-4 shadow-xl">
              <span className="text-[11px] font-bold tracking-wider text-[#C5A059] uppercase">
                {phase.includes('hold') ? 'Kumbhaka' : phase.toUpperCase()}
              </span>
              <p className="font-serif text-lg font-bold text-[#183C2A] mt-0.5">
                {intervals[phase]}s
              </p>
              <span className="text-[10px] text-[#777D52] mt-1 font-medium">
                {phaseNames[phase].title.split('(')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Instruction Text */}
        <div className="text-center space-y-1.5 min-h-[50px]">
          <h3 className="font-serif text-xl font-bold text-[#183C2A]">
            {phaseNames[phase].title}
          </h3>
          <p className="text-xs text-[#183C2A]/80 max-w-sm mx-auto leading-relaxed">
            {phaseNames[phase].instruction}
          </p>
        </div>

        {/* Progress & Cycles Indicator */}
        <div className="flex items-center justify-between text-xs text-[#777D52] pt-2 border-t border-[#A8B99A]/20">
          <span>Cycles Completed: <strong className="text-[#244B35]">{cyclesCompleted}</strong></span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setPhase('inhale');
                setPhaseProgress(0);
                setCyclesCompleted(0);
              }}
              className="p-2 rounded-xl bg-[#EAE6D8] hover:bg-[#A8B99A]/40 transition-colors"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4 text-[#183C2A]" />
            </button>
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-5 py-2 rounded-xl bg-[#244B35] text-white font-semibold flex items-center space-x-1.5 hover:bg-[#183C2A] transition-colors"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isActive ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BreathingModal;
