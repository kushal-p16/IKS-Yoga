import React, { useState, useEffect } from 'react';
import { Search, Filter, LayoutGrid, List, Sparkles, X, Play, Clock, Zap, ArrowRight, Eye } from 'lucide-react';
import { YOGA_POSES } from '../data/poses';
import { getPoses } from '../services/api';
import PoseCard from '../components/PoseCard';
import PoseQuickViewModal from '../components/PoseQuickViewModal';
import PracticeTimerModal from '../components/PracticeTimerModal';

const ExplorePoses = () => {
  const [poses, setPoses] = useState(YOGA_POSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [loading, setLoading] = useState(false);
  const [quickViewPose, setQuickViewPose] = useState(null);
  const [practiceRoutine, setPracticeRoutine] = useState(null);

  const categories = ['All', 'Standing', 'Balancing', 'Seated', 'Prone', 'Restorative', 'Inversion'];
  const difficulties = ['All', 'Beginner', 'Intermediate'];

  useEffect(() => {
    const fetchFilteredPoses = async () => {
      setLoading(true);
      try {
        const data = await getPoses({
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
          search: searchTerm.trim() || undefined
        });
        setPoses(data);
      } catch (err) {
        console.error('Error fetching poses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredPoses();
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const handlePracticeSingle = (p) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#777D52]">
          Āsana Saṅgraha • 12 Foundational Postures
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#183C2A] tracking-tight">
          Explore Classical Yoga Poses
        </h1>
        <p className="text-sm sm:text-base text-[#183C2A]/80 leading-relaxed font-normal">
          Master the foundational 12 postures of classical Indian Hatha Yoga. Each asana is documented with anatomical instructions, safety precautions, and ancient scriptural significance.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-3xl border border-[#A8B99A]/30 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#777D52]" />
            <input
              type="text"
              placeholder="Search by Sanskrit name, English name, or benefit (e.g. Tadasana, spine)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#F7F5EB]/60 border border-[#A8B99A]/40 text-sm text-[#183C2A] placeholder-[#777D52]/70 focus:outline-none focus:ring-2 focus:ring-[#244B35]/40"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F7F5EB]/60 border border-[#A8B99A]/40 text-xs font-bold text-[#183C2A] focus:outline-none focus:ring-2 focus:ring-[#244B35]/40"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F7F5EB]/60 border border-[#A8B99A]/40 text-xs font-bold text-[#183C2A] focus:outline-none focus:ring-2 focus:ring-[#244B35]/40"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  Difficulty: {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Category Filter Pills & View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#A8B99A]/20">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#777D52] mr-1 uppercase">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#244B35] text-[#F7F5EB] shadow-xs'
                    : 'bg-[#F7F5EB] text-[#183C2A] hover:bg-[#EAE6D8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center space-x-1 bg-[#F7F5EB] p-1 rounded-xl border border-[#A8B99A]/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#244B35] text-white shadow-xs' : 'text-[#777D52] hover:text-[#183C2A]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#244B35] text-white shadow-xs' : 'text-[#777D52] hover:text-[#183C2A]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Poses Count / Active Filter Notice */}
      <div className="flex items-center justify-between text-xs text-[#777D52] px-1">
        <span>Showing <strong>{poses.length}</strong> of 12 Traditional Poses</span>
        {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchTerm) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSearchTerm('');
            }}
            className="text-[#244B35] underline font-bold hover:text-[#183C2A]"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Poses View (Grid or List) */}
      {poses.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {poses.map((pose) => (
              <PoseCard
                key={pose.id}
                pose={pose}
                onQuickView={(p) => setQuickViewPose(p)}
              />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {poses.map((pose) => (
              <div
                key={pose.id}
                className="bg-white rounded-3xl p-5 border border-[#A8B99A]/30 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center space-x-5 flex-1">
                  <div className="w-24 h-24 bg-[#F7F5EB] rounded-2xl border border-[#A8B99A]/30 p-2 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={pose.image}
                      alt={pose.englishName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#777D52] uppercase tracking-wider">
                      {pose.sanskritDevanagari ? `${pose.sanskritDevanagari} • ` : ''}
                      {pose.sanskritName}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#183C2A]">
                      {pose.englishName}
                    </h3>
                    <p className="text-xs text-[#183C2A]/75 line-clamp-2 max-w-xl mt-1 leading-relaxed">
                      {pose.shortDescription}
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-[10px] font-semibold text-[#777D52]">
                      <span className="bg-[#EAE6D8] px-2 py-0.5 rounded-md text-[#244B35]">{pose.category}</span>
                      <span className="bg-[#EAE6D8] px-2 py-0.5 rounded-md">{pose.difficulty}</span>
                      <span>•</span>
                      <span>{pose.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 flex-shrink-0">
                  <button
                    onClick={() => setQuickViewPose(pose)}
                    className="p-2.5 rounded-xl bg-[#F7F5EB] text-[#183C2A] hover:bg-[#EAE6D8] transition-colors"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4 text-[#244B35]" />
                  </button>
                  <button
                    onClick={() => handlePracticeSingle(pose)}
                    className="px-4 py-2.5 rounded-xl bg-[#244B35] text-white hover:bg-[#183C2A] text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#A8B99A]/30 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#EAE6D8] text-[#777D52] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#183C2A]">No Matching Poses Found</h3>
          <p className="text-sm text-[#777D52] max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setSearchTerm('');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#244B35] text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewPose && (
        <PoseQuickViewModal
          pose={quickViewPose}
          onClose={() => setQuickViewPose(null)}
          onPractice={handlePracticeSingle}
        />
      )}

      {/* Practice Timer Modal */}
      {practiceRoutine && (
        <PracticeTimerModal
          routine={practiceRoutine}
          onClose={() => setPracticeRoutine(null)}
        />
      )}
    </div>
  );
};

export default ExplorePoses;
