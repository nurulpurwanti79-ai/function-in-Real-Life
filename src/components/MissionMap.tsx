import React from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Layers, 
  Activity, 
  Bot, 
  Flame, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { MissionId, Badge } from '../types';
import { sound } from '../utils/audio';

interface MissionMapProps {
  onSelectMission: (mission: MissionId) => void;
  completedMissions: Record<string, boolean>;
  progressPercent: number;
  badges: Badge[];
  onOpenBadges: () => void;
}

export const MissionMap: React.FC<MissionMapProps> = ({
  onSelectMission,
  completedMissions,
  progressPercent,
  badges,
  onOpenBadges,
}) => {
  const missions = [
    {
      id: 'root-mystery' as MissionId,
      number: '01',
      title: 'Root Mystery',
      subtitle: 'Kenapa tidak semua angka bisa masuk?',
      description: 'Kasus perancangan taman persegi sekolah: menemukan batas radikan pada s(x) = √(x + 4).',
      tag: 'Fungsi Irasional',
      icon: Layers,
      cardBg: 'from-emerald-50/80 via-white to-teal-50/50',
      borderStyle: 'border-emerald-200 hover:border-emerald-400',
      iconBg: 'bg-emerald-100 text-emerald-700',
      badgeId: 'root-detective',
    },
    {
      id: 'distance-mystery' as MissionId,
      number: '02',
      title: 'Distance Mystery',
      subtitle: 'Siapa yang lebih jauh dari sekolah?',
      description: 'Garis bilangan interaktif: menemukan esensi nilai mutlak sebagai jarak tanpa memedulikan arah.',
      tag: 'Nilai Mutlak Dasar',
      icon: Activity,
      cardBg: 'from-sky-50/80 via-white to-cyan-50/50',
      borderStyle: 'border-sky-200 hover:border-sky-400',
      iconBg: 'bg-sky-100 text-sky-700',
      badgeId: 'distance-pioneer',
    },
    {
      id: 'graph-lab' as MissionId,
      number: '03',
      title: 'Graph Lab',
      subtitle: 'Apa yang dilakukan a dan b?',
      description: 'Laboratorium visual fungsi f(x) = |x - a| + b: translasi horizontal, pergeseran vertikal, dan titik balik.',
      tag: 'Transformasi Grafik',
      icon: Compass,
      cardBg: 'from-indigo-50/80 via-white to-blue-50/50',
      borderStyle: 'border-indigo-200 hover:border-indigo-400',
      iconBg: 'bg-indigo-100 text-indigo-700',
      badgeId: 'graph-master',
    },
    {
      id: 'final-mission' as MissionId,
      number: '04',
      title: 'Final Mission: Robot Track',
      subtitle: 'Menjaga robot tetap di zona aman',
      description: 'Aplikasi pertidaksamaan nilai mutlak |x - 4| ≤ 3 pada lintasan sensor robotik.',
      tag: 'Pertidaksamaan Mutlak',
      icon: Bot,
      cardBg: 'from-amber-50/80 via-white to-orange-50/50',
      borderStyle: 'border-amber-200 hover:border-amber-400',
      iconBg: 'bg-amber-100 text-amber-700',
      badgeId: 'safety-engineer',
    },
    {
      id: 'final-boss' as MissionId,
      number: '05',
      title: 'Final Boss: Dua Konsep Bersatu',
      subtitle: 'Misteri fungsi gabungan f(x) = √|x - 4|',
      description: 'Ketika fungsi irasional dilindungi oleh tameng nilai mutlak: sintesis domain seluruh bilangan real.',
      tag: 'Sintesis Tertinggi',
      icon: Flame,
      cardBg: 'from-purple-50/80 via-white to-rose-50/50',
      borderStyle: 'border-purple-200 hover:border-purple-400',
      iconBg: 'bg-purple-100 text-purple-700',
      badgeId: 'grand-mathematician',
    },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>Peta Penyelidikan Matematika</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mission Investigation Map
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-xl">
            Pilihlah stasiun penyelidikan untuk mengeksplorasi fenomena, menguji hipotesis, dan menemukan rahasia di balik fungsi.
          </p>
        </div>

        {/* Status card */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm shrink-0">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Total Kemajuan</div>
            <div className="text-xl font-bold font-mono text-emerald-600 tabular-nums">
              {progressPercent}% Selesai
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <button
            onClick={() => {
              sound.playClick();
              onOpenBadges();
            }}
            className="flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs font-bold text-amber-800 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{unlockedCount} / {badges.length} Lencana</span>
          </button>
        </div>
      </div>

      {/* Progress Timeline Bar */}
      <div className="relative mb-12 hidden md:block">
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-slate-200 rounded-full" />
        <div
          className="absolute top-1/2 left-6 -translate-y-1/2 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(progressPercent, 94)}%` }}
        />
        <div className="relative flex justify-between">
          {missions.map((m) => {
            const isDone = completedMissions[m.id];
            return (
              <button
                key={m.id}
                onClick={() => {
                  sound.playClick();
                  onSelectMission(m.id);
                }}
                className="group flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-4 ring-emerald-100'
                      : 'bg-white border-2 border-slate-200 text-slate-700 group-hover:border-emerald-500 group-hover:text-emerald-700 shadow-xs'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-6 h-6" /> : m.number}
                </div>
                <span className="mt-2 text-xs font-bold text-slate-600 group-hover:text-emerald-700">
                  {m.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {missions.map((m) => {
          const isDone = completedMissions[m.id];
          const Icon = m.icon;

          return (
            <div
              key={m.id}
              className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between bg-gradient-to-br ${m.cardBg} border ${m.borderStyle} shadow-sm hover:shadow-md`}
            >
              <div>
                {/* Top header on card */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs ${m.iconBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-slate-500 font-bold">{m.number}</span>
                      <h3 className="text-base font-bold text-slate-900 tracking-tight">{m.title}</h3>
                    </div>
                  </div>

                  {isDone && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg shadow-2xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Tuntas
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-800 mb-2">
                  {m.subtitle}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {m.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  {m.tag}
                </span>

                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectMission(m.id);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-slate-100 text-emerald-800 hover:bg-slate-200 border border-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow'
                  }`}
                >
                  <span>{isDone ? 'Buka Kembali' : 'Investigasi'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Capstone Stops: Refleksi & Asesmen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Reflection Card */}
        <div className="glass-panel border-teal-200/80 p-6 rounded-3xl flex flex-col justify-between bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/40 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-xs">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs text-teal-700 font-bold">REFLEKSI</span>
                <h3 className="text-lg font-bold text-slate-900">Take a Moment</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Ruang hening untuk merefleksikan perubahan cara pandangmu terhadap konsep matematika, dari "hanya rumus abstrak" menjadi "alat memahami kenyataan".
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onSelectMission('reflection');
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white hover:bg-teal-50 text-teal-800 text-xs font-bold rounded-xl border border-teal-300 shadow-2xs transition-colors"
          >
            <span>Buka Refleksi Diri</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
          </button>
        </div>

        {/* Assessment Card */}
        <div className="glass-panel border-amber-200/80 p-6 rounded-3xl flex flex-col justify-between bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs text-amber-700 font-bold">ASESMEN</span>
                <h3 className="text-lg font-bold text-slate-900">Uji Kemampuan (10 Soal)</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              10 tantangan interaktif berbobot dengan sistem bantuan bertingkat (Hint 1, Hint 2, dan Pembahasan Konseptual) untuk menguji penguasaanmu.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onSelectMission('assessment');
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            <span>Mulai Uji Pemahaman</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
