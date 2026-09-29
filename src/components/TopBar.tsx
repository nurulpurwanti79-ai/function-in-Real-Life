import React from 'react';
import { Volume2, VolumeX, Compass, Award } from 'lucide-react';
import { MissionId } from '../types';
import { sound } from '../utils/audio';

interface TopBarProps {
  currentMission: MissionId;
  onNavigate: (mission: MissionId) => void;
  progressPercent: number;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenBadges: () => void;
  unlockedBadgeCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentMission,
  onNavigate,
  progressPercent,
  audioEnabled,
  onToggleAudio,
  onOpenBadges,
  unlockedBadgeCount,
}) => {
  const navItems: { id: MissionId; label: string }[] = [
    { id: 'root-mystery', label: '1. Root Mystery' },
    { id: 'distance-mystery', label: '2. Distance Mystery' },
    { id: 'graph-lab', label: '3. Graph Lab' },
    { id: 'final-mission', label: '4. Robot Track' },
    { id: 'final-boss', label: '5. Final Boss' },
    { id: 'reflection', label: 'Refleksi' },
    { id: 'assessment', label: 'Asesmen' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('map');
          }}
          className="text-base md:text-lg font-bold tracking-tight text-slate-900 hover:text-emerald-600 transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
        >
          Function in Real Life
        </button>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = currentMission === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.id);
                }}
                className={`transition-colors whitespace-nowrap py-1 ${
                  isActive
                    ? 'text-emerald-600 font-bold border-b-2 border-emerald-500'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions & metadata */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Progress text indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span>Investigasi</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-600 font-bold tabular-nums">
              {progressPercent}%
            </span>
          </div>

          {/* Badges action */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBadges();
            }}
            title="Koleksi Lencana"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Lencana</span>
            <span className="font-mono text-amber-700 text-[11px] tabular-nums">({unlockedBadgeCount})</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={() => {
              onToggleAudio();
              sound.playClick();
            }}
            title={audioEnabled ? 'Mute Audio' : 'Aktifkan Suara'}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Mission Map button */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('map');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>Peta Misi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
