import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, SkipForward, RotateCcw, CheckCircle2, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { logPracticeSession } from '../services/api';

const PracticeTimerModal = ({ routine, onClose, onSessionSaved }) => {
  const poses = routine?.poses || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(poses[0]?.duration_seconds || 60);
  const [isActive, setIsActive] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const totalDurationRef = useRef(routine?.duration_minutes || 15);

  const currentPose = poses[currentIndex] || {};
  const nextPose = poses[currentIndex + 1];

  // Web Audio API soft chime for transitions
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528 Hz - Solfeggio Love/Transformation frequency
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // AudioContext might be blocked until user interacts
    }
  };

  useEffect(() => {
    let timer = null;
    if (isActive && !isCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Step transition
          playChime();
          if (!isResting && currentPose.rest_time_seconds && currentPose.rest_time_seconds > 0) {
            // Enter rest period
            setIsResting(true);
            return currentPose.rest_time_seconds;
          } else {
            // Move to next pose or complete
            if (currentIndex + 1 < poses.length) {
              const nextIdx = currentIndex + 1;
              setCurrentIndex(nextIdx);
              setIsResting(false);
              return poses[nextIdx].duration_seconds || 60;
            } else {
              // Finished routine!
              setIsCompleted(true);
              setIsActive(false);
              handleCompleteSession();
              return 0;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, isResting, currentIndex, poses, isCompleted, currentPose]);

  const handleCompleteSession = async () => {
    try {
      await logPracticeSession({
        routine_id: routine?.id || null,
        routine_title: routine?.title || 'Yoga Practice',
        duration_minutes: routine?.duration_minutes || Math.round(poses.reduce((a, b) => a + (b.duration_seconds || 60), 0) / 60) || 15,
        notes: `Completed ${poses.length} poses: ${poses.map(p => p.name || p.pose_id).join(', ')}`
      });
      if (onSessionSaved) onSessionSaved();
    } catch (err) {
      console.warn('Could not log session to backend:', err);
    }
  };

  const handleSkip = () => {
    playChime();
    if (currentIndex + 1 < poses.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setIsResting(false);
      setTimeLeft(poses[nextIdx].duration_seconds || 60);
    } else {
      setIsCompleted(true);
      setIsActive(false);
      handleCompleteSession();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsResting(false);
    setIsCompleted(false);
    setTimeLeft(poses[0]?.duration_seconds || 60);
    setIsActive(true);
  };

  const currentDurationTotal = isResting
    ? (currentPose.rest_time_seconds || 15)
    : (currentPose.duration_seconds || 60);
  const progressPercent = Math.min(100, Math.max(0, ((currentDurationTotal - timeLeft) / currentDurationTotal) * 100));

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#183C2A]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#F7F5EB] rounded-3xl max-w-2xl w-full border border-[#A8B99A]/40 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#244B35] text-[#F7F5EB] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">
              Sādhana Practice
            </span>
            <span className="text-[#A8B99A]">•</span>
            <span className="text-sm font-medium truncate max-w-xs">{routine?.title || 'Yoga Routine'}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg text-[#F7F5EB]/80 hover:text-white hover:bg-white/10 transition-colors"
              title={soundEnabled ? 'Mute sound chime' : 'Enable sound chime'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#F7F5EB]/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isCompleted ? (
          <div className="p-6 overflow-y-auto space-y-6 flex-1 flex flex-col justify-between">
            {/* Pose Stage and Image */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-2xl border border-[#A8B99A]/30 overflow-hidden shadow-inner p-2 flex-shrink-0 relative">
                <img
                  src={currentPose.image || '/assets/poses/sukhasana.svg'}
                  alt={currentPose.name}
                  className="w-full h-full object-contain"
                />
                {isResting && (
                  <div className="absolute inset-0 bg-[#244B35]/85 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                    <span className="text-sm font-semibold tracking-wide uppercase">Breath Rest</span>
                    <span className="text-xs text-[#A8B99A] mt-1">Prepare next pose</span>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="text-xs font-semibold text-[#777D52] uppercase tracking-wider">
                  Pose {currentIndex + 1} of {poses.length}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#183C2A]">
                  {isResting ? 'Conscious Breath Rest' : currentPose.name}
                </h3>
                <p className="text-sm text-[#183C2A]/80 leading-relaxed">
                  {isResting
                    ? 'Take smooth diaphragmatic breaths through your nose. Release muscular tension before transitioning.'
                    : currentPose.instructions || 'Breathe steadily and align your posture with ease.'}
                </p>
                {currentPose.safety_tips && !isResting && (
                  <div className="mt-3 text-xs bg-[#EAE6D8]/80 text-[#777D52] p-2.5 rounded-xl border border-[#A8B99A]/30">
                    <strong>Tip:</strong> {currentPose.safety_tips}
                  </div>
                )}
              </div>
            </div>

            {/* Countdown Display & Progress */}
            <div className="bg-white p-6 rounded-2xl border border-[#A8B99A]/30 shadow-sm text-center space-y-3">
              <div className="text-4xl sm:text-5xl font-mono font-bold text-[#244B35] tracking-tight">
                {formatTime(timeLeft)}
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-[#EAE6D8] h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#777D52] to-[#244B35] h-full transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {nextPose && (
                <p className="text-xs text-[#777D52]">
                  Up Next: <span className="font-medium text-[#183C2A]">{nextPose.name}</span>
                </p>
              )}
            </div>

            {/* Interactive Controls */}
            <div className="flex items-center justify-center space-x-4 pt-2">
              <button
                onClick={handleRestart}
                className="p-3 rounded-2xl bg-[#EAE6D8] text-[#183C2A] hover:bg-[#A8B99A]/40 transition-colors"
                title="Restart Routine"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsActive(!isActive)}
                className="px-6 py-3 rounded-2xl bg-[#244B35] text-white hover:bg-[#183C2A] font-semibold flex items-center space-x-2 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Resume</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSkip}
                className="p-3 rounded-2xl bg-[#EAE6D8] text-[#183C2A] hover:bg-[#A8B99A]/40 transition-colors"
                title="Skip to Next Pose"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="p-8 text-center space-y-6 flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#244B35]/10 text-[#244B35] flex items-center justify-center mx-auto border-2 border-[#244B35]/20 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl font-bold text-[#183C2A]">
                Sādhana Completed!
              </h3>
              <p className="text-[#777D52] max-w-md mx-auto text-sm leading-relaxed">
                Namaste! You have successfully completed your traditional yoga practice. Your mind and body are now aligned with Prana and stillness.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#A8B99A]/30 max-w-sm w-full text-xs text-[#183C2A]/80 space-y-1">
              <p>• Poses Completed: <strong>{poses.length}</strong></p>
              <p>• Session Duration: <strong>{routine?.duration_minutes || 15} minutes</strong></p>
              <p className="text-[#244B35] font-semibold mt-2">✓ Saved to your Practice History</p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-2xl bg-[#244B35] text-[#F7F5EB] font-bold shadow-lg hover:bg-[#183C2A] transition-all hover:scale-105"
            >
              Finish & Return
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PracticeTimerModal;
