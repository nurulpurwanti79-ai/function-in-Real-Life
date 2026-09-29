import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  School,
  Home,
  CheckCircle2,
  HelpCircle,
  Footprints
} from 'lucide-react';
import { sound } from '../utils/audio';

interface World2Props {
  onComplete: () => void;
  onNext: () => void;
}

export const World2DistanceMystery: React.FC<World2Props> = ({ onComplete, onNext }) => {
  // Stages: 'mystery' -> 'lab' -> 'reveal'
  const [stage, setStage] = useState<'mystery' | 'lab' | 'reveal'>('mystery');
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [guessAnswered, setGuessAnswered] = useState<boolean>(false);

  // Position on number line (-10 to 10)
  const [position, setPosition] = useState<number>(-5);
  const [hasCrossedZero, setHasCrossedZero] = useState<boolean>(false);

  const distance = Math.abs(position);

  const handleGuess = (val: string) => {
    setUserGuess(val);
    setGuessAnswered(true);
    sound.playClick();
  };

  const handlePositionChange = (newPos: number) => {
    if ((position < 0 && newPos > 0) || (position > 0 && newPos < 0) || newPos === 0) {
      setHasCrossedZero(true);
      sound.playDiscovery();
    } else {
      sound.playTick();
    }
    setPosition(newPos);
  };

  const handleCompleteLab = () => {
    sound.playDiscovery();
    setStage('reveal');
    onComplete();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Kicker */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-700 font-bold">
          <span>02</span>
          <span aria-hidden="true">·</span>
          <span>THE DISTANCE MYSTERY</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500 font-sans font-medium">Fungsi Nilai Mutlak</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className={stage === 'mystery' ? 'text-sky-700 font-bold' : ''}>1. Misteri Jarak</span>
          <span>→</span>
          <span className={stage === 'lab' ? 'text-sky-700 font-bold' : ''}>2. Distance Lab</span>
          <span>→</span>
          <span className={stage === 'reveal' ? 'text-sky-700 font-bold' : ''}>3. Makna Nilai Mutlak</span>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-200 shadow-sm bg-white/95">
        
        {/* ============================================================== */}
        {/* STAGE 1: THE MYSTERY OF DISTANCE */}
        {/* ============================================================== */}
        {stage === 'mystery' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Teka-Teki Arah & Posisi</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">
                Siapa yang Lebih Jauh dari Sekolah?
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                Sekolah berada tepat di titik pusat koordinat 0. Rumah Ahmad berada di posisi koordinat <strong className="text-sky-700 font-mono">-5 km</strong> (arah Barat). Sedangkan rumah Budi berada di posisi koordinat <strong className="text-emerald-700 font-mono">+5 km</strong> (arah Timur).
              </p>
            </div>

            {/* Visual scenario representation */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-emerald-50 border border-slate-200 space-y-4 shadow-xs">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 px-2">
                <span className="text-sky-700">BARAT (-)</span>
                <span className="text-emerald-700 font-bold">TITIK ACUAN</span>
                <span className="text-teal-700">TIMUR (+)</span>
              </div>

              {/* Number line representation */}
              <div className="relative py-8">
                {/* Horizontal line */}
                <div className="h-2 w-full bg-slate-200 rounded-full" />
                
                {/* Markers */}
                <div className="absolute top-1/2 left-[25%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="p-2.5 rounded-2xl bg-sky-100 border border-sky-300 text-sky-700 shadow-xs">
                    <Home className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-800 mt-2">Rumah A</span>
                  <span className="text-[11px] font-mono text-slate-500">-5 km</span>
                </div>

                <div className="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                    <School className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-800 mt-2">Sekolah</span>
                  <span className="text-[11px] font-mono text-slate-500">0 km</span>
                </div>

                <div className="absolute top-1/2 left-[75%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="p-2.5 rounded-2xl bg-teal-100 border border-teal-300 text-teal-700 shadow-xs">
                    <Home className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-800 mt-2">Rumah B</span>
                  <span className="text-[11px] font-mono text-slate-500">+5 km</span>
                </div>
              </div>
            </div>

            {/* Mystery Question */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                <span>Menurutmu, manakah pernyataan yang benar?</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'b', label: 'Rumah B lebih jauh', desc: 'Karena +5 lebih besar dari -5 secara aljabar.' },
                  { id: 'a', label: 'Rumah A lebih jauh', desc: 'Karena tanda minus membutuhkan usaha lebih.' },
                  { id: 'same', label: 'Jarak keduanya SAMA', desc: 'Keduanya sama-sama menempuh 5 km perjalanan fisik.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    disabled={guessAnswered}
                    onClick={() => handleGuess(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      userGuess === item.id
                        ? item.id === 'same'
                          ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-xs'
                          : 'bg-rose-50 border-rose-300 text-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1 text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {guessAnswered && (
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3 animate-fade-in">
                <div className="text-sm text-slate-800 leading-relaxed">
                  <span className="font-bold text-emerald-800">Tepat sekali!</span> Jarak fisik keduanya sama-sama <strong className="text-emerald-900 font-mono">5 km</strong>. Langkah kaki atau bensin motor yang dibutuhkan tidak peduli apakah bergerak ke arah Barat atau Timur.
                  <p className="text-xs text-slate-600 mt-1">
                    Lalu bagaimana matematika merumuskan besaran yang "menghapus arah" dan hanya mengukur besarnya jarak?
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setStage('lab');
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  <span>BUKA DISTANCE LAB</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 2: DISTANCE LAB */}
        {/* ============================================================== */}
        {stage === 'lab' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Eksperimen Gerak Real-Time</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Distance Lab: Gerakkan Posisi</h2>
                <p className="text-xs text-slate-600">Geser titik atau klik koordinat untuk mengamati perbedaan antara Posisi (x) dan Jarak (|x|).</p>
              </div>

              {/* Zero crossing status */}
              {hasCrossedZero && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg shadow-2xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Titik Nol Terlampaui! Perhatikan jarak memantul kembali.</span>
                </div>
              )}
            </div>

            {/* Split layout: Interactive Number Line & Telemetry Readout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Number Line Canvas Stage (8 cols) */}
              <div className="lg:col-span-8 bg-gradient-to-r from-sky-50/50 via-white to-emerald-50/50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between min-h-[300px] relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-3">
                  <span className="font-semibold">Garis Bilangan Interaktif</span>
                  <span className="font-mono text-emerald-700 font-bold">
                    Titik Pusat Acuan: x = 0 (Sekolah)
                  </span>
                </div>

                {/* The Graphic Number Line */}
                <div className="relative py-12 px-4">
                  {/* Axis baseline */}
                  <div className="h-2.5 w-full bg-slate-200 rounded-full relative">
                    {/* Traveled distance highlight from 0 to position */}
                    <div
                      className="absolute top-0 bottom-0 bg-sky-400/50 rounded-full transition-all duration-150"
                      style={{
                        left: position < 0 ? `${((position + 10) / 20) * 100}%` : '50%',
                        width: `${(distance / 20) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Tick marks from -10 to +10 */}
                  <div className="relative flex justify-between mt-2">
                    {[-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10].map((tick) => (
                      <button
                        key={tick}
                        onClick={() => handlePositionChange(tick)}
                        className="group flex flex-col items-center focus:outline-none"
                      >
                        <div
                          className={`w-0.5 transition-colors ${
                            tick === 0
                              ? 'h-4 bg-emerald-600 w-1'
                              : tick === position
                              ? 'h-3.5 bg-sky-600 w-1'
                              : 'h-2 bg-slate-300 group-hover:bg-slate-400'
                          }`}
                        />
                        <span
                          className={`text-[10px] font-mono mt-1 ${
                            tick === 0
                              ? 'text-emerald-700 font-bold'
                              : tick === position
                              ? 'text-sky-700 font-bold'
                              : 'text-slate-400'
                          }`}
                        >
                          {tick}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Movable Character Pointer */}
                  <div
                    className="absolute top-3 -translate-x-1/2 flex flex-col items-center transition-all duration-200 pointer-events-none"
                    style={{ left: `${((position + 10) / 20) * 100}%` }}
                  >
                    <div className="p-2.5 rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-600/30 ring-4 ring-sky-100">
                      <Footprints className="w-5 h-5" />
                    </div>
                    <div className="bg-white border border-sky-300 text-sky-800 font-mono font-bold text-xs px-2.5 py-0.5 rounded-md mt-1 whitespace-nowrap shadow-xs">
                      Posisi: {position}
                    </div>
                  </div>

                  {/* Fixed School Marker at 0 */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-90">
                    <School className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>

                {/* Real-time comparison display */}
                <div className="grid grid-cols-2 gap-4 bg-white/90 p-4 rounded-xl border border-slate-200 text-center font-mono shadow-xs">
                  <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200">
                    <span className="text-[11px] text-sky-800 font-sans font-bold block mb-0.5">POSISI (x)</span>
                    <span className="text-xl font-bold text-sky-700">
                      {position > 0 ? `+${position}` : position} km
                    </span>
                    <span className="text-[10px] text-slate-500 font-sans block mt-0.5">
                      {position < 0 ? 'Arah Barat (Kiri)' : position > 0 ? 'Arah Timur (Kanan)' : 'Tepat di Titik Acuan'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] text-emerald-800 font-sans font-bold block mb-0.5">JARAK MUTLAK |x|</span>
                    <span className="text-xl font-bold text-emerald-700">
                      |{position}| = {distance} km
                    </span>
                    <span className="text-[10px] text-emerald-800 font-sans block mt-0.5 font-medium">
                      Selalu Bernilai Positif atau Nol (≥ 0)
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls & Concept Sidebar (4 cols) */}
              <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Kontrol Slider Jarak
                  </div>

                  <div className="space-y-4 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="1"
                      value={position}
                      onChange={(e) => handlePositionChange(parseInt(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                    />

                    <div className="flex justify-between text-xs font-mono text-slate-500 font-medium">
                      <span>-10 km</span>
                      <span className="text-emerald-700 font-bold">0</span>
                      <span>+10 km</span>
                    </div>
                  </div>

                  {/* Math definition preview */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs font-mono shadow-2xs">
                    <div className="text-slate-700 font-sans font-bold">Definisi Nilai Mutlak:</div>
                    <div className="text-emerald-700 font-bold leading-relaxed">
                      |x| = x &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jika x ≥ 0
                      <br />
                      |x| = -x &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jika x &lt; 0
                    </div>
                    {position < 0 && (
                      <div className="pt-2 border-t border-slate-200 text-sky-800 font-medium">
                        Karena {position} &lt; 0:
                        <br />
                        |{position}| = -({position}) = <span className="font-bold text-sky-900">{distance}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={handleCompleteLab}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    <span>SAYA SUDAH MEMAHAMI KONSEP JARAK</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 3: REVEAL & "OH... TERNYATA!" */}
        {/* ============================================================== */}
        {stage === 'reveal' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-50 via-teal-50 to-white border-2 border-sky-300 shadow-md relative overflow-hidden">
              <div className="flex items-center gap-2 text-sky-800 text-xs font-mono font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-4 h-4 text-sky-600 animate-spin" />
                <span>Momen Penemuan Fundamental</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                OH... TERNYATA!
              </h3>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  Nilai mutlak bukanlah sekadar "tanda minus dihilangkan", melainkan <strong className="text-sky-800">jarak geometris</strong> suatu titik dari titik acuan tanpa mempedulikan arah:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-mono">
                  <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-xs">
                    <span className="text-xs text-slate-500 block mb-1 font-sans font-medium">Geometri Jarak 1 Titik:</span>
                    <span className="text-xl font-bold text-sky-700">d(x, 0) = |x|</span>
                    <span className="text-xs text-slate-600 block mt-1 font-sans">Jarak titik x ke titik 0.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-teal-200 shadow-xs">
                    <span className="text-xs text-slate-500 block mb-1 font-sans font-medium">Geometri Jarak 2 Titik:</span>
                    <span className="text-xl font-bold text-teal-700">d(x, a) = |x - a|</span>
                    <span className="text-xs text-slate-600 block mt-1 font-sans">Jarak antara titik x dan titik a.</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600">
                  Karena jarak dalam ruang nyata tidak pernah bernilai negatif, maka:
                  <span className="font-mono text-emerald-800 block mt-1 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-center font-bold">
                    |x| ≥ 0 untuk SEMUA x ∈ ℝ
                  </span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  sound.playClick();
                  setStage('lab');
                }}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Uji Garis Bilangan Lagi</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                <span>Lanjut ke 03. Graph Lab</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
