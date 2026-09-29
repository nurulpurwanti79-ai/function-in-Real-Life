import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface OpeningExperienceProps {
  onStart: () => void;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ onStart }) => {
  const [step, setStep] = useState<number>(0);
  const words = ['JARAK.', 'POSISI.', 'UKURAN.', 'BATAS.', 'KEPUTUSAN.'];

  useEffect(() => {
    // Stage 0: Sequential single words
    const timer1 = setTimeout(() => setStep(1), 600); // JARAK
    const timer2 = setTimeout(() => setStep(2), 1400); // POSISI
    const timer3 = setTimeout(() => setStep(3), 2200); // UKURAN
    const timer4 = setTimeout(() => setStep(4), 3000); // BATAS
    const timer5 = setTimeout(() => setStep(5), 3800); // KEPUTUSAN
    const timer6 = setTimeout(() => setStep(6), 4800); // Menurutmu apa hubungan...
    const timer7 = setTimeout(() => setStep(7), 6500); // Matematika tidak selalu terlihat...
    const timer8 = setTimeout(() => setStep(8), 8000); // Unveil full hero!

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(timer8);
    };
  }, []);

  const handleSkipOrStart = () => {
    sound.playDiscovery();
    onStart();
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/20 to-teal-50/30 p-6">
      {/* Background Animated Math Grid & Floating Shapes */}
      <div 
        className={`absolute inset-0 math-grid-pattern transition-opacity duration-1000 ${
          step >= 7 ? 'opacity-70' : 'opacity-30'
        }`} 
      />

      {/* Ambient soft pastel colorful gradient glows */}
      <div 
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-200/50 blur-3xl pointer-events-none transition-opacity duration-1000 ${
          step >= 8 ? 'opacity-80' : 'opacity-40'
        }`}
      />
      <div 
        className={`absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sky-200/50 blur-3xl pointer-events-none transition-opacity duration-1000 ${
          step >= 8 ? 'opacity-80' : 'opacity-40'
        }`}
      />
      <div 
        className={`absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-amber-100/50 blur-3xl pointer-events-none transition-opacity duration-1000 ${
          step >= 8 ? 'opacity-70' : 'opacity-0'
        }`}
      />

      {/* Floating mathematical glyphs in soft colorful pastel */}
      {step >= 8 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <span className="absolute top-[16%] left-[10%] text-3xl font-mono text-emerald-600/20 font-bold">√x</span>
          <span className="absolute top-[24%] right-[12%] text-2xl font-mono text-sky-600/25 font-bold">|x|</span>
          <span className="absolute bottom-[20%] left-[16%] text-xl font-mono text-teal-600/20 font-bold">f(x) ≥ 0</span>
          <span className="absolute bottom-[24%] right-[18%] text-2xl font-mono text-amber-600/20 font-bold">d(x, 0)</span>
        </div>
      )}

      {/* Skip button during intro sequence */}
      {step < 8 && (
        <button
          onClick={() => {
            sound.playClick();
            setStep(8);
          }}
          className="absolute top-6 right-6 text-xs text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-3.5 bg-white/80 border border-slate-200 rounded-lg shadow-xs hover:border-slate-300 font-medium"
        >
          Lewati Intro →
        </button>
      )}

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center">
        {/* Stage 1 to 5: Sequential words */}
        {step < 8 && (
          <div className="min-h-[280px] flex flex-col items-center justify-center">
            {step < 6 && (
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 mb-8">
                {words.map((word, idx) => {
                  const isVisible = step >= idx + 1;
                  return (
                    <span
                      key={word}
                      className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-widest transition-all duration-700 ${
                        isVisible
                          ? 'opacity-100 translate-y-0 text-slate-800'
                          : 'opacity-0 translate-y-4 text-slate-300'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            )}

            {step >= 6 && step < 7 && (
              <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 font-light tracking-wide max-w-xl animate-fade-in">
                "Menurutmu, apa hubungan semuanya dengan matematika?"
              </p>
            )}

            {step >= 7 && (
              <div className="space-y-4 max-w-2xl animate-fade-in">
                <p className="text-lg sm:text-xl text-slate-500 font-normal">
                  "Menurutmu, apa hubungan semuanya dengan matematika?"
                </p>
                <p className="text-2xl sm:text-3xl text-emerald-700 font-bold tracking-wide">
                  "Matematika tidak selalu terlihat seperti matematika."
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stage 8: Unveiled Main Title & Experience Card */}
        {step >= 8 && (
          <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl w-full max-w-2xl relative overflow-hidden animate-fade-in">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />

            <div className="mb-3 text-xs tracking-wider uppercase font-bold text-emerald-700 flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Multimedia Pembelajaran Interaktif · Matematika Kelas XI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 text-balance">
              FUNCTION IN REAL LIFE
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium mb-8 max-w-lg mx-auto text-balance">
              "Menemukan Matematika yang Tersembunyi di Sekitar Kita"
            </p>

            {/* Soft colorful teaser cards */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-left">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 shadow-xs">
                <div className="text-emerald-800 font-mono font-bold text-xs sm:text-sm mb-1">01. FUNGSI IRASIONAL</div>
                <div className="text-xs text-emerald-700/80 leading-relaxed">Menemukan batasan fisik, domain terdefinisi, dan misteri akar kuadrat.</div>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 shadow-xs">
                <div className="text-sky-800 font-mono font-bold text-xs sm:text-sm mb-1">02. NILAI MUTLAK</div>
                <div className="text-xs text-sky-700/80 leading-relaxed">Jarak tanpa arah, translasi grafik, dan toleransi zona aman nyata.</div>
              </div>
            </div>

            {/* Launch button */}
            <button
              onClick={handleSkipOrStart}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>MULAI INVESTIGASI</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
