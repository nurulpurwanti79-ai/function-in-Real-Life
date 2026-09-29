import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';

interface World5Props {
  onComplete: () => void;
  onNext: () => void;
}

export const World5FinalBoss: React.FC<World5Props> = ({ onComplete, onNext }) => {
  const [testInput, setTestInput] = useState<number>(-5);
  const [testedNumbers, setTestedNumbers] = useState<number[]>([-5]);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Step-by-step pipeline computation
  const step1_raw = testInput - 4;
  const step2_abs = Math.abs(step1_raw);
  const step3_root = Math.sqrt(step2_abs);

  const handleTestNumber = (num: number) => {
    setTestInput(num);
    if (!testedNumbers.includes(num)) {
      setTestedNumbers((prev) => [...prev, num]);
    }
    sound.playTick();
  };

  const handleRevealBoss = () => {
    sound.playDiscovery();
    setIsRevealed(true);
    onComplete();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Kicker */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-bold">
          <span>05</span>
          <span aria-hidden="true">·</span>
          <span>FINAL BOSS</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500 font-sans font-medium">Sintesis: f(x) = √|x - 4|</span>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-purple-200 shadow-sm bg-white/95">
        
        {/* Boss Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
              <Flame className="w-4 h-4 text-purple-600" />
              <span>Tantangan Sintesis Terakhir</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Final Boss: Ketika Dua Konsep Bersatu
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Fungsi irasional (akar) dan fungsi nilai mutlak digabungkan menjadi satu fungsi gabungan:
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-amber-50 border border-purple-200 text-center shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold block mb-1">Fungsi Boss:</span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-purple-800 tracking-wider">
              f(x) = √|x - 4|
            </span>
          </div>
        </div>

        {/* The Core Question */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-6 flex items-start gap-3 shadow-2xs">
          <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="text-amber-950 font-bold">Teka-Teki Boss:</strong> Pada World 1, kamu menemukan bahwa fungsi akar biasa s(x) = √(x + 4) mengalami <span className="text-rose-600 font-bold">ERROR</span> saat x &lt; -4.
            <br />
            Sekarang, dapatkah kamu menemukan <strong>SATU SAJA</strong> nilai x ∈ ℝ yang membuat fungsi <span className="font-mono text-purple-800 font-bold">f(x) = √|x - 4|</span> menghasilkan ERROR / TIDAK TERDEFINISI?
          </div>
        </div>

        {/* Interactive Deep Tester Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          
          {/* Visual Pipeline (8 cols) */}
          <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Alur Pemrosesan Matematika</span>
              <span className="text-emerald-700 flex items-center gap-1 font-mono font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Tameng Mutlak Aktif
              </span>
            </div>

            {/* Pipeline Flowchart Visual */}
            <div className="space-y-4 my-2">
              {/* Step 1: Input x */}
              <div className="p-4 rounded-xl bg-white border border-sky-200 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-mono font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Nilai Input Bebas</div>
                    <div className="font-mono font-bold text-slate-900 text-sm">x = {testInput}</div>
                  </div>
                </div>
                <div className="font-mono text-xs text-slate-600 font-medium">
                  x - 4 = <span className="text-slate-900 font-bold">{step1_raw}</span>
                </div>
              </div>

              {/* Step 2: The Absolute Value Shield */}
              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 flex items-center justify-between relative overflow-hidden shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-mono font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <div className="text-xs text-purple-800 font-medium">Tameng Nilai Mutlak: |x - 4|</div>
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      |{step1_raw}| = <span className="text-purple-700 font-black">{step2_abs}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-purple-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-purple-200 shadow-2xs">
                  Selalu ≥ 0 (Anti-Negatif!)
                </div>
              </div>

              {/* Step 3: Radical Evaluation */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-mono font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <div className="text-xs text-emerald-800 font-medium">Ekstraksi Akar Kuadrat: √( {step2_abs} )</div>
                    <div className="font-mono font-bold text-slate-900 text-base">
                      f({testInput}) = <span className="text-emerald-700 font-black">{step3_root.toFixed(3)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SELALU VALID</span>
                </div>
              </div>
            </div>

            {/* Comparison card: Tanpa Tameng vs Dengan Tameng */}
            <div className="mt-4 p-3.5 rounded-xl bg-white border border-slate-200 text-xs grid grid-cols-2 gap-3 shadow-2xs">
              <div>
                <span className="text-slate-500 font-medium block mb-0.5">Tanpa Nilai Mutlak: √(x - 4)</span>
                <span className={`font-mono font-bold ${step1_raw >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {step1_raw >= 0 ? `√(${step1_raw}) = ${Math.sqrt(step1_raw).toFixed(2)}` : `√(${step1_raw}) ⟹ ERROR!`}
                </span>
              </div>
              <div>
                <span className="text-purple-700 font-bold block mb-0.5">Dengan Tameng: √|x - 4|</span>
                <span className="font-mono font-bold text-purple-900">
                  √|{step1_raw}| = {step3_root.toFixed(2)} (VALID)
                </span>
              </div>
            </div>
          </div>

          {/* Test Input Controller (4 cols) */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Uji Nilai x Ekstrem
              </div>

              {/* Slider */}
              <div className="space-y-2 mb-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-medium">Nilai x:</span>
                  <span className="font-mono text-base font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    x = {testInput}
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={testInput}
                  onChange={(e) => handleTestNumber(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 font-medium">
                  <span>-20 (Sangat Negatif)</span>
                  <span>0</span>
                  <span>+20</span>
                </div>
              </div>

              {/* Quick Extreme Buttons */}
              <div className="text-xs text-slate-600 font-medium mb-2">Coba Nilai-Nilai Ini:</div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[-100, -25, -4, 0, 4, 13].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleTestNumber(val)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono border transition-all ${
                      testInput === val
                        ? 'bg-purple-600 text-white border-purple-600 font-bold shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    x = {val}
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-slate-600 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                Sudah menguji: <span className="font-mono text-purple-700 font-bold">{testedNumbers.length} angka</span> berbeda. Apakah ada satu saja yang menghasilkan error?
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={handleRevealBoss}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>LIHAT KESIMPULAN BOSS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Discovery Moment */}
        {isRevealed && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-50 via-amber-50 to-emerald-50 border-2 border-purple-300 shadow-md space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-purple-800 text-xs font-mono font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Puncak Penemuan Matematika</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              OH... TERNYATA!
            </h3>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p className="text-base text-slate-900">
                <strong className="text-purple-800 font-bold">Konsep matematika ternyata saling terhubung dengan indah!</strong>
              </p>

              <div className="p-4 rounded-xl bg-white border border-purple-200 font-mono space-y-2 text-center shadow-xs">
                <div className="text-xs text-slate-500 font-sans">Rantai Logika Pembuktian:</div>
                <div className="text-teal-700 font-semibold">1. Untuk setiap x ∈ ℝ, berlaku: |x - 4| ≥ 0</div>
                <div className="text-purple-700 font-semibold">2. Karena radikan di bawah akar selalu ≥ 0, syarat akar kuadrat selalu terpenuhi!</div>
                <div className="text-xl font-bold text-emerald-700 pt-1">
                  Daerah Asal (Domain) f(x) = √|x - 4| adalah SEMUA BILANGAN REAL (x ∈ ℝ)!
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Nilai mutlak bertindak sebagai <em>tameng anti-bilangan negatif</em> yang membebaskan fungsi irasional dari keterbatasan domainnya. Tanpa nilai mutlak, domainnya terpotong hanya untuk x ≥ 4. Namun dengan nilai mutlak, seluruh garis bilangan real (-∞ s.d. +∞) menjadi sah dan valid!
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                <span>Lanjut ke Refleksi Diri (Take a Moment)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
