import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Zap, Eye } from 'lucide-react';

const PoseCard = ({ pose, onQuickView }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#A8B99A]/30 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full relative">
      {/* Pose Visual Asset */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-[#F7F5EB] to-[#EAE6D8]/60 overflow-hidden border-b border-[#A8B99A]/20">
        <img
          src={pose.image}
          alt={`${pose.sanskritName} - ${pose.englishName}`}
          className="w-full h-full object-contain p-2.5 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-[#183C2A]/90 backdrop-blur-sm text-[#F7F5EB] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {pose.category}
        </div>

        {/* Difficulty Pill */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#244B35] border border-[#A8B99A]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          {pose.difficulty}
        </div>

        {/* Quick View Hover Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(pose);
            }}
            className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-white/90 hover:bg-white text-[#183C2A] shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Quick View Pose"
          >
            <Eye className="w-4 h-4 text-[#244B35]" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Sanskrit & English Names */}
          <div className="mb-2">
            <span className="text-[11px] font-bold text-[#777D52] tracking-wider uppercase">
              {pose.sanskritDevanagari ? `${pose.sanskritDevanagari} • ` : ''}
              {pose.sanskritName}
            </span>
            <h3 className="font-serif text-xl font-bold text-[#183C2A] group-hover:text-[#244B35] transition-colors mt-0.5">
              {pose.englishName}
            </h3>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#183C2A]/75 line-clamp-3 mb-4 leading-relaxed font-normal">
            {pose.shortDescription}
          </p>

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[10px] font-semibold text-[#777D52]">
            {pose.duration && (
              <span className="inline-flex items-center space-x-1 bg-[#F7F5EB] px-2.5 py-1 rounded-lg border border-[#A8B99A]/30">
                <Clock className="w-3 h-3 text-[#244B35]" />
                <span>{pose.duration}</span>
              </span>
            )}
            {pose.chakra && (
              <span className="inline-flex items-center space-x-1 bg-[#F7F5EB] px-2.5 py-1 rounded-lg border border-[#A8B99A]/30">
                <Zap className="w-3 h-3 text-[#C5A059]" />
                <span className="truncate max-w-[130px]">{pose.chakra.split('(')[0]}</span>
              </span>
            )}
          </div>
        </div>

        {/* View Details Action */}
        <Link
          to={`/pose/${pose.id}`}
          className="mt-2 w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#F7F5EB] text-[#244B35] group-hover:bg-[#244B35] group-hover:text-[#F7F5EB] font-bold text-xs transition-all duration-200 border border-[#A8B99A]/40 group-hover:border-[#244B35] shadow-xs"
        >
          <span>View Detailed Guide</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default PoseCard;
