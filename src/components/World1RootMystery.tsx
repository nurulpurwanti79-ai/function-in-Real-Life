import React, { useState, useId } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Sliders,
  TreePine,
  Flower2
} from 'lucide-react';
import { sound } from '../utils/audio';

interface World1Props {
  onComplete: () => void;
  onNext: () => void;
}

export const World1RootMystery: React.FC<World1Props> = ({ onComplete, onNext }) => {
  // Stages: 'prediction' -> 'lab' -> 'discovery' -> 'conclusion'
  const [stage, setStage] = useState<'prediction' | 'lab' | 'discovery' | 'conclusion'>('prediction');
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [predictionFeedback, setPredictionFeedback] = useState<boolean>(false);

  // Lab state: slider x from -8 to 8
  const [xVal, setXVal] = useState<number>(0);
  const [testedCount, setTestedCount] = useState<number>(0);
  const [hasTestedNegative, setHasTestedNegative] = useState<boolean>(false);
  const [hasTestedBoundary, setHasTestedBoundary] = useState<boolean>(false);

  // Discovery state
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Calculations
  const insideRoot = xVal + 4;
  const isValid = insideRoot >= 0;
  const sideLength = isValid ? Math.sqrt(insideRoot) : null;
  const area = isValid ? insideRoot : null;

  const handlePredictionSubmit = () => {
    if (selectedPrediction === null) return;
    sound.playClick();
    setPredictionFeedback(true);
  };

  const handleStartLab = () => {
    sound.playClick();
    setStage('lab');
  };

  const handleSliderChange = (newVal: number) => {
    setXVal(newVal);
    sound.playTick();
    setTestedCount((prev) => prev + 1);
    if (newVal < -4) setHasTestedNegative(true);
    if (newVal === -4) setHasTestedBoundary(true);
  };

  const handleQuickTest = (val: number) => {
    handleSliderChange(val);
  };

  const handleGoToDiscovery = () => {
    sound.playClick();
    setStage('discovery');
  };

  const handlePatternSubmit = () => {
    if (selectedPattern === null) return;
    if (selectedPattern === 1) {
      sound.playDiscovery();
      setIsRevealed(true);
      onComplete();
    } else {
      sound.playError();
      alert('Pola yang kamu pilih belum tepat. Coba perhatikan kembali hasil di Root Lab ketika x < -4.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb & Section kicker */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold">
          <span>01</span>
          <span aria-hidden="true">·</span>
          <span>THE ROOT MYSTERY</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500 font-sans font-medium">Fungsi Irasional</span>
        </div>
        
        {/* Step tracker */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className={stage === 'prediction' ? 'text-emerald-700 font-bold' : ''}>1. Prediksi</span>
          <span>→</span>
          <span className={stage === 'lab' ? 'text-emerald-700 font-bold' : ''}>2. Root Lab</span>
          <span>→</span>
          <span className={stage === 'discovery' || stage === 'conclusion' ? 'text-emerald-700 font-bold' : ''}>3. Penemuan</span>
        </div>
      </div>

      {/* Main card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-200 shadow-sm bg-white/95">
        
        {/* ============================================================== */}
        {/* STAGE 1: PREDICTION */}
        {/* ============================================================== */}
        {stage === 'prediction' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Konteks Nyata</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-3">
                Perancangan Otomatis Taman Persegi
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sebuah sekolah ingin membangun taman hijau berbentuk persegi. Sistem otomasi arsitektur mengatur panjang sisi taman <span className="font-mono text-emerald-700 font-bold">s(x)</span> berdasarkan parameter lingkungan <span className="font-mono text-emerald-700 font-bold">x</span> dengan rumus:
              </p>
              
              <div className="my-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 inline-block shadow-xs">
                <span className="text-xs text-emerald-700 block mb-1 font-semibold">Panjang Sisi Taman:</span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-800 tracking-wider">
                  s(x) = √(x + 4) <span className="text-base font-normal text-emerald-700">meter</span>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  Misteri Penyelidikan:
                </div>
                "Jika kamu membuat program komputer otomatis untuk menentukan panjang sisi taman sekolah, apakah SEMUA nilai x boleh dimasukkan oleh pengguna?"
              </div>
            </div>

            {/* Prediction Choices */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pilih Prediksimu Terlebih Dahulu:
              </div>

              {[
                {
                  id: 0,
                  text: 'Boleh semua nilai. Sistem komputer pasti bisa menghitung akar bilangan berapapun (positif, nol, maupun negatif).'
                },
                {
                  id: 1,
                  text: 'Hanya nilai x positif saja (x > 0) yang boleh, karena di dunia nyata ukuran panjang tidak boleh negatif.'
                },
                {
                  id: 2,
                  text: 'Ada batasan nilai x tertentu (bahkan boleh negatif sampai batas tertentu), asalkan nilai di dalam tanda akar tidak bernilai negatif.'
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  disabled={predictionFeedback}
                  onClick={() => setSelectedPrediction(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-sm flex items-start gap-3 ${
                    selectedPrediction === opt.id
                      ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-xs font-medium'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center text-xs ${
                      selectedPrediction === opt.id
                        ? 'border-emerald-500 bg-emerald-600 text-white font-bold'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {selectedPrediction === opt.id ? '✓' : ''}
                  </div>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Submit prediction or go to lab */}
            {!predictionFeedback ? (
              <button
                disabled={selectedPrediction === null}
                onClick={handlePredictionSubmit}
                className="px-6 py-3 bg-emerald-600 disabled:opacity-40 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-sm transition-all"
              >
                Kunci Prediksi
              </button>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3 animate-fade-in">
                <div className="text-sm text-slate-800">
                  <span className="font-bold text-emerald-800">Prediksimu tercatat!</span> Jangan yakin dulu dengan tebakanmu. Dalam sains dan matematika, kebenaran diuji lewat pengamatan sistematis.
                </div>
                <button
                  onClick={handleStartLab}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                >
                  <span>MASUK ROOT LAB</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 2: ROOT LAB SIMULATION */}
        {/* ============================================================== */}
        {stage === 'lab' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Laboratorium Eksperimen</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Root Lab: Uji Nilai x</h2>
                <p className="text-xs text-slate-600">Geser slider parameter x untuk menguji reaksi sistem taman dan keabsahan nilai akar.</p>
              </div>

              {/* Quick test triggers */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-500 mr-1 font-medium">Uji Cepat:</span>
                {[-6, -4, 0, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleQuickTest(val)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all ${
                      xVal === val
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    x = {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Split layout: Interactive Stage (Left) & Control Deck (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Garden Canvas / Visual representation (7 cols) */}
              <div className="lg:col-span-7 bg-gradient-to-b from-sky-50/50 via-emerald-50/30 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200/80 flex flex-col justify-between min-h-[340px] relative overflow-hidden shadow-xs">
                {/* Background coordinate grid */}
                <div className="absolute inset-0 math-grid-subtle opacity-60 pointer-events-none" />

                {/* Top readout */}
                <div className="relative z-10 flex items-center justify-between border-b border-emerald-200/60 pb-3">
                  <div className="text-xs text-slate-700 font-medium">
                    Visualisasi Taman Persegi: <span className="font-mono text-emerald-700 font-bold">s × s</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Status Fisik:</span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                        isValid
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {isValid ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                      {isValid ? 'VALID (REAL)' : 'ERROR (TIDAK REAL)'}
                    </span>
                  </div>
                </div>

                {/* Visual Garden rendering container */}
                <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
                  {isValid ? (
                    <div className="flex flex-col items-center animate-fade-in">
                      {/* Garden box */}
                      <div
                        className="relative rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 border-2 border-emerald-300 shadow-lg flex flex-col items-center justify-center transition-all duration-300 overflow-hidden"
                        style={{
                          width: `${Math.max(52, Math.min(240, (sideLength || 1) * 55))}px`,
                          height: `${Math.max(52, Math.min(240, (sideLength || 1) * 55))}px`,
                        }}
                      >
                        {/* Garden details */}
                        <div className="flex items-center gap-2 text-emerald-100">
                          <TreePine className="w-5 h-5 drop-shadow" />
                          <Flower2 className="w-4 h-4 text-amber-200 drop-shadow" />
                        </div>
                        <div className="mt-1 text-center font-mono font-bold text-xs text-white drop-shadow">
                          {sideLength?.toFixed(2)} m
                        </div>

                        {/* Dimensional tags */}
                        <span className="absolute bottom-1 right-2 text-[10px] font-mono text-emerald-100 drop-shadow font-semibold">
                          Luas: {area?.toFixed(1)} m²
                        </span>
                      </div>

                      {/* Dimension annotations */}
                      <div className="mt-3 text-xs font-mono text-slate-700 font-medium">
                        Sisi = √( {xVal} + 4 ) = <span className="text-emerald-700 font-bold">{sideLength?.toFixed(2)} meter</span>
                      </div>
                    </div>
                  ) : (
                    /* Error state */
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/90 border border-rose-200 max-w-sm shadow-xs animate-fade-in">
                      <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                        <AlertTriangle className="w-7 h-7" />
                      </div>
                      <div className="text-rose-700 font-bold text-base mb-1 font-mono">
                        s({xVal}) = √({insideRoot}) ∉ ℝ
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Nilai radikan negatif! Tidak ada bilangan real yang jika dikuadratkan menghasilkan bilangan negatif ({insideRoot}). Taman ini <strong className="text-rose-700">tidak mungkin berwujud di dunia nyata</strong>.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom live calculation bar */}
                <div className="relative z-10 grid grid-cols-3 gap-2 bg-white/90 p-3 rounded-xl border border-emerald-200/80 text-xs text-center font-mono shadow-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 font-sans font-medium">Nilai Input (x)</div>
                    <div className="text-slate-900 font-bold">{xVal}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-sans font-medium">Radikan (x + 4)</div>
                    <div className={`font-bold ${insideRoot >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {insideRoot}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-sans font-medium">Hasil Sisi √(x + 4)</div>
                    <div className={`font-bold ${isValid ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {isValid ? `${sideLength?.toFixed(2)} m` : 'Tak Terdefinisi'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider & Control Deck (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-4">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    <span>KONTROL PARAMETER x</span>
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-3 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex justify-between items-center">
                      <label htmlFor="x-slider" className="text-xs text-slate-700 font-semibold">Nilai x:</label>
                      <span className="font-mono text-base font-bold text-emerald-700 px-3 py-0.5 bg-emerald-50 rounded-lg border border-emerald-200 tabular-nums">
                        {xVal}
                      </span>
                    </div>

                    <input
                      id="x-slider"
                      type="range"
                      min="-8"
                      max="8"
                      step="1"
                      value={xVal}
                      onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />

                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>-8 (Kiri)</span>
                      <span className="text-amber-600 font-bold">-4 (Titik Kritis)</span>
                      <span>+8 (Kanan)</span>
                    </div>
                  </div>

                  {/* Observasi guide */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-2 mb-4 shadow-2xs">
                    <div className="text-slate-800 font-bold">Tantangan Observasi:</div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className={xVal < -4 ? 'text-rose-600 font-bold' : ''}>
                        ● Uji x &lt; -4: Apakah sistem eror?
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className={xVal === -4 ? 'text-amber-600 font-bold' : ''}>
                        ● Uji x = -4: Berapa panjang sisinya?
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className={xVal > -4 ? 'text-emerald-700 font-bold' : ''}>
                        ● Uji x &gt; -4: Kapan taman bisa membesar?
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transition to Discovery */}
                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={handleGoToDiscovery}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    <span>SAYA SUDAH MENEMUKAN POLANYA</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 3: DISCOVERY & "OH... TERNYATA!" */}
        {/* ============================================================== */}
        {stage === 'discovery' && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Fase Penemuan Konsep</span>
              <h2 className="text-2xl font-extrabold text-slate-900">Apa Pola yang Kamu Temukan?</h2>
              <p className="text-xs text-slate-600">Berdasarkan data eksperimen di Root Lab, rumuskan hukum matematis yang berlaku.</p>
            </div>

            {!isRevealed ? (
              <div className="space-y-4">
                {[
                  {
                    id: 0,
                    text: 'Nilai x hanya boleh bilangan bulat positif ganjil (1, 3, 5, ...).'
                  },
                  {
                    id: 1,
                    text: 'Nilai x boleh berapapun asalkan radikan x + 4 ≥ 0, yang berarti batas minimalnya adalah x ≥ -4.'
                  },
                  {
                    id: 2,
                    text: 'Nilai x boleh bernilai negatif sembarang tanpa ada batas minimum sama sekali.'
                  }
                ].map((pat) => (
                  <button
                    key={pat.id}
                    onClick={() => setSelectedPattern(pat.id)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-start gap-3 ${
                      selectedPattern === pat.id
                        ? 'bg-emerald-50 border-emerald-500 text-slate-900 font-medium shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center text-xs ${
                        selectedPattern === pat.id
                          ? 'border-emerald-500 bg-emerald-600 text-white font-bold'
                          : 'border-slate-300 bg-slate-50'
                      }`}
                    >
                      {selectedPattern === pat.id ? '✓' : ''}
                    </div>
                    <span>{pat.text}</span>
                  </button>
                ))}

                <button
                  disabled={selectedPattern === null}
                  onClick={handlePatternSubmit}
                  className="px-6 py-3 bg-emerald-600 disabled:opacity-40 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-sm transition-all"
                >
                  Uji Kesimpulan
                </button>
              </div>
            ) : (
              /* THE "OH... TERNYATA!" REVEAL */
              <div className="space-y-6 animate-fade-in">
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-2 border-emerald-300 shadow-md relative overflow-hidden">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-mono font-bold tracking-widest uppercase mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                    <span>Momen Penemuan Fundamental</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                    OH... TERNYATA!
                  </h3>

                  <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                    <p>
                      Bilangan di dalam akar (radikan) <strong className="text-emerald-800">tidak boleh bernilai negatif</strong> agar menghasilkan nilai real. Oleh karena itu, sistem taman memiliki syarat matematis mutlak:
                    </p>

                    <div className="p-4 rounded-2xl bg-white border border-emerald-200 text-center font-mono space-y-2 shadow-xs">
                      <div className="text-slate-500 text-xs font-sans">Syarat Radikan Terdefinisi:</div>
                      <div className="text-2xl font-bold text-emerald-700">
                        x + 4 ≥ 0
                      </div>
                      <div className="text-lg text-emerald-800 font-bold">
                        x ≥ -4
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600">
                      Inilah yang disebut <strong className="text-slate-900">Daerah Asal (Domain) Fungsi Irasional</strong>:
                      <span className="font-mono text-emerald-800 font-bold block mt-1 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                        Df = &#123; x | x ≥ -4, x ∈ ℝ &#125;
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
                    <span>Eksplorasi Root Lab Lagi</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onNext();
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                  >
                    <span>Lanjut ke 02. Distance Mystery</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
