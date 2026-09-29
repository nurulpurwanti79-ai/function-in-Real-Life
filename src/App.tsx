import React, { useState, useEffect } from 'react';
import { MissionId, Badge } from './types';
import { TopBar } from './components/TopBar';
import { OpeningExperience } from './components/OpeningExperience';
import { MissionMap } from './components/MissionMap';
import { World1RootMystery } from './components/World1RootMystery';
import { World2DistanceMystery } from './components/World2DistanceMystery';
import { World3GraphLab } from './components/World3GraphLab';
import { World4FinalMission } from './components/World4FinalMission';
import { World5FinalBoss } from './components/World5FinalBoss';
import { World6Reflection } from './components/World6Reflection';
import { World7Assessment } from './components/World7Assessment';
import { BadgeModal } from './components/BadgeModal';
import { sound } from './utils/audio';

export default function App() {
  const [currentMission, setCurrentMission] = useState<MissionId>('opening');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);

  // Completed tracking
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({
    'root-mystery': false,
    'distance-mystery': false,
    'graph-lab': false,
    'final-mission': false,
    'final-boss': false,
    'reflection': false,
    'assessment': false,
  });

  // Gamification Badges
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'root-detective',
      title: 'FUNCTION DETECTIVE',
      subtitle: 'Detektif Batas Domain',
      description: 'Berhasil membongkar batas radikan tak-negatif pada perancangan taman persegi.',
      iconName: 'root',
      unlocked: false,
    },
    {
      id: 'distance-pioneer',
      title: 'DISTANCE PIONEER',
      subtitle: 'Penemu Hakikat Jarak',
      description: 'Menemukan bahwa nilai mutlak adalah jarak geometris sejati yang melenyapkan pengaruh arah.',
      iconName: 'distance',
      unlocked: false,
    },
    {
      id: 'graph-master',
      title: 'GRAPH MASTER',
      subtitle: 'Arsitek Transformasi V',
      description: 'Menguasai translasi horizontal dan vertikal pada grafik fungsi f(x) = |x - a| + b.',
      iconName: 'graph',
      unlocked: false,
    },
    {
      id: 'safety-engineer',
      title: 'SAFETY ENGINEER',
      subtitle: 'Pengendali Sistem Otomasi',
      description: 'Menentukan interval toleransi aman robot inspeksi dengan pertidaksamaan nilai mutlak.',
      iconName: 'robot',
      unlocked: false,
    },
    {
      id: 'grand-mathematician',
      title: 'GRAND MATHEMATICIAN',
      subtitle: 'Penakluk Final Boss',
      description: 'Menyatukan dua konsep: nilai mutlak sebagai tameng tak-negatif bagi fungsi irasional.',
      iconName: 'boss',
      unlocked: false,
    },
  ]);

  // Calculate overall progress percentage
  const totalMissions = 7;
  const completedCount = Object.values(completedMissions).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalMissions) * 100));

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => (b.id === badgeId ? { ...b, unlocked: true } : b))
    );
  };

  const markMissionComplete = (missionId: string, badgeId?: string) => {
    setCompletedMissions((prev) => ({ ...prev, [missionId]: true }));
    if (badgeId) {
      unlockBadge(badgeId);
    }
  };

  const handleToggleAudio = () => {
    const nextVal = !audioEnabled;
    setAudioEnabled(nextVal);
    sound.enabled = nextVal;
  };

  const unlockedBadgeCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/25 to-teal-50/30 text-slate-800 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Top Bar is visible everywhere except during the immersive opening sequence */}
      {currentMission !== 'opening' && (
        <TopBar
          currentMission={currentMission}
          onNavigate={(target) => setCurrentMission(target)}
          progressPercent={progressPercent}
          audioEnabled={audioEnabled}
          onToggleAudio={handleToggleAudio}
          onOpenBadges={() => setIsBadgeModalOpen(true)}
          unlockedBadgeCount={unlockedBadgeCount}
        />
      )}

      {/* Main View Area */}
      <main className="flex-1 flex flex-col justify-center">
        {currentMission === 'opening' && (
          <OpeningExperience onStart={() => setCurrentMission('map')} />
        )}

        {currentMission === 'map' && (
          <MissionMap
            onSelectMission={(mission) => setCurrentMission(mission)}
            completedMissions={completedMissions}
            progressPercent={progressPercent}
            badges={badges}
            onOpenBadges={() => setIsBadgeModalOpen(true)}
          />
        )}

        {currentMission === 'root-mystery' && (
          <World1RootMystery
            onComplete={() => markMissionComplete('root-mystery', 'root-detective')}
            onNext={() => setCurrentMission('distance-mystery')}
          />
        )}

        {currentMission === 'distance-mystery' && (
          <World2DistanceMystery
            onComplete={() => markMissionComplete('distance-mystery', 'distance-pioneer')}
            onNext={() => setCurrentMission('graph-lab')}
          />
        )}

        {currentMission === 'graph-lab' && (
          <World3GraphLab
            onComplete={() => markMissionComplete('graph-lab', 'graph-master')}
            onNext={() => setCurrentMission('final-mission')}
          />
        )}

        {currentMission === 'final-mission' && (
          <World4FinalMission
            onComplete={() => markMissionComplete('final-mission', 'safety-engineer')}
            onNext={() => setCurrentMission('final-boss')}
          />
        )}

        {currentMission === 'final-boss' && (
          <World5FinalBoss
            onComplete={() => markMissionComplete('final-boss', 'grand-mathematician')}
            onNext={() => setCurrentMission('reflection')}
          />
        )}

        {currentMission === 'reflection' && (
          <World6Reflection
            onComplete={() => markMissionComplete('reflection')}
            onNext={() => setCurrentMission('assessment')}
          />
        )}

        {currentMission === 'assessment' && (
          <World7Assessment
            onComplete={() => markMissionComplete('assessment')}
            onFinishCourse={() => setIsBadgeModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/90 bg-white/70 backdrop-blur-md py-4 px-6 text-center text-xs text-slate-500 font-sans shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium text-slate-600">Function in Real Life · Kurikulum Matematika SMA Kelas XI</span>
          <span className="text-emerald-700 font-semibold">Problem Based Learning & Pembelajaran Mendalam</span>
        </div>
      </footer>

      {/* Gamification Badge Modal */}
      <BadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        badges={badges}
        progressPercent={progressPercent}
      />
    </div>
  );
}
