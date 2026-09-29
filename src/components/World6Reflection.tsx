import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  HeartHandshake, 
  Copy, 
  Check, 
  BookMarked,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/audio';
import { UserReflection } from '../types';

interface World6Props {
  onComplete: () => void;
  onNext: () => void;
}

export const World6Reflection: React.FC<World6Props> = ({ onComplete, onNext }) => {
  const [rating, setRating] = useState<number>(4);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [reflectionData, setReflectionData] = useState<UserReflection>({
    understandingLevel: 4,
    priorBelief: 'Matematika dan fungsi hanyalah rumus angka hafalan di buku teks tanpa wujud fisik.',
    newRealization: 'Fungsi adalah model kenyataan: menentukan batas tanah nyata dan mengukur toleransi sensor robot.',
    absoluteValueInsight: 'Nilai mutlak adalah jarak geometris sejati yang menghapus arah tanda.',
    irrationalFunctionInsight: 'Bentuk akar kuadrat menuntut syarat fisik tak-negatif agar wujud di dunia real.',
    realLifeExample: 'Sensor parkir mobil mundur, batas aman drone, dan ukuran lahan taman arsitektur.',
    eurekaMoment: 'Ketika nilai mutlak menjadi "tameng" bagi fungsi akar pada Final Boss sehingga domainnya mencakup semua bilangan real!'
  });

  const ratingEmojis = [
    { level: 1, emoji: '😵', label: 'Masih Bingung' },
    { level: 2, emoji: '😐', label: 'Mulai Terbuka' },
    { level: 3, emoji: '🙂', label: 'Cukup Paham' },
    { level: 4, emoji: '😎', label: 'Paham Mendalam' },
    { level: 5, emoji: '🤩', label: 'OH... TERNYATA!' }
  ];

  const handleSaveReflection = () => {
    sound.playDiscovery();
    setIsSaved(true);
    onComplete();
  };

  const handleCopyCard = () => {
    sound.playClick();
    const textToCopy = `=== REFLEKSI PEMBELAJARAN MATEMATIKA: FUNCTION IN REAL LIFE ===
Skala Pemahaman: ${ratingEmojis[rating - 1].emoji} (${ratingEmojis[rating - 1].label})
1. Sebelum belajar: ${reflectionData.priorBelief}
2. Sekarang menyadari: ${reflectionData.newRealization}
3. Nilai mutlak ternyata: ${reflectionData.absoluteValueInsight}
4. Fungsi irasional ternyata: ${reflectionData.irrationalFunctionInsight}
5. Aplikasi kehidupan: ${reflectionData.realLifeExample}
6. Momen "OH... TERNYATA!": ${reflectionData.eurekaMoment}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Kicker */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold">
          <HeartHandshake className="w-4 h-4 text-teal-600" />
          <span>TAKE A MOMENT</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500 font-sans font-medium">Refleksi Pembelajaran Mendalam</span>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-teal-200/90 shadow-sm bg-white/95">
        {/* Atmosphere Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Take a Moment
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Berhentilah sejenak. Pembelajaran terbaik bukan tentang menghafal rumus, melainkan menyadari bagaimana caramu memandang dunia telah bertransformasi.
          </p>
        </div>

        {/* Emotion Rating Scale */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-teal-50/60 via-slate-50 to-emerald-50/60 border border-slate-200 text-center shadow-xs">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-600 mb-4">
            Bagaimana Perasaan Pemahamanmu Sekarang?
          </div>
          <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
            {ratingEmojis.map((r) => (
              <button
                key={r.level}
                onClick={() => {
                  sound.playClick();
                  setRating(r.level);
                  setReflectionData((prev) => ({ ...prev, understandingLevel: r.level }));
                }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${
                  rating === r.level
                    ? 'bg-teal-50 border-2 border-teal-500 scale-110 shadow-md'
                    : 'bg-white border border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100 shadow-2xs'
                }`}
              >
                <span className="text-3xl sm:text-4xl">{r.emoji}</span>
                <span className={`text-[11px] font-bold ${rating === r.level ? 'text-teal-800' : 'text-slate-500'}`}>
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Guided Reflection Prompts */}
        <div className="space-y-6 mb-8">
          {/* Prompt 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-2xs">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              1. "Sebelum belajar materi ini, saya mengira..."
            </label>
            <textarea
              rows={2}
              value={reflectionData.priorBelief}
              onChange={(e) => setReflectionData({ ...reflectionData, priorBelief: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-teal-500 font-sans shadow-2xs"
            />
          </div>

          {/* Prompt 2 */}
          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-2 shadow-2xs">
            <label className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
              2. "Sekarang saya menyadari bahwa matematika..."
            </label>
            <textarea
              rows={2}
              value={reflectionData.newRealization}
              onChange={(e) => setReflectionData({ ...reflectionData, newRealization: e.target.value })}
              className="w-full bg-white border border-teal-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-teal-500 font-sans shadow-2xs"
            />
          </div>

          {/* Dual insights: Nilai mutlak & Fungsi irasional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2 shadow-2xs">
              <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                3. "Nilai mutlak ternyata..."
              </label>
              <textarea
                rows={2}
                value={reflectionData.absoluteValueInsight}
                onChange={(e) => setReflectionData({ ...reflectionData, absoluteValueInsight: e.target.value })}
                className="w-full bg-white border border-emerald-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 shadow-2xs"
              />
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-2 shadow-2xs">
              <label className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
                4. "Fungsi irasional ternyata..."
              </label>
              <textarea
                rows={2}
                value={reflectionData.irrationalFunctionInsight}
                onChange={(e) => setReflectionData({ ...reflectionData, irrationalFunctionInsight: e.target.value })}
                className="w-full bg-white border border-sky-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Prompt 5 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-2xs">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              5. "Contoh penggunaan konsep ini dalam kehidupan sehari-hari adalah..."
            </label>
            <input
              type="text"
              value={reflectionData.realLifeExample}
              onChange={(e) => setReflectionData({ ...reflectionData, realLifeExample: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-teal-500 shadow-2xs"
            />
          </div>

          {/* Prompt 6: The "OH... TERNYATA!" highlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-teal-50/50 to-white border border-amber-200 space-y-2 shadow-xs">
            <label className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>6. "Hal yang paling membuat saya berkata OH... TERNYATA adalah..."</span>
            </label>
            <textarea
              rows={2}
              value={reflectionData.eurekaMoment}
              onChange={(e) => setReflectionData({ ...reflectionData, eurekaMoment: e.target.value })}
              className="w-full bg-white border border-amber-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-amber-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <button
            onClick={handleCopyCard}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Ringkasan Refleksi'}</span>
          </button>

          <div className="flex items-center gap-3">
            {!isSaved ? (
              <button
                onClick={handleSaveReflection}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <BookMarked className="w-4 h-4 text-white" />
                <span>SIMPAN REFLEKSI DIRI</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  onNext();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <span>Lanjut ke Asesmen 10 Soal</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
