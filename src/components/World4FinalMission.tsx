import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Bot,
  Radio,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { sound } from '../utils/audio';

interface World4Props {
  onComplete: () => void;
  onNext: () => void;
}

export const World4FinalMission: React.FC<World4Props> = ({ onComplete, onNext }) => {
  const [robotPos, setRobotPos] = useState<number>(4);
  const beaconPos = 4;
  const maxSafeDistance = 3;

  // Real-time calculation
  const currentDistance = Math.abs(robotPos - beaconPos);
  const isSafe = currentDistance <= maxSafeDistance;

  // Formative challenge input
  const [minSafeInput, setMinSafeInput] = useState<string>('');
  const [maxSafeInput, setMaxSafeInput] = useState<string>('');
  const [hasSolvedChallenge, setHasSolvedChallenge] = useState<boolean>(false);
  const [challengeError, setChallengeError] = useState<string | null>(null);

  const handleSliderMove = (pos: number) => {
    setRobotPos(pos);
    if (Math.abs(pos - beaconPos) <= maxSafeDistance) {
      sound.playTick();
    } else {
      sound.playError();
    }
  };

  const handleVerifyZone = () => {
    const minVal = parseFloat(minSafeInput);
    const maxVal = parseFloat(maxSafeInput);

    if (minVal === 1 && maxVal === 7) {
      sound.playDiscovery();
      setHasSolvedChallenge(true);
      setChallengeError(null);
      onComplete();
    } else {
      sound.playError();
      setChallengeError('Rentang belum tepat. Perhatikan posisi robot saat status beralih tepat dari AMAN ke DI LUAR ZONA AMAN.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Kicker */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold">
          <span>04</span>
          <span aria-hidden="true">·</span>
          <span>FINAL MISSION</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500 font-sans font-medium">Pertidaksamaan Nilai Mutlak Real-Life</span>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-200 shadow-sm bg-white/95">
        
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>Misi Operasi Robotika Lapangan</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Robot Track: Zona Aman Pengisian Nirkabel</h2>
            <p className="text-xs text-slate-600">
              Sebuah robot inspeksi bergerak di atas lintasan rel. Menara pengisian nirkabel (beacon) berada di titik x = 4 meter.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 font-mono text-xs text-amber-900 shadow-2xs">
            Kriteria Jarak Maksimal: <span className="text-amber-800 font-bold">|x - 4| ≤ 3 m</span>
          </div>
        </div>

        {/* Robot Simulation Stage */}
        <div className="bg-gradient-to-r from-amber-50/40 via-white to-emerald-50/40 rounded-2xl p-6 border border-slate-200 relative overflow-hidden mb-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-8">
            <span className="text-xs text-slate-600 font-medium">Lintasan Sensor Real-Time (Track Range: -2 m s.d. 10 m)</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Status Robot:</span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                  isSafe
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                }`}
              >
                {isSafe ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <ShieldAlert className="w-4 h-4 text-rose-600" />}
                {isSafe ? 'ZONA AMAN (TERKONEKSI BEACON)' : 'DI LUAR ZONA AMAN (SINYAL PUTUS)'}
              </span>
            </div>
          </div>

          {/* Visual Track & Beacon */}
          <div className="relative py-14 px-6">
            {/* The Track Line */}
            <div className="h-3 w-full bg-slate-200 rounded-full relative">
              {/* Safe Zone Highlight [1m to 7m] */}
              <div 
                className="absolute top-0 bottom-0 bg-emerald-400/40 border-x-2 border-emerald-500"
                style={{ left: '25%', width: '50%' }}
              />
            </div>

            {/* Safe Zone Label Banner */}
            <div 
              className="absolute top-5 bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono font-bold text-[10px] px-2.5 py-0.5 rounded shadow-2xs -translate-x-1/2"
              style={{ left: '50%' }}
            >
              Zona Aman Beacon [1 m s.d. 7 m]
            </div>

            {/* Beacon Tower at x = 4 (50%) */}
            <div className="absolute top-9 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-4 ring-emerald-100">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-800 mt-1">Beacon Pusat (x = 4)</span>
            </div>

            {/* Robot Vehicle */}
            <div
              className="absolute top-4 -translate-x-1/2 flex flex-col items-center transition-all duration-150 pointer-events-none"
              style={{ left: `${((robotPos + 2) / 12) * 100}%` }}
            >
              <div
                className={`p-2.5 rounded-2xl shadow-md transition-all ${
                  isSafe
                    ? 'bg-sky-600 text-white shadow-sky-600/30 ring-4 ring-sky-100'
                    : 'bg-rose-500 text-white shadow-rose-500/40 ring-4 ring-rose-100'
                }`}
              >
                <Bot className="w-6 h-6" />
              </div>
              <div className="bg-white border border-slate-300 text-slate-800 font-mono font-bold text-xs px-2 py-0.5 rounded-md mt-1 shadow-xs whitespace-nowrap">
                Robot: x = {robotPos} m
              </div>
            </div>

            {/* Tick Marks along Track */}
            <div className="relative flex justify-between mt-8">
              {[-2, 0, 1, 2, 4, 6, 7, 8, 10].map((tick) => (
                <div key={tick} className="flex flex-col items-center">
                  <div
                    className={`w-0.5 ${
                      tick === 4
                        ? 'h-3 bg-emerald-600 w-1'
                        : tick === 1 || tick === 7
                        ? 'h-3 bg-teal-600 w-1'
                        : 'h-1.5 bg-slate-300'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-mono mt-1 ${
                      tick === 4
                        ? 'text-emerald-800 font-bold'
                        : tick === 1 || tick === 7
                        ? 'text-teal-700 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {tick}m
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/90 p-3.5 rounded-xl border border-slate-200 text-xs font-mono text-center shadow-xs">
            <div>
              <span className="text-slate-500 block text-[10px] font-sans font-medium">Posisi Robot (x)</span>
              <span className="text-slate-900 font-bold text-base">{robotPos} meter</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-sans font-medium">Jarak ke Beacon: |x - 4|</span>
              <span className={`font-bold text-base ${isSafe ? 'text-emerald-700' : 'text-rose-600'}`}>
                |{robotPos} - 4| = {currentDistance} meter
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-sans font-medium">Toleransi Batas</span>
              <span className="text-slate-700 font-bold text-base">Maksimal 3 meter</span>
            </div>
          </div>
        </div>

        {/* Interactive Controls & Zone Derivation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Track Slider (6 cols) */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 shadow-xs">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Kendalikan Posisi Robot di Lintasan
            </div>

            <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <input
                type="range"
                min="-2"
                max="10"
                step="0.5"
                value={robotPos}
                onChange={(e) => handleSliderMove(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs font-mono text-slate-500 font-medium">
                <span>-2m</span>
                <span className="text-teal-700 font-bold">1m (Batas Bawah)</span>
                <span className="text-emerald-700 font-bold">4m (Pusat)</span>
                <span className="text-teal-700 font-bold">7m (Batas Atas)</span>
                <span>10m</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1 shadow-2xs">
              <div className="font-bold text-slate-800">Instruksi Investigasi:</div>
              <div>1. Geser robot ke kiri hingga lampu indikator tepat berubah menjadi merah. Catat koordinatnya.</div>
              <div>2. Geser robot ke kanan hingga lampu indikator kembali merah. Catat koordinatnya.</div>
            </div>
          </div>

          {/* Formative Discovery Form (6 cols) */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Simpulkan Daerah Posisi Aman Robot</span>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Berdasarkan pengujianmu, berapakah interval nilai x yang memenuhi pertidaksamaan <span className="font-mono text-amber-700 font-bold">|x - 4| ≤ 3</span>?
              </p>

              <div className="flex items-center gap-2 mb-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <input
                  type="number"
                  placeholder="Min"
                  value={minSafeInput}
                  onChange={(e) => setMinSafeInput(e.target.value)}
                  className="w-20 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-center font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500 text-sm"
                />
                <span className="font-mono text-slate-500 text-sm font-semibold">≤ x ≤</span>
                <input
                  type="number"
                  placeholder="Maks"
                  value={maxSafeInput}
                  onChange={(e) => setMaxSafeInput(e.target.value)}
                  className="w-20 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-center font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500 text-sm"
                />
                <span className="text-xs text-slate-600 font-medium">meter</span>
              </div>

              {challengeError && (
                <div className="text-xs text-rose-600 mb-2 font-medium">{challengeError}</div>
              )}
            </div>

            <button
              onClick={handleVerifyZone}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>UJI KESIMPULAN ZONA AMAN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Discovery Box when solved */}
        {hasSolvedChallenge && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-emerald-50 to-white border-2 border-amber-300 shadow-md space-y-4 animate-fade-in mt-6">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-mono font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Momen Penemuan Fundamental</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              OH... TERNYATA!
            </h3>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Menyelesaikan pertidaksamaan nilai mutlak <strong className="text-amber-800">|x - a| ≤ r</strong> adalah mencari rentang jarak fisik yang tidak melebihi radius toleransi <strong className="text-slate-900">r</strong> dari pusat <strong className="text-slate-900">a</strong>:
              </p>

              <div className="p-4 rounded-xl bg-white border border-amber-200 font-mono text-center space-y-2 shadow-xs">
                <div className="text-slate-500 text-xs font-sans">Penyelesaian Aljabar Sistematis:</div>
                <div className="text-base text-slate-700">|x - 4| ≤ 3</div>
                <div className="text-base text-slate-700">-3 ≤ x - 4 ≤ 3</div>
                <div className="text-xl font-bold text-emerald-700">
                  -3 + 4 ≤ x ≤ 3 + 4 ⟹ <span className="text-emerald-800">1 ≤ x ≤ 7 meter</span>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                Prinsip ini digunakan setiap hari dalam rekayasa kontrol industri, toleransi dimensi mesin presisi, sensor GPS, hingga batas aman kecepatan autopilot!
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                <span>Lanjut ke 05. FINAL BOSS (Sintesis)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
