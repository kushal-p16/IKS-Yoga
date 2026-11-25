import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#183C2A] dark:bg-[#07130D] text-[#F7F5EB] border-t border-[#244B35] dark:border-[#C5A059]/30 mt-24 relative overflow-hidden transition-colors duration-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#244B35]/80 dark:border-white/10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#244B35] flex items-center justify-center p-1.5 border border-[#C5A059]/40">
                <img 
                  src="/assets/illustrations/lotus-icon.svg" 
                  alt="YogaVeda AI" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#F7F5EB]">
                  YogaVeda <span className="text-[#C5A059] text-lg">AI</span>
                </span>
                <p className="text-[11px] text-[#A8B99A] tracking-wider uppercase font-medium">
                  Indian Knowledge System
                </p>
              </div>
            </div>
            <p className="text-sm text-[#A8B99A] leading-relaxed">
              "Ancient Wisdom, Modern Wellness"
            </p>
            <p className="text-xs text-[#EAE6D8]/70 leading-relaxed">
              An interactive academic initiative harmonizing timeless Vedic philosophy, Sage Patanjali's Ashtanga traditions, and modern generative AI.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#EAE6D8] mb-4 tracking-wide flex items-center space-x-2">
              <Compass className="w-4 h-4 text-[#C5A059]" />
              <span>Explore YogaVeda</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8B99A]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/poses" className="hover:text-white transition-colors">12 Traditional Poses</Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-white transition-colors">Ask YogaVeda AI</Link>
              </li>
              <li>
                <Link to="/routine-generator" className="hover:text-white transition-colors">Personalized Routines</Link>
              </li>
              <li>
                <Link to="/my-routines" className="hover:text-white transition-colors">Saved Routines & Practice</Link>
              </li>
              <li>
                <Link to="/about-iks" className="hover:text-white transition-colors">Indian Knowledge System</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Traditional IKS Principles */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#EAE6D8] mb-4 tracking-wide flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#C5A059]" />
              <span>IKS Pillars</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#A8B99A] leading-relaxed">
              <li>• <strong>Patanjali Yoga Sutras</strong>: Sthira Sukham Asanam</li>
              <li>• <strong>Eight Limbs (Ashtanga)</strong>: Yama to Samadhi</li>
              <li>• <strong>Hatha Yoga Pradipika</strong>: Nadi & Prana balance</li>
              <li>• <strong>Ayurvedic Synergy</strong>: Tridoshic equilibrium</li>
              <li>• <strong>Daily Sadhana</strong>: Mindfulness & Breath</li>
            </ul>
          </div>

          {/* Col 4: Responsible Disclaimer */}
          <div className="bg-[#244B35]/40 dark:bg-white/5 p-4 rounded-2xl border border-[#A8B99A]/20">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A059] flex items-center space-x-1.5 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Educational Disclaimer</span>
            </h4>
            <p className="text-[11px] text-[#EAE6D8]/80 leading-relaxed">
              YogaVeda AI is strictly an educational tool celebrating India's cultural heritage. It does not provide medical diagnoses, treatment plans, or clinical therapy. Please consult a qualified physician or certified yoga therapist before beginning physical practices.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8B99A]">
          <p>© {new Date().getFullYear()} YogaVeda AI – Indian Knowledge System (IKS) Project. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Crafted with reverence for traditional Indian wisdom</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
