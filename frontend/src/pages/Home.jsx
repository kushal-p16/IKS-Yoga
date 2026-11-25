import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, Heart, Shield, Activity, Brain, CheckCircle, ArrowRight, Quote, BookOpen, SunMedium, Play, Volume2, Wind } from 'lucide-react';
import { YOGA_POSES, DAILY_INSPIRATIONS } from '../data/poses';
import PoseCard from '../components/PoseCard';
import PoseQuickViewModal from '../components/PoseQuickViewModal';
import PracticeTimerModal from '../components/PracticeTimerModal';
import BreathingModal from '../components/BreathingModal';

const Home = () => {
  const [dailyIndex, setDailyIndex] = useState(0);
  const [quickViewPose, setQuickViewPose] = useState(null);
  const [practiceRoutine, setPracticeRoutine] = useState(null);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  
  const daily = DAILY_INSPIRATIONS[dailyIndex] || DAILY_INSPIRATIONS[0];
  const featuredPoses = YOGA_POSES.slice(0, 4);

  const benefits = [
    {
      title: "Physical Wellness",
      sanskrit: "Śarīra Sādhana",
      desc: "Fortifies musculoskeletal alignment, stimulates endocrine balance, and deepens lung tidal volume through anatomical stabilization.",
      icon: Activity,
      color: "bg-[#244B35]",
    },
    {
      title: "Mental Relaxation",
      sanskrit: "Citta Śānti",
      desc: "Down-regulates the sympathetic nervous response, quieting psychological chatter and cultivating serene emotional fortitude.",
      icon: Heart,
      color: "bg-[#777D52]",
    },
    {
      title: "Spinal Flexibility",
      sanskrit: "Merudaṇḍa Cālanā",
      desc: "Decompresses intervertebral cartilage, unlocks synovial joint fluidity, and balances vital prana along the Sushumna Nadi.",
      icon: Shield,
      color: "bg-[#183C2A]",
    },
    {
      title: "Deep Concentration",
      sanskrit: "Ekāgratā & Dhyāna",
      desc: "Calibrates mental focus and cognitive vigilance through rhythmic breath retention and focused optical gaze (Drishti).",
      icon: Brain,
      color: "bg-[#C5A059]",
    },
  ];

  const assistantQuestions = [
    "What is the importance of yoga in Indian culture?",
    "Explain Surya Namaskar step-by-step.",
    "What is the difference between Pranayama and Asana?",
    "Explain Patanjali's Eight Limbs of Ashtanga Yoga.",
  ];

  const handlePracticeSinglePose = (p) => {
    setPracticeRoutine({
      id: `practice-${p.id}`,
      title: `${p.englishName} Practice`,
      duration_minutes: 2,
      poses: [
        {
          pose_id: p.id,
          name: `${p.sanskritName} (${p.englishName})`,
          image: p.image,
          duration_seconds: 60,
          rest_time_seconds: 15,
          instructions: p.instructions?.[0] || 'Maintain steady posture and deep nasal breathing.',
          safety_tips: p.precautions?.[0] || 'Keep joints soft and avoid straining.'
        }
      ]
    });
  };

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16 overflow-hidden">
        {/* Subtle Ambient Mandala Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#A8B99A]/15 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#EAE6D8] border border-[#A8B99A]/50 text-xs font-bold text-[#244B35] tracking-wide uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
                <span>Indian Knowledge System (IKS) Initiative</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#183C2A] leading-[1.15] tracking-tight">
                Find Your Balance. <br />
                <span className="italic font-normal text-[#244B35] bg-gradient-to-r from-[#244B35] via-[#777D52] to-[#C5A059] bg-clip-text text-transparent">
                  Discover Your Inner Peace.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#183C2A]/85 max-w-2xl leading-relaxed font-normal">
                Explore the timeless wisdom of Indian yoga through personalized guidance, traditional practices, and the power of Artificial Intelligence.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/poses"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl bg-[#244B35] text-[#F7F5EB] font-bold text-sm shadow-xl hover:bg-[#183C2A] hover:scale-[1.02] active:scale-[0.98] transition-all border border-[#C5A059]/40"
                >
                  <Compass className="w-5 h-5 text-[#C5A059]" />
                  <span>Explore 12 Traditional Poses</span>
                </Link>

                <Link
                  to="/assistant"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-2xl bg-[#EAE6D8] text-[#183C2A] font-bold text-sm border border-[#A8B99A]/60 hover:bg-[#A8B99A]/40 transition-all shadow-sm"
                >
                  <Sparkles className="w-5 h-5 text-[#777D52]" />
                  <span>Ask AI Assistant</span>
                </Link>

                <button
                  onClick={() => setShowBreathingModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-4 rounded-2xl bg-white/80 hover:bg-white text-[#244B35] font-semibold text-xs border border-[#A8B99A]/40 transition-all shadow-xs"
                >
                  <Wind className="w-4 h-4 text-[#777D52]" />
                  <span>Quick Breath (Prāṇāyāma)</span>
                </button>
              </div>

              {/* Cultural Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#A8B99A]/30 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="font-serif text-2xl font-extrabold text-[#244B35]">5000+ Yrs</p>
                  <p className="text-[11px] text-[#777D52] font-medium">Vedic Tradition</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-extrabold text-[#244B35]">12 Asanas</p>
                  <p className="text-[11px] text-[#777D52] font-medium">Verified IKS Catalog</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-extrabold text-[#244B35]">Gemini AI</p>
                  <p className="text-[11px] text-[#777D52] font-medium">Cultural Reasoning</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#A8B99A]/40 shadow-2xl bg-white p-2.5 group">
                <img
                  src="/assets/hero/hero-yoga.svg"
                  alt="Traditional Indian Yoga Practice"
                  className="w-full h-auto rounded-2xl object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                
                {/* Floating Scriptural Tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#183C2A]/90 backdrop-blur-md p-4 rounded-2xl text-[#F7F5EB] border border-white/10 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#C5A059] flex items-center justify-center text-[#183C2A] font-bold text-sm shadow-sm flex-shrink-0">
                      ॐ
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase">Patañjali Yoga Sūtra 2.46</p>
                      <p className="text-xs text-[#F7F5EB]/95 font-serif italic mt-0.5">
                        "Sthira Sukham Asanam" — Steady and comfortable is posture.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION A: BENEFITS OF YOGA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#777D52]">
            Holistic Transformation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#183C2A]">
            Timeless Benefits of Traditional Yoga
          </h2>
          <p className="text-sm sm:text-base text-[#183C2A]/80 leading-relaxed font-normal">
            Rooted in authentic treatises like Hatha Yoga Pradipika and Charaka Samhita, asana practice balances the three Doshas (Vata, Pitta, Kapha) and unifies the five Koshas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#A8B99A]/30 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center text-white mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-[#777D52] uppercase tracking-wider">
                    {b.sanskrit}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#183C2A] mt-1 mb-3">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#183C2A]/75 leading-relaxed font-normal">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECTION B: FEATURED YOGA POSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#777D52]">
              Curated Asana Gallery
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#183C2A] mt-1">
              Featured Traditional Poses
            </h2>
          </div>
          <Link
            to="/poses"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#244B35] hover:text-[#183C2A] group bg-[#EAE6D8] px-4 py-2 rounded-xl border border-[#A8B99A]/40"
          >
            <span>View All 12 Classical Postures</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPoses.map((pose) => (
            <PoseCard
              key={pose.id}
              pose={pose}
              onQuickView={(p) => setQuickViewPose(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. SECTION C: MEET YOUR AI YOGA ASSISTANT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#244B35] text-[#F7F5EB] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-[#C5A059]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#183C2A] text-xs font-bold text-[#C5A059] border border-[#C5A059]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by Google Gemini AI</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight text-white">
                Meet "Ask YogaVeda" — <br />
                Your IKS Knowledge Companion
              </h2>

              <p className="text-sm sm:text-base text-[#A8B99A] leading-relaxed max-w-xl">
                Have questions about ancient Sanskrit scriptures, Surya Namaskar sequences, or physiological alignment? Ask our intelligent assistant, calibrated with verified Indian traditional yoga principles.
              </p>

              {/* Sample question chips */}
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-bold text-[#EAE6D8]/80 uppercase tracking-wider">Suggested Inquiries to Ask:</p>
                <div className="flex flex-wrap gap-2">
                  {assistantQuestions.map((q, idx) => (
                    <Link
                      key={idx}
                      to={`/assistant?q=${encodeURIComponent(q)}`}
                      className="text-xs bg-[#183C2A]/90 hover:bg-[#183C2A] hover:border-[#C5A059]/60 text-[#F7F5EB] px-3.5 py-2 rounded-xl border border-white/10 transition-colors"
                    >
                      "{q}"
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/assistant"
                  className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-[#F7F5EB] text-[#183C2A] font-bold text-sm shadow-md hover:bg-white hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#244B35]" />
                  <span>Start Conversation with YogaVeda</span>
                </Link>
              </div>
            </div>

            {/* Visual Chat Preview */}
            <div className="lg:col-span-5 bg-[#183C2A] p-6 rounded-2xl border border-white/10 shadow-lg space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-[#244B35] flex items-center justify-center text-[#C5A059] font-bold text-xs border border-[#C5A059]/40">
                  AI
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Ask YogaVeda</p>
                  <p className="text-[10px] text-[#A8B99A]">Online • Traditional Yoga Tutor</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-[#244B35]/70 p-3 rounded-xl border border-white/5 text-[#EAE6D8]">
                  <p className="font-bold text-[#C5A059] mb-1">YogaVeda AI:</p>
                  <p>Namaste! I'm your YogaVeda AI assistant. What would you like to learn about yoga today?</p>
                </div>
                <div className="bg-white/10 p-3 rounded-xl ml-4 text-white">
                  <p className="font-semibold text-[#A8B99A] mb-1">Seeker:</p>
                  <p>How does Vrikshasana (Tree Pose) foster both physical balance and mental focus?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION D: INDIAN KNOWLEDGE SYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#A8B99A]/30 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#777D52]">
              Cultural Lineage & Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#183C2A] leading-tight">
              Yoga as an Indian Knowledge System (IKS)
            </h2>
            <p className="text-sm sm:text-base text-[#183C2A]/80 leading-relaxed font-normal">
              Yoga is not merely physical gymnastics—it is one of India's six classical *Darshanas* (philosophical systems), codified thousands of years ago in the Vedic and Upanishadic traditions.
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#183C2A]/85">
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-5 h-5 text-[#244B35] flex-shrink-0 mt-0.5" />
                <span><strong>Holistic Science</strong>: Integrating the physical body (*Annamaya*), vital breath (*Pranamaya*), and conscious mind (*Manomaya*).</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-5 h-5 text-[#244B35] flex-shrink-0 mt-0.5" />
                <span><strong>Sage Patanjali's Ashtanga</strong>: The eightfold path directing the human intellect toward equanimity and liberation (*Moksha*).</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle className="w-5 h-5 text-[#244B35] flex-shrink-0 mt-0.5" />
                <span><strong>Preservation of Heritage</strong>: Grounding contemporary wellness practices in verified historical context and textual integrity.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about-iks"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#244B35] hover:text-[#183C2A] bg-[#F7F5EB] px-4 py-2.5 rounded-xl border border-[#A8B99A]/40"
              >
                <span>Read Full IKS Educational Monograph</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#A8B99A]/40 shadow-inner bg-[#F7F5EB]">
              <img
                src="/assets/illustrations/iks-heritage.svg"
                alt="Indian Knowledge System Heritage"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION E: DAILY YOGA INSPIRATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAE6D8]/80 border border-[#A8B99A]/40 rounded-3xl p-8 sm:p-10 shadow-sm relative">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#A8B99A]/30">
            <div className="flex items-center space-x-2">
              <SunMedium className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif text-xl font-bold text-[#183C2A]">
                Daily Yoga Inspiration (Nitya Preraṇā)
              </h3>
            </div>
            <div className="flex items-center space-x-1">
              {DAILY_INSPIRATIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setDailyIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    dailyIndex === i ? 'w-6 bg-[#244B35]' : 'bg-[#A8B99A]'
                  }`}
                  aria-label={`Inspiration slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Quote and Source */}
            <div className="md:col-span-7 space-y-4">
              <Quote className="w-10 h-10 text-[#777D52]/40" />
              <blockquote className="font-serif text-xl sm:text-2xl italic text-[#183C2A] leading-relaxed">
                "{daily.quote}"
              </blockquote>
              <p className="text-xs font-bold text-[#777D52] uppercase tracking-wider">
                — {daily.source}
              </p>
            </div>

            {/* Term of the Day & Traditional Fact */}
            <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-[#A8B99A]/30 shadow-sm space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C5A059] tracking-widest">
                  Sanskrit Term of the Day
                </span>
                <h4 className="font-serif text-lg font-bold text-[#183C2A] mt-0.5">
                  {daily.term}
                </h4>
                <p className="text-xs text-[#183C2A]/80 mt-1 leading-relaxed">
                  {daily.meaning}
                </p>
              </div>

              <div className="pt-3 border-t border-[#A8B99A]/20">
                <span className="text-[10px] uppercase font-bold text-[#777D52] tracking-widest">
                  Traditional Knowledge Fact
                </span>
                <p className="text-xs text-[#183C2A]/75 mt-0.5 leading-relaxed">
                  {daily.fact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewPose && (
        <PoseQuickViewModal
          pose={quickViewPose}
          onClose={() => setQuickViewPose(null)}
          onPractice={handlePracticeSinglePose}
        />
      )}

      {/* Practice Timer Modal */}
      {practiceRoutine && (
        <PracticeTimerModal
          routine={practiceRoutine}
          onClose={() => setPracticeRoutine(null)}
        />
      )}

      {/* Breathing Modal */}
      <BreathingModal
        isOpen={showBreathingModal}
        onClose={() => setShowBreathingModal(false)}
      />
    </div>
  );
};

export default Home;
