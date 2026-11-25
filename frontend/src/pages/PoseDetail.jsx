import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, ShieldAlert, CheckCircle2, Lightbulb, BookOpen, Clock, Zap, Heart, Compass, Volume2, Sparkles } from 'lucide-react';
import { getPoseById, getPoses } from '../services/api';
import PracticeTimerModal from '../components/PracticeTimerModal';
import PoseCard from '../components/PoseCard';
import PoseQuickViewModal from '../components/PoseQuickViewModal';

const PoseDetail = () => {
  const { id } = useParams();
  const [pose, setPose] = useState(null);
  const [relatedPosesData, setRelatedPosesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [practiceSeconds, setPracticeSeconds] = useState(60);
  const [quickViewPose, setQuickViewPose] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      setLoading(true);
      try {
        const found = await getPoseById(id);
        setPose(found);

        if (found?.relatedPoses?.length) {
          const all = await getPoses();
          const rel = all.filter(p => found.relatedPoses.includes(p.id));
          setRelatedPosesData(rel);
        }
      } catch (err) {
        console.error('Failed to load pose detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const speakName = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#244B35] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-serif text-[#183C2A]">Consulting the sacred texts...</p>
      </div>
    );
  }

  if (!pose) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#183C2A]">Pose Not Found</h2>
        <p className="text-sm text-[#777D52]">The requested posture could not be located in our verified collection.</p>
        <Link to="/poses" className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[#244B35] text-white font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Asana Library</span>
        </Link>
      </div>
    );
  }

  const singlePoseRoutine = {
    id: `practice-${pose.id}`,
    title: `${pose.englishName} Practice`,
    duration_minutes: Math.ceil(practiceSeconds / 60),
    poses: [
      {
        pose_id: pose.id,
        name: `${pose.sanskritName} (${pose.englishName})`,
        image: pose.image,
        duration_seconds: practiceSeconds,
        rest_time_seconds: 15,
        instructions: pose.instructions?.[0] || 'Maintain steady posture and deep nasal breathing.',
        safety_tips: pose.precautions?.[0] || 'Keep joints soft and avoid straining.'
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          to="/poses"
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#777D52] hover:text-[#183C2A] transition-colors bg-[#EAE6D8]/60 px-3.5 py-1.5 rounded-xl border border-[#A8B99A]/30"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All 12 Poses</span>
        </Link>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#A8B99A]/40 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
        {/* Devanagari Background Calligraphy Watermark */}
        <div className="absolute right-4 bottom-2 text-8xl font-serif text-[#183C2A]/4 select-none pointer-events-none">
          {pose.sanskritDevanagari}
        </div>

        {/* Large Pose Illustration */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#F7F5EB] to-[#EAE6D8]/60 rounded-3xl p-5 border border-[#A8B99A]/30 aspect-[4/3] flex items-center justify-center overflow-hidden shadow-inner">
          <img
            src={pose.image}
            alt={`${pose.sanskritName} - ${pose.englishName}`}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Title & Metadata Overview */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#244B35] text-[#F7F5EB] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {pose.category}
            </span>
            <span className="bg-[#EAE6D8] text-[#183C2A] text-[10px] font-bold px-3 py-1 rounded-full">
              {pose.difficulty}
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <p className="font-serif text-lg text-[#777D52] font-semibold">
                {pose.sanskritDevanagari ? `${pose.sanskritDevanagari} • ` : ''}
                {pose.sanskritName}
              </p>
              <button
                onClick={() => speakName(pose.sanskritName)}
                className="p-1 rounded-md text-[#777D52] hover:text-[#244B35] hover:bg-[#EAE6D8] transition-colors"
                title="Pronounce Sanskrit Name"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#183C2A] tracking-tight mt-0.5">
              {pose.englishName}
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#183C2A]/85 leading-relaxed font-normal">
            {pose.introduction || pose.shortDescription}
          </p>

          {/* Traditional Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            {pose.duration && (
              <div className="bg-[#F7F5EB] p-3 rounded-2xl border border-[#A8B99A]/30">
                <span className="text-[#777D52] text-[10px] font-bold uppercase block">Hold Time</span>
                <span className="font-bold text-[#183C2A] flex items-center space-x-1 mt-0.5 text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#244B35]" />
                  <span>{pose.duration}</span>
                </span>
              </div>
            )}
            {pose.chakra && (
              <div className="bg-[#F7F5EB] p-3 rounded-2xl border border-[#A8B99A]/30">
                <span className="text-[#777D52] text-[10px] font-bold uppercase block">Primary Cakra</span>
                <span className="font-bold text-[#183C2A] flex items-center space-x-1 mt-0.5 text-xs">
                  <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="truncate">{pose.chakra.split('(')[0]}</span>
                </span>
              </div>
            )}
            {pose.dosha && (
              <div className="bg-[#F7F5EB] p-3 rounded-2xl border border-[#A8B99A]/30 col-span-2 sm:col-span-1">
                <span className="text-[#777D52] text-[10px] font-bold uppercase block">Doṣa Impact</span>
                <span className="font-bold text-[#183C2A] flex items-center space-x-1 mt-0.5 text-xs">
                  <Heart className="w-3.5 h-3.5 text-[#777D52]" />
                  <span className="truncate">{pose.dosha}</span>
                </span>
              </div>
            )}
          </div>

          {/* Practice Duration Selector & Action CTA */}
          <div className="pt-3 border-t border-[#A8B99A]/20 flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-1 bg-[#F7F5EB] p-1 rounded-xl border border-[#A8B99A]/30 text-xs font-semibold">
              {[30, 60, 120].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setPracticeSeconds(sec)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    practiceSeconds === sec ? 'bg-[#244B35] text-white shadow-xs' : 'text-[#777D52] hover:text-[#183C2A]'
                  }`}
                >
                  {sec >= 60 ? `${sec / 60}m` : `${sec}s`}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowTimer(true)}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#244B35] text-[#F7F5EB] font-bold text-xs shadow-md hover:bg-[#183C2A] hover:scale-105 active:scale-95 transition-all border border-[#C5A059]/40"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />
              <span>Practice ({practiceSeconds >= 60 ? `${practiceSeconds / 60} min` : `${practiceSeconds} sec`})</span>
            </button>

            <Link
              to="/routine-generator"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#EAE6D8] text-[#183C2A] font-semibold text-xs hover:bg-[#A8B99A]/40 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#777D52]" />
              <span>Include in Routine</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Sections: Instructions, Significance, Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Step-by-Step Instructions */}
        <div className="md:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-[#A8B99A]/30 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#183C2A] flex items-center space-x-2.5 pb-3 border-b border-[#A8B99A]/20">
            <Compass className="w-5 h-5 text-[#244B35]" />
            <span>Step-by-Step Anatomical Execution</span>
          </h2>
          <ol className="space-y-4">
            {pose.instructions?.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#244B35] text-white flex items-center justify-center font-bold text-xs mt-0.5 shadow-xs">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#183C2A]/85 leading-relaxed pt-0.5 font-normal">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Traditional Significance (IKS) & Beginner Tips */}
        <div className="md:col-span-5 space-y-8">
          {/* Traditional Significance */}
          <div className="bg-[#244B35] text-[#F7F5EB] p-7 rounded-3xl shadow-sm space-y-4 border border-[#C5A059]/30">
            <h3 className="font-serif text-xl font-bold flex items-center space-x-2 text-[#C5A059]">
              <BookOpen className="w-5 h-5" />
              <span>Traditional Significance</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#EAE6D8]/95 leading-relaxed font-normal">
              {pose.traditionalSignificance}
            </p>
          </div>

          {/* Beginner Tips */}
          {pose.beginnerTips?.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-[#A8B99A]/30 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#183C2A] flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-[#C5A059]" />
                <span>Beginner Guidance</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#183C2A]/80">
                {pose.beginnerTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#C5A059] font-bold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Wellness Benefits & Safety Precautions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* General Wellness Benefits */}
        <div className="bg-white p-7 rounded-3xl border border-[#A8B99A]/30 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#183C2A] flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-[#244B35]" />
            <span>General Wellness Benefits</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#183C2A]/85 font-normal">
            {pose.benefits?.map((benefit, idx) => (
              <li key={idx} className="flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#244B35] mt-2 flex-shrink-0"></span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety Precautions & Contraindications */}
        <div className="bg-[#F7F5EB] p-7 rounded-3xl border border-[#A8B99A]/40 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#777D52] flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <span>Safety Precautions & Contraindications</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#183C2A]/85 font-normal">
            {pose.precautions?.map((prec, idx) => (
              <li key={idx} className="flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2 flex-shrink-0"></span>
                <span>{prec}</span>
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-[#777D52] italic pt-2 border-t border-[#A8B99A]/30">
            *Always listen to your body and honor pain thresholds. Never strain or force alignment.
          </p>
        </div>
      </div>

      {/* Related Poses */}
      {relatedPosesData.length > 0 && (
        <div className="space-y-6 pt-4">
          <h3 className="font-serif text-2xl font-bold text-[#183C2A]">
            Related Classical Postures
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosesData.map((rel) => (
              <PoseCard
                key={rel.id}
                pose={rel}
                onQuickView={(p) => setQuickViewPose(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewPose && (
        <PoseQuickViewModal
          pose={quickViewPose}
          onClose={() => setQuickViewPose(null)}
          onPractice={(p) => {
            setQuickViewPose(null);
            setPracticeSeconds(60);
            setShowTimer(true);
          }}
        />
      )}

      {/* Practice Timer Modal */}
      {showTimer && (
        <PracticeTimerModal
          routine={singlePoseRoutine}
          onClose={() => setShowTimer(false)}
        />
      )}
    </div>
  );
};

export default PoseDetail;
