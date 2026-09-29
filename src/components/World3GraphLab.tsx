import React, { useState, useId } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Sliders,
  Crosshair,
  HelpCircle,
  Activity
} from 'lucide-react';
import { sound } from '../utils/audio';

interface World3Props {
  onComplete: () => void;
  onNext: () => void;
}

export const World3GraphLab: React.FC<World3Props> = ({ onComplete, onNext }) => {
  const [aParam, setAParam] = useState<number>(0);
  const [bParam, setBParam] = useState<number>(0);
  const [testPointX, setTestPointX] = useState<number>(2);

  // Inquiry responses
  const [inquiryA, setInquiryA] = useState<string | null>(null);
  const [inquiryB, setInquiryB] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Derived mathematical values
  const vertex = { x: aParam, y: bParam };
  const testPointY = Math.abs(testPointX - aParam) + bParam;

  // Canvas / SVG coordinate mapping:
  // Math domain: x ∈ [-8, 8], y ∈ [-6, 10]
  const svgWidth = 480;
  const svgHeight = 360;
  const xMin = -8;
  const xMax = 8;
  const yMin = -4;
  const yMax = 10;

  const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * svgWidth;
  const toSvgY = (y: number) => svgHeight - ((y - yMin) / (yMax - yMin)) * svgHeight;

  // Vertex in SVG coordinates
  const svgVertexX = toSvgX(vertex.x);
  const svgVertexY = toSvgY(vertex.y);

  // Test point in SVG coordinates
  const svgTestX = toSvgX(testPointX);
  const svgTestY = toSvgY(testPointY);

  // Graph endpoints: Left ray from xMin to vertex, Right ray from vertex to xMax
  const yAtLeft = Math.abs(xMin - aParam) + bParam;
  const yAtRight = Math.abs(xMax - aParam) + bParam;

  const svgLeftX = toSvgX(xMin);
  const svgLeftY = toSvgY(yAtLeft);
  const svgRightX = toSvgX(xMax);
  const svgRightY = toSvgY(yAtRight);

  const handlePreset = (a: number, b: number) => {
    sound.playClick();
    setAParam(a);
    setBParam(b);
  };

  const handleReveal = () => {
    sound.playDiscovery();
    setIsRevealed(true);
    onComplete();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header kicker */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-700 font-bold">
          <span>03</span>
          <span aria-hidden="true">·</span>
          <span>GRAPH LAB</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500 font-sans font-medium">Transformasi Geometris f(x) = |x - a| + b</span>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-200 shadow-sm bg-white/95">
        
        {/* Lab Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Laboratorium Kartesius Dinamis</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Graph Lab: Eksplorasi Bentuk V</h2>
            <p className="text-xs text-slate-600">Ubah nilai slider a dan b untuk mengamati bagaimana puncak dan posisi grafik bergerak.</p>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 mr-1 font-semibold">Preset:</span>
            {[
              { label: '|x|', a: 0, b: 0 },
              { label: '|x - 3|', a: 3, b: 0 },
              { label: '|x + 2| - 1', a: -2, b: -1 },
              { label: '|x - 4| + 2', a: 4, b: 2 }
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => handlePreset(p.a, p.b)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  aParam === p.a && bParam === p.b
                    ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Formula Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-sky-50 to-teal-50 border border-indigo-200/80 flex flex-wrap items-center justify-between gap-4 mb-6 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 font-semibold">Fungsi Aktif:</span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-indigo-900 tracking-wide">
              f(x) = |x {aParam >= 0 ? `- ${aParam}` : `+ ${Math.abs(aParam)}`}| {bParam >= 0 ? `+ ${bParam}` : `- ${Math.abs(bParam)}`}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-800 shadow-2xs font-semibold">
              Titik Puncak V: <strong className="text-indigo-950 font-bold">({vertex.x}, {vertex.y})</strong>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white border border-sky-200 text-sky-800 shadow-2xs font-semibold">
              Sumbu Simetri: <strong className="text-sky-950 font-bold">x = {vertex.x}</strong>
            </div>
          </div>
        </div>

        {/* Main Grid: Visual SVG Coordinate Screen (7 cols) & Slider/Inquiry Deck (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
          
          {/* SVG Coordinate Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto max-h-[360px] select-none"
            >
              {/* Background Canvas Tint */}
              <rect width={svgWidth} height={svgHeight} fill="#F8FAFC" />

              {/* Background Grid Lines */}
              {Array.from({ length: 17 }, (_, i) => i - 8).map((x) => (
                <line
                  key={`grid-x-${x}`}
                  x1={toSvgX(x)}
                  y1={0}
                  x2={toSvgX(x)}
                  y2={svgHeight}
                  stroke={x === 0 ? '#475569' : '#E2E8F0'}
                  strokeWidth={x === 0 ? 1.5 : 0.8}
                />
              ))}

              {Array.from({ length: 15 }, (_, i) => i - 4).map((y) => (
                <line
                  key={`grid-y-${y}`}
                  x1={0}
                  y1={toSvgY(y)}
                  x2={svgWidth}
                  y2={toSvgY(y)}
                  stroke={y === 0 ? '#475569' : '#E2E8F0'}
                  strokeWidth={y === 0 ? 1.5 : 0.8}
                />
              ))}

              {/* Axis labels */}
              <text x={svgWidth - 16} y={toSvgY(0) - 8} fill="#475569" fontSize="11" fontWeight="bold" fontFamily="monospace">X</text>
              <text x={toSvgX(0) + 8} y={16} fill="#475569" fontSize="11" fontWeight="bold" fontFamily="monospace">Y</text>

              {/* Axis Ticks */}
              {[-6, -4, -2, 2, 4, 6].map((tick) => (
                <text
                  key={`tick-x-${tick}`}
                  x={toSvgX(tick)}
                  y={toSvgY(0) + 14}
                  fill="#64748B"
                  fontSize="9"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {tick}
                </text>
              ))}

              {[-2, 2, 4, 6, 8].map((tick) => (
                <text
                  key={`tick-y-${tick}`}
                  x={toSvgX(0) - 8}
                  y={toSvgY(tick) + 3}
                  fill="#64748B"
                  fontSize="9"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {tick}
                </text>
              ))}

              {/* Axis of Symmetry (Dashed Line at x = a) */}
              <line
                x1={svgVertexX}
                y1={0}
                x2={svgVertexX}
                y2={svgHeight}
                stroke="#0284C7"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                opacity={0.8}
              />

              {/* V-Shape Graph Rays: Left ray & Right ray */}
              <polyline
                points={`${svgLeftX},${svgLeftY} ${svgVertexX},${svgVertexY} ${svgRightX},${svgRightY}`}
                fill="none"
                stroke="#059669"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Vertex Point with Glow */}
              <circle cx={svgVertexX} cy={svgVertexY} r={10} fill="#10B981" opacity={0.2} />
              <circle cx={svgVertexX} cy={svgVertexY} r={6} fill="#059669" stroke="#FFFFFF" strokeWidth={2} />
              <text
                x={svgVertexX + 8}
                y={svgVertexY - 8}
                fill="#065F46"
                fontSize="11"
                fontWeight="bold"
                fontFamily="monospace"
              >
                V({vertex.x}, {vertex.y})
              </text>

              {/* Test Point (Interactive Tracer Point) */}
              <circle cx={svgTestX} cy={svgTestY} r={5} fill="#0284C7" stroke="#FFFFFF" strokeWidth={2} />
              <text
                x={svgTestX + 6}
                y={svgTestY + 14}
                fill="#0369A1"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                P({testPointX}, {testPointY.toFixed(1)})
              </text>
            </svg>

            {/* Bottom guide */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-600 mt-2 px-2 border-t border-slate-100 pt-2 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                Grafik f(x)
              </span>
              <span className="flex items-center gap-1.5 text-sky-700">
                <span className="w-2.5 h-0.5 border-t-2 border-dashed border-sky-600 inline-block" />
                Sumbu Simetri x = {vertex.x}
              </span>
              <span className="flex items-center gap-1.5 text-blue-700">
                <span className="w-2 h-2 rounded-full bg-sky-600 inline-block" />
                Titik Uji P
              </span>
            </div>
          </div>

          {/* Slider & Inquiry Deck (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>KONTROL PARAMETER TRANSFORMASI</span>
              </div>

              {/* Slider a: Horizontal Shift */}
              <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="param-a-slider" className="text-slate-700 font-semibold">
                    Parameter <span className="font-mono text-indigo-700 font-bold">a</span> (Geser Horizontal):
                  </label>
                  <span className="font-mono text-sm font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    a = {aParam}
                  </span>
                </div>
                <input
                  id="param-a-slider"
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={aParam}
                  onChange={(e) => {
                    setAParam(parseInt(e.target.value));
                    sound.playTick();
                  }}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono font-medium">
                  <span>-5 (Kiri)</span>
                  <span>0</span>
                  <span>+5 (Kanan)</span>
                </div>
              </div>

              {/* Slider b: Vertical Shift */}
              <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="param-b-slider" className="text-slate-700 font-semibold">
                    Parameter <span className="font-mono text-teal-700 font-bold">b</span> (Geser Vertikal):
                  </label>
                  <span className="font-mono text-sm font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    b = {bParam}
                  </span>
                </div>
                <input
                  id="param-b-slider"
                  type="range"
                  min="-3"
                  max="5"
                  step="1"
                  value={bParam}
                  onChange={(e) => {
                    setBParam(parseInt(e.target.value));
                    sound.playTick();
                  }}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono font-medium">
                  <span>-3 (Turun)</span>
                  <span>0</span>
                  <span>+5 (Naik)</span>
                </div>
              </div>

              {/* Slider Test Point X */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="test-point-slider" className="text-slate-600 font-medium">
                    Titik Telusur <span className="font-mono text-sky-700 font-bold">x</span>:
                  </label>
                  <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    x = {testPointX} ⟹ y = {testPointY.toFixed(1)}
                  </span>
                </div>
                <input
                  id="test-point-slider"
                  type="range"
                  min="-6"
                  max="6"
                  step="0.5"
                  value={testPointX}
                  onChange={(e) => {
                    setTestPointX(parseFloat(e.target.value));
                    sound.playTick();
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>

              {/* Guided Inquiry Questions */}
              <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                <div className="text-slate-800 font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  Pertanyaan Reflektif:
                </div>

                <div>
                  <span className="text-slate-600 font-medium block mb-1">1. Apa yang dilakukan parameter a?</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setInquiryA('horizontal');
                        sound.playClick();
                      }}
                      className={`p-2 rounded-lg border text-left text-[11px] transition-all ${
                        inquiryA === 'horizontal'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      ✓ Menggeser grafik secara horizontal (kanan / kiri)
                    </button>
                    <button
                      onClick={() => {
                        setInquiryA('curv');
                        sound.playClick();
                      }}
                      className={`p-2 rounded-lg border text-left text-[11px] transition-all ${
                        inquiryA === 'curv'
                          ? 'bg-rose-50 border-rose-300 text-rose-800'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      ✕ Mengubah kemiringan sudut grafik
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-600 font-medium block mb-1">2. Apa yang dilakukan parameter b?</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setInquiryB('vertical');
                        sound.playClick();
                      }}
                      className={`p-2 rounded-lg border text-left text-[11px] transition-all ${
                        inquiryB === 'vertical'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      ✓ Menggeser grafik secara vertikal (naik / turun)
                    </button>
                    <button
                      onClick={() => {
                        setInquiryB('flip');
                        sound.playClick();
                      }}
                      className={`p-2 rounded-lg border text-left text-[11px] transition-all ${
                        inquiryB === 'flip'
                          ? 'bg-rose-50 border-rose-300 text-rose-800'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      ✕ Membalikkan grafik menjadi terbalik
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit / Reveal button */}
            <div className="pt-4 border-t border-slate-200 mt-4">
              <button
                onClick={handleReveal}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <span>LIHAT RANGKUMAN PENEMUAN GRAFIK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Discovery Box when revealed */}
        {isRevealed && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50 via-sky-50 to-white border-2 border-indigo-300 shadow-md space-y-4 animate-fade-in mt-6">
            <div className="flex items-center gap-2 text-indigo-800 text-xs font-mono font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Momen Penemuan Fundamental</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              OH... TERNYATA!
            </h3>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Grafik fungsi nilai mutlak selalu membentuk <strong className="text-indigo-800">huruf V simetris</strong>. Transformasi pergeseran posisi puncaknya dapat dibaca langsung dari rumusnya:
              </p>

              <div className="p-4 rounded-xl bg-white border border-indigo-200 font-mono text-center shadow-xs">
                <span className="text-xl sm:text-2xl font-bold text-indigo-700">
                  f(x) = |x - a| + b ⟹ Titik Balik di (a, b)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-indigo-700 font-bold font-sans block mb-1">Pergeseran Horizontal (a):</span>
                  |x - 3| menggeser ke KANAN 3 satuan (a = 3).
                  <br />
                  |x + 2| = |x - (-2)| menggeser ke KIRI 2 satuan (a = -2).
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-teal-700 font-bold font-sans block mb-1">Pergeseran Vertikal (b):</span>
                  + 4 menggeser NAIK 4 satuan (b = 4).
                  <br />
                  - 5 menggeser TURUN 5 satuan (b = -5).
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                <span>Lanjut ke 04. Final Mission (Robot Track)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
