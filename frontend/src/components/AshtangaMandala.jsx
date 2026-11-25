import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, ChevronRight, Compass } from 'lucide-react';

const AshtangaMandala = () => {
  const [activeLimb, setActiveLimb] = useState(2); // default on Asana

  const limbs = [
    {
      num: 1,
      name: "Yama (यम)",
      english: "Universal Ethics & Restraints",
      sutra: "Yoga Sūtra 2.30",
      principles: ["Ahimsa (Non-violence)", "Satya (Truthfulness)", "Asteya (Non-stealing)", "Brahmacharya (Energy containment)", "Aparigraha (Non-greed)"],
      description: "The moral foundations harmonizing our relationship with the external world and living beings.",
      dailyPractice: "Practice non-judgmental patience with colleagues and gentle consideration for all living creatures."
    },
    {
      num: 2,
      name: "Niyama (नियम)",
      english: "Personal Observances & Discipline",
      sutra: "Yoga Sūtra 2.32",
      principles: ["Shaucha (Purity)", "Santosha (Contentment)", "Tapas (Discipline)", "Svadhyaya (Self-study)", "Ishvara Pranidhana (Surrender)"],
      description: "Internal observances cultivating purity of intent, unwavering gratitude, and dedication to spiritual growth.",
      dailyPractice: "Take 5 minutes at twilight to reflect with gratitude on three blessings from your day."
    },
    {
      num: 3,
      name: "Asana (आसन)",
      english: "Steady Posture",
      sutra: "Yoga Sūtra 2.46: 'Sthira Sukham Asanam'",
      principles: ["Sthira (Firmness)", "Sukha (Ease & Comfort)", "Effortless Relaxation", "Spinal Verticality"],
      description: "A stable and comfortable posture in which physical restlessness dissolves, preparing the nervous system for meditation.",
      dailyPractice: "Ground through your feet in Tadasana before sitting at your desk; maintain an elongated, relaxed spine."
    },
    {
      num: 4,
      name: "Pranayama (प्राणायाम)",
      english: "Breath Mastery & Vital Energy",
      sutra: "Yoga Sūtra 2.49",
      principles: ["Puraka (Inhale)", "Antara Kumbhaka (Hold)", "Rechaka (Exhale)", "Bahya Kumbhaka (Pause)"],
      description: "Regulation of inhalation and exhalation bridging somatic movement with the subtle energy pathways (Ida, Pingala, Sushumna).",
      dailyPractice: "Practice 6 rounds of conscious Sama Vritti (Box Breathing) whenever feeling overwhelmed."
    },
    {
      num: 5,
      name: "Pratyahara (प्रत्याहार)",
      english: "Sensory Withdrawal",
      sutra: "Yoga Sūtra 2.54",
      principles: ["Inward Reflection", "Detachment from Stimuli", "Mental Quieting"],
      description: "Drawing the senses inward like a tortoise retracting its limbs, freeing the mind from perpetual sensory bombardment.",
      dailyPractice: "Institute a 30-minute digital disconnect before bedtime to quiet ocular and neural hyperactivity."
    },
    {
      num: 6,
      name: "Dharana (धारणा)",
      english: "Focused Concentration",
      sutra: "Yoga Sūtra 3.1",
      principles: ["Ekagrata (One-pointedness)", "Anchor Point / Drishti", "Mental Stillness"],
      description: "Binding the conscious attention to a singular focal point, such as the heart center or the breath at the nostrils.",
      dailyPractice: "Focus your uninterrupted attention on a single task for 25 continuous minutes without tab switching."
    },
    {
      num: 7,
      name: "Dhyana (ध्यान)",
      english: "Meditative Absorption",
      sutra: "Yoga Sūtra 3.2",
      principles: ["Tailadharavat (Unbroken flow)", "Effortless Witnessing", "Pure Awareness"],
      description: "When concentration transitions into an effortless, unbroken stream of contemplative awareness like oil poured from one vessel to another.",
      dailyPractice: "Sit quietly for 10 minutes observing thoughts rise and dissipate like passing clouds without judgment."
    },
    {
      num: 8,
      name: "Samadhi (समाधि)",
      english: "Unitive Consciousness & Liberation",
      sutra: "Yoga Sūtra 3.3",
      principles: ["Dissolution of Duality", "Kaivalya", "Self-Realization (Moksha)"],
      description: "The transcendental state of unitive consciousness where the illusion of separateness between observer, observing, and observed dissolves.",
      dailyPractice: "Recognize that your fundamental essence is peace, boundless and unconditioned."
    }
  ];

  const current = limbs[activeLimb];

  return (
    <div className="bg-[#244B35] dark:bg-[#112A1D] text-[#F7F5EB] rounded-3xl p-6 sm:p-10 border border-[#C5A059]/40 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#C5A059]/30">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            <Sparkles className="w-4 h-4" />
            <span>Sage Patanjali's Classical System</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Ashtanga Yoga: The Eightfold Sacred Path
          </h2>
        </div>
        <span className="text-xs text-[#A8B99A] bg-[#183C2A] px-3 py-1.5 rounded-full border border-white/10 font-medium">
          Interactive Explorer
        </span>
      </div>

      {/* 8 Limbs Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {limbs.map((l, idx) => (
          <button
            key={l.num}
            onClick={() => setActiveLimb(idx)}
            className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all ${
              activeLimb === idx
                ? 'bg-[#C5A059] text-[#183C2A] font-bold shadow-lg scale-105'
                : 'bg-[#183C2A]/70 text-[#EAE6D8] hover:bg-[#183C2A] font-medium border border-white/5'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
              activeLimb === idx ? 'bg-[#183C2A] text-white' : 'bg-white/10 text-[#C5A059]'
            }`}>
              {l.num}
            </span>
            <span className="text-xs truncate w-full">{l.name.split('(')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Limb Details Panel */}
      <div className="bg-[#183C2A] dark:bg-[#0A1911] rounded-2xl p-6 sm:p-8 border border-white/10 shadow-inner grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Limb {current.num} of 8 • {current.sutra}
            </span>
          </div>

          <h3 className="font-serif text-3xl font-bold text-white">
            {current.name}
          </h3>
          <p className="text-sm text-[#A8B99A] italic font-serif">
            {current.english}
          </p>

          <p className="text-xs sm:text-sm text-[#EAE6D8] leading-relaxed">
            {current.description}
          </p>

          {/* Constituent Principles */}
          <div className="pt-2 space-y-1.5">
            <span className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider block">
              Core Tenets:
            </span>
            <div className="flex flex-wrap gap-2">
              {current.principles.map((pr, pIdx) => (
                <span
                  key={pIdx}
                  className="text-xs bg-[#244B35] text-[#F7F5EB] px-3 py-1 rounded-xl border border-white/10 font-medium"
                >
                  {pr}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Life Integration Card */}
        <div className="lg:col-span-5 bg-[#244B35]/80 p-6 rounded-2xl border border-[#C5A059]/30 shadow-md space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Daily Sādhana Integration</span>
          </span>
          <p className="text-xs text-[#EAE6D8] leading-relaxed">
            "{current.dailyPractice}"
          </p>
          <div className="pt-2 text-[10px] text-[#A8B99A] border-t border-white/10">
            Rooted in Sage Patanjali's traditional Indian psychology.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AshtangaMandala;
