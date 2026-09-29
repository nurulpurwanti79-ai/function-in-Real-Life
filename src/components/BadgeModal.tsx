import React from 'react';
import { 
  Award, 
  X, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Layers, 
  Activity, 
  Compass, 
  Bot, 
  Flame, 
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../types';
import { sound } from '../utils/audio';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  progressPercent: number;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({
  isOpen,
  onClose,
  badges,
  progressPercent,
}) => {
  if (!isOpen) return null;

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'root':
        return <Layers className="w-5 h-5 text-emerald-600" />;
      case 'distance':
        return <Activity className="w-5 h-5 text-sky-600" />;
      case 'graph':
        return <Compass className="w-5 h-5 text-indigo-600" />;
      case 'robot':
        return <Bot className="w-5 h-5 text-amber-600" />;
      case 'boss':
        return <Flame className="w-5 h-5 text-purple-600" />;
      default:
        return <Award className="w-5 h-5 text-emerald-600" />;
    }
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const isAllUnlocked = unlockedCount === badges.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-fade-in">
      <div className="bg-white/95 rounded-3xl p-6 sm:p-8 relative border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Koleksi Lencana Penyelidik
            </h2>
            <p className="text-xs text-slate-500 font-mono font-medium">
              Terbuka {unlockedCount} dari {badges.length} Penghargaan Eksplorasi
            </p>
          </div>
        </div>

        {/* 100% Complete Banner */}
        {isAllUnlocked && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-300 mb-6 flex items-start gap-3 shadow-xs">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700">
              <strong className="text-emerald-900 block font-sans text-sm mb-0.5 font-bold">
                MISSION COMPLETE!
              </strong>
              "You didn't just learn a function. You discovered why it matters."
              <br />
              Kamu telah membuktikan bahwa matematika adalah bahasa penalaran yang menghubungkan realitas fisik dengan abstraksi murni.
            </div>
          </div>
        )}

        {/* Badges List */}
        <div className="space-y-3 mb-6">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  badge.unlocked
                    ? 'bg-emerald-50/50 border-emerald-300 text-slate-800 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    badge.unlocked ? 'bg-white shadow-xs border border-emerald-200' : 'bg-slate-200/80'
                  }`}
                >
                  {badge.unlocked ? getBadgeIcon(badge.iconName) : <Lock className="w-4 h-4 text-slate-400" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-bold tracking-tight ${badge.unlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                      {badge.title}
                    </h4>
                    {badge.unlocked && (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Terbuka
                      </span>
                    )}
                  </div>
                  <div className={`text-xs font-semibold mb-1 ${badge.unlocked ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {badge.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Card for Student */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-sky-50 to-emerald-50 border border-teal-200 text-center font-mono space-y-1 shadow-2xs">
          <div className="text-[10px] text-teal-800 uppercase tracking-widest font-bold">
            PORTFOLIO PEMBELAJARAN MATEMATIKA SMA KELAS XI
          </div>
          <div className="text-sm font-bold text-slate-900 font-sans">
            FUNCTION IN REAL LIFE
          </div>
          <div className="text-xs text-emerald-700 font-bold">
            Status: {progressPercent}% Eksplorasi Selesai
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
