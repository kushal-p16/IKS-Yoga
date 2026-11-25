import React from 'react';
import { Link } from 'react-router-dom';
import { X, Play, ArrowRight, Clock, Zap, Heart, ShieldAlert, CheckCircle2 } from 'lucide-react';

const PoseQuickViewModal = ({ pose, onClose, onPractice }) => {
  if (!pose) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#112A1D]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#F7F5EB] rounded-3xl max-w-2xl w-full border border-[#A8B99A]/40 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#244B35] text-[#F7F5EB] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
              {pose.sanskritDevanagari} • {pose.category}
            </span>
            <h3 className="font-serif text-lg font-bold text-white">
              {pose.englishName} ({pose.sanskritName})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#F7F5EB]/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-2xl border border-[#A8B99A]/30 p-2 flex-shrink-0 flex items-center justify-center">
              <img
                src={pose.image}
                alt={pose.englishName}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-2 flex-1">
              <p className="text-xs sm:text-sm text-[#183C2A]/85 leading-relaxed">
                {pose.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 text-xs pt-2">
                <span className="bg-[#EAE6D8] px-2.5 py-1 rounded-lg text-[#244B35] font-semibold flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{pose.duration}</span>
                </span>
                <span className="bg-[#EAE6D8] px-2.5 py-1 rounded-lg text-[#777D52] font-semibold flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{pose.chakra?.split('(')[0]}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Steps */}
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-[#A8B99A]/30">
            <h4 className="font-serif text-sm font-bold text-[#183C2A] flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#244B35]" />
              <span>Key Alignment Steps</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-[#183C2A]/80">
              {pose.instructions?.slice(0, 3).map((inst, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#244B35] font-bold mt-0.5">•</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Precautions */}
          {pose.precautions?.length > 0 && (
            <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span><strong>Precaution:</strong> {pose.precautions[0]}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#EAE6D8]/80 border-t border-[#A8B99A]/30 flex items-center justify-between gap-3">
          <Link
            to={`/pose/${pose.id}`}
            onClick={onClose}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#244B35] hover:text-[#183C2A]"
          >
            <span>View Full Details & Scriptures</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => {
              onClose();
              if (onPractice) onPractice(pose);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#244B35] text-white font-bold text-xs shadow-md hover:bg-[#183C2A] transition-all flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />
            <span>Practice Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PoseQuickViewModal;
