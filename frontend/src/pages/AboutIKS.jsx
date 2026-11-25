import React from 'react';
import { BookOpen, Compass, ShieldCheck, Sun, Sparkles, Award, Scroll, CheckCircle2 } from 'lucide-react';
import AshtangaMandala from '../components/AshtangaMandala';

const AboutIKS = () => {
  const historicalEras = [
    {
      period: "Vedic Period (~1500–1000 BCE)",
      title: "Origins in Rigveda & Yajurveda",
      desc: "The earliest references to yoking mental focus and communion with cosmic order (Rta) emerge in the hymns of the Rigveda. The term 'Yoga' was used metaphorically to describe disciplining the senses."
    },
    {
      period: "Upanishadic Period (~800–500 BCE)",
      title: "Philosophy of Self-Realization",
      desc: "The Katha, Maitri, and Shvetashvatara Upanishads formulate Yoga as an interiorized journey, defining it as the holding steady of the senses and mind to realize Atman (the True Self)."
    },
    {
      period: "Epic & Classical Period (~400 BCE–400 CE)",
      title: "The Bhagavad Gita & Patanjali's Yoga Sutras",
      desc: "The Bhagavad Gita articulates Karma Yoga (selfless action), Bhakti Yoga (devotion), and Jnana Yoga (knowledge). Sage Patanjali systematically codified the 196 Yoga Sutras, establishing Classical Raja Yoga."
    },
    {
      period: "Medieval Hatha Yoga Era (~900–1600 CE)",
      title: "The Physical Alchemy of Prana",
      desc: "Masters like Gorakshanatha and Svatmarama authored the Hatha Yoga Pradipika and Gheranda Samhita, emphasizing asana purification, bandhas, mudras, and shat-karmas to prepare the body for Samadhi."
    },
    {
      period: "Modern Synthesis (1893–Present)",
      title: "Global Renaissance & Scientific Validation",
      desc: "Beginning with Swami Vivekananda's address at the Parliament of Religions (1893) and teachers like Krishnamacharya and B.K.S. Iyengar, yoga transformed into a global wellness science now recognized internationally."
    }
  ];

  const texts = [
    {
      title: "Patanjali's Yoga Sutras",
      period: "circa 400 CE",
      focus: "Mind psychology, Raja Yoga, 8 Limbs, Chitta Vritti Nirodha",
      significance: "The definitive philosophical text defining yoga as the cessation of mental fluctuations."
    },
    {
      title: "Hatha Yoga Pradipika",
      period: "circa 15th Century (Swami Svatmarama)",
      focus: "Asanas, Pranayama, Kumbhaka, Mudras, Nadanusandhana",
      significance: "The primary manual establishing the bodily practices that form the basis of modern posture routines."
    },
    {
      title: "Gheranda Samhita",
      period: "circa 17th Century",
      focus: "Saptanga Yoga (7-fold path), 32 core asanas, cleansing kriyas",
      significance: "An encyclopedia of yogic purification and anatomical therapeutics."
    },
    {
      title: "Bhagavad Gita",
      period: "circa 400–200 BCE",
      focus: "Karma, Bhakti, and Jnana Yoga; equanimity amidst action",
      significance: "Articulates 'Yogah Karmasu Kaushalam' — Yoga is skill and mindfulness in action."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAE6D8] dark:bg-white/10 border border-[#A8B99A]/50 text-xs font-bold text-[#244B35] dark:text-[#E6CA85] uppercase tracking-wide">
          <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Indian Knowledge System (IKS) Monograph</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#183C2A] dark:text-white tracking-tight">
          The Sacred Heritage of Indian Yoga
        </h1>
        <p className="text-sm sm:text-base text-[#183C2A]/80 dark:text-[#A8B99A] leading-relaxed">
          An educational exploration into the roots, textual milestones, and enduring philosophies of India's preeminent contribution to global human consciousness.
        </p>
      </div>

      {/* 1. What is the Indian Knowledge System (IKS)? */}
      <div className="bg-white dark:bg-[#112A1D] rounded-3xl p-6 sm:p-10 border border-[#A8B99A]/30 dark:border-[#C5A059]/20 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 pb-3 border-b border-[#A8B99A]/20 dark:border-white/10">
          <div className="w-10 h-10 rounded-2xl bg-[#244B35] text-[#C5A059] flex items-center justify-center font-serif font-bold text-lg border border-[#C5A059]/40">
            IKS
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#183C2A] dark:text-white">
              Understanding the Indian Knowledge System
            </h2>
            <p className="text-xs text-[#777D52] dark:text-[#A8B99A]">An integrated worldview of empirical observation and inner inquiry</p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#183C2A]/85 dark:text-[#EAE6D8] leading-relaxed">
          The <strong>Indian Knowledge System (IKS)</strong> encompasses millennia of systematically accumulated epistemological, scientific, philosophical, astronomical, linguistic, and medicinal traditions originating across the Indian subcontinent. Rather than dividing human inquiry into rigid silos of material science and spiritual dogma, IKS approaches existence holistically.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#F7F5EB] dark:bg-[#183C2A] p-4 rounded-2xl border border-[#A8B99A]/30 dark:border-white/10">
            <h4 className="font-serif text-sm font-bold text-[#244B35] dark:text-[#E6CA85]">Darshana (Worldview)</h4>
            <p className="text-xs text-[#183C2A]/75 dark:text-[#A8B99A] mt-1 leading-relaxed">
              Yoga is one of the six classical Shad-Darshanas, complementary to Sankhya, Nyaya, Vaisheshika, Mimamsa, and Vedanta.
            </p>
          </div>
          <div className="bg-[#F7F5EB] dark:bg-[#183C2A] p-4 rounded-2xl border border-[#A8B99A]/30 dark:border-white/10">
            <h4 className="font-serif text-sm font-bold text-[#244B35] dark:text-[#E6CA85]">Ayurvedic Symbiosis</h4>
            <p className="text-xs text-[#183C2A]/75 dark:text-[#A8B99A] mt-1 leading-relaxed">
              While Ayurveda focuses on the healing of physical disease (Chikitsa), Yoga refines the inner mind toward spiritual liberation (Moksha).
            </p>
          </div>
          <div className="bg-[#F7F5EB] dark:bg-[#183C2A] p-4 rounded-2xl border border-[#A8B99A]/30 dark:border-white/10">
            <h4 className="font-serif text-sm font-bold text-[#244B35] dark:text-[#E6CA85]">Textual Rigor</h4>
            <p className="text-xs text-[#183C2A]/75 dark:text-[#A8B99A] mt-1 leading-relaxed">
              Traditions were preserved through precise oral mnemonic techniques (Sutra form) and verified experiential practice (Pratyaksha Pramana).
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Ashtanga Mandala Component */}
      <AshtangaMandala />

      {/* 3. Chronological Evolution of Yoga */}
      <div className="bg-white dark:bg-[#112A1D] rounded-3xl p-6 sm:p-10 border border-[#A8B99A]/30 dark:border-[#C5A059]/20 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#777D52] dark:text-[#A8B99A]">
            Historical Chronology
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#183C2A] dark:text-white mt-1">
            Historical Evolution of Yoga Traditions
          </h2>
          <p className="text-xs sm:text-sm text-[#183C2A]/75 dark:text-[#A8B99A] mt-1 leading-relaxed">
            From poetic Indus-Saraswati spiritual seals to classical codification and global integration.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#A8B99A]/40 space-y-8">
          {historicalEras.map((era, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#244B35] text-white flex items-center justify-center font-bold text-xs border-4 border-white dark:border-[#112A1D] shadow-sm">
                {idx + 1}
              </div>

              <div className="bg-[#F7F5EB]/60 dark:bg-[#183C2A]/70 p-5 rounded-2xl border border-[#A8B99A]/30 dark:border-white/10 space-y-2">
                <span className="text-xs font-bold text-[#777D52] dark:text-[#C5A059] uppercase tracking-wider">
                  {era.period}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#183C2A] dark:text-white">
                  {era.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#183C2A]/80 dark:text-[#EAE6D8] leading-relaxed">
                  {era.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Primary Classical Treatises */}
      <div className="bg-white dark:bg-[#112A1D] rounded-3xl p-6 sm:p-10 border border-[#A8B99A]/30 dark:border-[#C5A059]/20 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#777D52] dark:text-[#A8B99A]">
            Authoritative Treatises
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#183C2A] dark:text-white mt-1">
            Canonical Primary Sources
          </h2>
          <p className="text-xs sm:text-sm text-[#183C2A]/75 dark:text-[#A8B99A] mt-1">
            Verified Indian manuscripts defining asanas, meditation, and spiritual psychology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {texts.map((t, idx) => (
            <div key={idx} className="bg-[#F7F5EB] dark:bg-[#183C2A] p-5 rounded-2xl border border-[#A8B99A]/30 dark:border-white/10 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#777D52] dark:text-[#A8B99A]">
                  <span className="font-bold text-[#244B35] dark:text-[#E6CA85]">{t.period}</span>
                  <Scroll className="w-4 h-4 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#183C2A] dark:text-white mt-1">
                  {t.title}
                </h3>
                <p className="text-xs text-[#183C2A]/80 dark:text-[#EAE6D8] mt-1 leading-relaxed">
                  <strong>Core Focus:</strong> {t.focus}
                </p>
              </div>
              <p className="text-xs text-[#777D52] dark:text-[#A8B99A] italic pt-2 border-t border-[#A8B99A]/20 dark:border-white/10">
                "{t.significance}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Traditional Philosophy vs Modern Misconceptions */}
      <div className="bg-[#EAE6D8]/80 dark:bg-[#183C2A] rounded-3xl p-6 sm:p-10 border border-[#A8B99A]/40 dark:border-[#C5A059]/30 space-y-6">
        <h2 className="font-serif text-2xl font-bold text-[#183C2A] dark:text-white">
          Distinguishing Traditional Teaching from Modern Exercise Trends
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#A8B99A]/40 text-[#244B35] dark:text-[#E6CA85]">
                <th className="py-3 px-4 font-bold font-serif text-base">Dimension</th>
                <th className="py-3 px-4 font-bold font-serif text-base">Traditional IKS Yoga</th>
                <th className="py-3 px-4 font-bold font-serif text-base">Commercial Fitness Perception</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A8B99A]/30 text-[#183C2A]/85 dark:text-[#EAE6D8]">
              <tr>
                <td className="py-3.5 px-4 font-semibold">Ultimate Aim</td>
                <td className="py-3.5 px-4">Liberation (Moksha) & quietude of mind (Chitta Vritti Nirodha)</td>
                <td className="py-3.5 px-4">Calorie burn, flexibility aesthetics, and muscle toning</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Role of Posture</td>
                <td className="py-3.5 px-4">A steady seat (Sthira Sukham) to facilitate deep meditation</td>
                <td className="py-3.5 px-4">High-intensity acrobatics and aggressive stretching</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Breath (Pranayama)</td>
                <td className="py-3.5 px-4">Vital subtle energy control balancing subtle Nadis</td>
                <td className="py-3.5 px-4">Secondary physical pacing or ignored</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold">Ethical Core</td>
                <td className="py-3.5 px-4">Grounded strictly in Ahimsa, truthfulness, and non-greed</td>
                <td className="py-3.5 px-4">Rarely addressed outside studio branding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Scholarly References */}
      <div className="text-xs text-[#777D52] dark:text-[#A8B99A] p-6 bg-white dark:bg-[#112A1D] rounded-2xl border border-[#A8B99A]/30 dark:border-white/10 space-y-2">
        <p className="font-bold uppercase tracking-wider text-[#183C2A] dark:text-white">Selected Scholarly & Canonical References:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Bryant, Edwin F. (2009). <em>The Yoga Sutras of Patañjali: A New Edition, Translation, and Commentary</em>. North Point Press.</li>
          <li>Mallinson, James & Singleton, Mark (2017). <em>Roots of Yoga</em>. Penguin Classics.</li>
          <li>Svatmarama (trans. Pancham Sinh, 1914). <em>Hatha Yoga Pradipika</em>. Sacred Books of the Hindus.</li>
          <li>Ministry of Ayush, Government of India. <em>Yoga Protocol for Harmony & Peace</em>.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutIKS;
