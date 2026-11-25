import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, ShieldAlert, Bookmark, Play, RotateCcw, Flame, Heart, Target, Award, Printer, ArrowRight } from 'lucide-react';
import { generateRoutine, saveRoutine } from '../services/api';
import PracticeTimerModal from '../components/PracticeTimerModal';

const RoutineGenerator = () => {
  const [goal, setGoal] = useState('Relaxation');
  const [experience, setExperience] = useState('Beginner');
  const [duration, setDuration] = useState(15);
  const [loading, setLoading] = useState(false);
  const [routineResult, setRoutineResult] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPracticeTimer, setShowPracticeTimer] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const goals = [
    { name: 'Relaxation', icon: Heart, desc: 'Soothes nervous tension, eases mental fatigue, and restores parasympathetic tranquility.' },
    { name: 'Flexibility', icon: Flame, desc: 'Decompresses tight hamstrings, lengthens the spine, and expands joint articulation.' },
    { name: 'General fitness', icon: Target, desc: 'Builds functional core stamina, tones musculature, and invigorates vital prana.' },
    { name: 'Better concentration', icon: Award, desc: 'Focuses mental faculties, clears sensory turbulence, and enhances one-pointedness.' },
    { name: 'Morning wellness', icon: Sparkles, desc: 'Awakens digestive fires (Jatharagni), aligns spinal posture, and greets the day with energy.' },
  ];

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = [10, 15, 20, 30];

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSavedSuccess(false);

    try {
      const result = await generateRoutine(goal, experience, duration);
      setRoutineResult(result);
    } catch (err) {
      console.error('Routine generation error:', err);
      setErrorMsg("Failed to generate routine. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRoutine = async () => {
    if (!routineResult) return;
    try {
      await saveRoutine({
        title: routineResult.title || `${goal} Routine`,
        goal,
        experience,
        duration_minutes: duration,
        poses: routineResult.poses || [],
        advice: routineResult.advice || '',
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (e) {
      console.error('Failed to save routine:', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAE6D8] border border-[#A8B99A]/50 text-xs font-bold text-[#244B35] uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Gemini-Guided Sādhana Formulation</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#183C2A] tracking-tight">
          Personalized Yoga Routine Generator
        </h1>
        <p className="text-sm sm:text-base text-[#183C2A]/80 leading-relaxed font-normal">
          Select your wellness intention, your current level of experience, and your available duration. YogaVeda AI will formulate an authentic sequence structured with anatomical hold times and rest intervals.
        </p>
      </div>

      {/* Interactive Selection Wizard */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#A8B99A]/40 shadow-sm space-y-8">
        
        {/* Step 1: Goal */}
        <div>
          <label className="block font-serif text-lg font-bold text-[#183C2A] mb-3 flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-[#244B35] text-white flex items-center justify-center text-xs font-bold">1</span>
            <span>Select Your Wellness Intention (Saṅkalpa)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {goals.map((g) => {
              const Icon = g.icon;
              return (
                <button
                  key={g.name}
                  type="button"
                  onClick={() => setGoal(g.name)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    goal === g.name
                      ? 'border-[#244B35] bg-[#244B35] text-[#F7F5EB] shadow-md ring-2 ring-[#C5A059]/50'
                      : 'border-[#A8B99A]/40 bg-[#F7F5EB]/60 text-[#183C2A] hover:bg-[#EAE6D8]'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className={`w-4 h-4 ${goal === g.name ? 'text-[#C5A059]' : 'text-[#777D52]'}`} />
                    <span className="font-serif font-bold text-base">{g.name}</span>
                  </div>
                  <div className={`text-xs leading-relaxed ${goal === g.name ? 'text-[#EAE6D8]' : 'text-[#777D52]'}`}>
                    {g.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3: Experience & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#A8B99A]/20">
          
          {/* Experience Level */}
          <div>
            <label className="block font-serif text-lg font-bold text-[#183C2A] mb-3 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#244B35] text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Experience Level</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {experienceLevels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setExperience(lvl)}
                  className={`py-3 px-2 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${
                    experience === lvl
                      ? 'border-[#244B35] bg-[#244B35] text-[#F7F5EB] shadow-xs'
                      : 'border-[#A8B99A]/40 bg-[#F7F5EB]/60 text-[#183C2A] hover:bg-[#EAE6D8]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block font-serif text-lg font-bold text-[#183C2A] mb-3 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#244B35] text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Available Duration</span>
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`py-3 px-2 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${
                    duration === d
                      ? 'border-[#244B35] bg-[#244B35] text-[#F7F5EB] shadow-xs'
                      : 'border-[#A8B99A]/40 bg-[#F7F5EB]/60 text-[#183C2A] hover:bg-[#EAE6D8]'
                  }`}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2 text-center">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#244B35] text-[#F7F5EB] font-bold text-sm shadow-xl hover:bg-[#183C2A] hover:scale-105 active:scale-95 disabled:opacity-50 transition-all inline-flex items-center justify-center space-x-3 border border-[#C5A059]/40"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Formulating Sacred Sequence with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
                <span>Generate Routine with YogaVeda AI</span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200 text-xs text-center">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Routine Display Section */}
      {routineResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#A8B99A]/40 shadow-sm space-y-8 animate-fadeIn">
          {/* Routine Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#A8B99A]/20 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#777D52]">
                Custom Sādhana Formulated
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-[#183C2A] mt-1">
                {routineResult.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#183C2A]/80 mt-1 max-w-xl leading-relaxed">
                {routineResult.overview}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl bg-[#F7F5EB] text-[#183C2A] hover:bg-[#EAE6D8] border border-[#A8B99A]/30 transition-colors"
                title="Print Routine / Save PDF"
              >
                <Printer className="w-4 h-4 text-[#777D52]" />
              </button>

              <button
                onClick={handleSaveRoutine}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#EAE6D8] text-[#183C2A] hover:bg-[#A8B99A]/40 font-bold text-xs border border-[#A8B99A]/40 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#244B35]" />
                <span>{savedSuccess ? 'Saved in My Routines!' : 'Save Routine'}</span>
              </button>

              <button
                onClick={() => setShowPracticeTimer(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#244B35] text-white hover:bg-[#183C2A] font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all border border-[#C5A059]/40"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />
                <span>Start Practice Mode</span>
              </button>
            </div>
          </div>

          {/* Advice Pill */}
          {routineResult.advice && (
            <div className="bg-[#F7F5EB] p-4 rounded-2xl border border-[#A8B99A]/30 text-xs text-[#183C2A]/85 flex items-start space-x-3">
              <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
              <div>
                <strong>Traditional Guidance:</strong> {routineResult.advice}
              </div>
            </div>
          )}

          {/* Timeline of Poses */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#183C2A]">
              Step-by-Step Sequence ({routineResult.poses?.length || 0} Poses)
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#A8B99A]/40 space-y-8">
              {routineResult.poses?.map((pose, idx) => (
                <div key={idx} className="relative group">
                  {/* Step Marker */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#244B35] text-white flex items-center justify-center font-bold text-xs border-4 border-white shadow-sm">
                    {idx + 1}
                  </div>

                  {/* Pose Card in Timeline */}
                  <div className="bg-[#F7F5EB]/60 rounded-2xl p-5 border border-[#A8B99A]/30 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center hover:bg-white hover:shadow-md transition-all">
                    {/* Pose Thumbnail */}
                    <div className="sm:col-span-3 bg-white rounded-xl p-2 border border-[#A8B99A]/20 aspect-[4/3] flex items-center justify-center overflow-hidden">
                      <img
                        src={pose.image || '/assets/poses/sukhasana.svg'}
                        alt={pose.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="sm:col-span-9 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-serif text-lg font-bold text-[#183C2A]">
                          {pose.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs font-semibold">
                          <span className="bg-[#244B35]/10 text-[#244B35] px-2.5 py-1 rounded-lg">
                            Hold: {pose.duration_seconds || 60}s
                          </span>
                          {pose.rest_time_seconds > 0 && (
                            <span className="bg-[#777D52]/10 text-[#777D52] px-2.5 py-1 rounded-lg">
                              Rest: {pose.rest_time_seconds}s
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#183C2A]/80 leading-relaxed font-normal">
                        {pose.instructions}
                      </p>

                      {pose.safety_tips && (
                        <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60 flex items-center space-x-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
                          <span><strong>Precaution:</strong> {pose.safety_tips}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Practice CTA */}
          <div className="pt-4 text-center">
            <button
              onClick={() => setShowPracticeTimer(true)}
              className="px-8 py-3.5 rounded-2xl bg-[#244B35] text-white font-bold text-sm shadow-lg hover:bg-[#183C2A] hover:scale-105 active:scale-95 transition-all inline-flex items-center space-x-2 border border-[#C5A059]/40"
            >
              <Play className="w-4 h-4 fill-current text-[#C5A059]" />
              <span>Launch Interactive Practice Timer</span>
            </button>
          </div>
        </div>
      )}

      {/* Practice Timer Modal */}
      {showPracticeTimer && routineResult && (
        <PracticeTimerModal
          routine={routineResult}
          onClose={() => setShowPracticeTimer(false)}
        />
      )}
    </div>
  );
};

export default RoutineGenerator;
