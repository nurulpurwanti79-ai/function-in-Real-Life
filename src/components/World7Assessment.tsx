import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Lightbulb, 
  BookOpen, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';
import { sound } from '../utils/audio';

interface World7Props {
  onComplete: () => void;
  onFinishCourse: () => void;
}

export const World7Assessment: React.FC<World7Props> = ({ onComplete, onFinishCourse }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | number>>({});
  const [numberInputVal, setNumberInputVal] = useState<string>('');
  
  // Assistance tier states per question:
  // hintLevel: 0 (none), 1 (hint1), 2 (hint2), 3 (concept)
  const [hintLevels, setHintLevels] = useState<Record<number, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const currentQ = ASSESSMENT_QUESTIONS[currentIndex];
  const isSubmitted = !!submittedQuestions[currentQ.id];
  const currentHintLevel = hintLevels[currentQ.id] || 0;
  const userAnswer = selectedAnswers[currentQ.id];

  // Validation
  const isCorrect = isSubmitted && (
    currentQ.type === 'number-input'
      ? parseFloat(String(userAnswer)) === parseFloat(String(currentQ.correctAnswer))
      : userAnswer === currentQ.correctAnswer
  );

  const handleSelectOption = (opt: string) => {
    if (isSubmitted && isCorrect) return; // already solved correctly
    sound.playClick();
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleSubmitCurrent = () => {
    let answerToSubmit = selectedAnswers[currentQ.id];

    if (currentQ.type === 'number-input') {
      const parsed = parseFloat(numberInputVal);
      if (isNaN(parsed)) {
        alert('Mohon masukkan angka yang valid.');
        return;
      }
      answerToSubmit = parsed;
      setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: parsed }));
    }

    if (answerToSubmit === undefined) {
      alert('Pilih atau masukkan jawabanmu terlebih dahulu.');
      return;
    }

    setSubmittedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));

    const correct = currentQ.type === 'number-input'
      ? parseFloat(String(answerToSubmit)) === parseFloat(String(currentQ.correctAnswer))
      : answerToSubmit === currentQ.correctAnswer;

    if (correct) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const handleTryAgain = () => {
    sound.playClick();
    setSubmittedQuestions((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleAdvanceHint = () => {
    sound.playClick();
    setHintLevels((prev) => ({
      ...prev,
      [currentQ.id]: Math.min((prev[currentQ.id] || 0) + 1, 3)
    }));
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setNumberInputVal('');
    } else {
      // Check if all submitted
      finishQuiz();
    }
  };

  const handlePrevQuestion = () => {
    sound.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setNumberInputVal('');
    }
  };

  const finishQuiz = () => {
    sound.playDiscovery();
    setIsQuizFinished(true);
    onComplete();
  };

  // Score calculation
  const totalCorrect = ASSESSMENT_QUESTIONS.filter((q) => {
    const ans = selectedAnswers[q.id];
    if (ans === undefined) return false;
    return q.type === 'number-input'
      ? parseFloat(String(ans)) === parseFloat(String(q.correctAnswer))
      : ans === q.correctAnswer;
  }).length;

  const scorePercentage = Math.round((totalCorrect / ASSESSMENT_QUESTIONS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Kicker */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold">
          <Award className="w-4 h-4 text-amber-600" />
          <span>ASESMEN FORMATIF</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-500 font-sans font-medium">10 Soal Berbobot dengan Bantuan Bertingkat</span>
        </div>

        {/* Question Counter */}
        <div className="text-xs font-mono text-slate-600 font-medium">
          Soal <span className="text-amber-700 font-bold">{currentIndex + 1}</span> dari {ASSESSMENT_QUESTIONS.length}
        </div>
      </div>

      {/* Main Assessment Container */}
      {!isQuizFinished ? (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-200 shadow-sm bg-white/95">
          
          {/* Question Dots Bar */}
          <div className="flex items-center justify-between gap-1 sm:gap-2 mb-6 pb-4 border-b border-slate-200 overflow-x-auto">
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const isSub = !!submittedQuestions[q.id];
              const ans = selectedAnswers[q.id];
              const isQCorrect = isSub && (
                q.type === 'number-input'
                  ? parseFloat(String(ans)) === parseFloat(String(q.correctAnswer))
                  : ans === q.correctAnswer
              );
              const isActive = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    sound.playClick();
                    setCurrentIndex(idx);
                    setNumberInputVal('');
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'ring-2 ring-amber-500 bg-amber-500 text-white font-black scale-105 shadow-xs'
                      : isSub
                      ? isQCorrect
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Scenario & Category */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-md shadow-2xs">
                {currentQ.category}
              </span>
              <span className="text-xs text-slate-500 font-mono font-medium">
                Tipe: {currentQ.type === 'number-input' ? 'Isian Angka' : currentQ.type === 'true-false' ? 'Benar / Salah' : 'Pilihan Ganda'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 mb-4 leading-relaxed font-sans shadow-2xs">
              <strong className="text-slate-900 block mb-1">Konteks / Skenario:</strong>
              {currentQ.scenario}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Inputs */}
          <div className="space-y-3 mb-6">
            {currentQ.type === 'multiple-choice' || currentQ.type === 'true-false' ? (
              <div className="space-y-2.5">
                {currentQ.options?.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt;
                  return (
                    <button
                      key={oIdx}
                      disabled={isSubmitted && isCorrect}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-start gap-3 ${
                        isSelected
                          ? isSubmitted
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium'
                              : 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-amber-50 border-amber-400 text-slate-900 font-medium shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center text-xs ${
                          isSelected
                            ? isSubmitted
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-600 text-white font-bold'
                                : 'border-rose-400 bg-rose-500 text-white font-bold'
                              : 'border-amber-500 bg-amber-500 text-white font-bold'
                            : 'border-slate-300 bg-slate-50'
                        }`}
                      >
                        {isSelected ? '✓' : ''}
                      </div>
                      <span className="font-sans leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Number input */
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
                <label className="text-xs text-slate-600 font-semibold block font-sans">
                  Masukkan jawaban berupa angka bilangan:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    disabled={isSubmitted && isCorrect}
                    value={numberInputVal || (userAnswer !== undefined ? String(userAnswer) : '')}
                    onChange={(e) => setNumberInputVal(e.target.value)}
                    placeholder="Ketik angka..."
                    className="w-48 px-4 py-2.5 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:border-amber-500 shadow-2xs"
                  />
                  {!isSubmitted && (
                    <button
                      onClick={handleSubmitCurrent}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Periksa Angka
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button for Choice Questions */}
          {currentQ.type !== 'number-input' && !isSubmitted && (
            <div className="mb-6">
              <button
                disabled={selectedAnswers[currentQ.id] === undefined}
                onClick={handleSubmitCurrent}
                className="px-6 py-3 bg-amber-500 disabled:opacity-40 hover:bg-amber-400 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Kirim Jawaban
              </button>
            </div>
          )}

          {/* Feedback & Multi-tier Assistance Box */}
          {isSubmitted && (
            <div className="mb-6 space-y-4 animate-fade-in">
              {/* Result banner */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 shadow-2xs ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="text-xs sm:text-sm space-y-1">
                  <div className="font-bold">
                    {isCorrect ? 'Luar Biasa, Jawabanmu Benar!' : 'Jawabanmu Belum Tepat.'}
                  </div>
                  <div className="text-slate-700">{currentQ.explanation}</div>
                </div>
              </div>

              {/* Try Again & Multi-Tier Assistance */}
              {!isCorrect && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <button
                      onClick={handleTryAgain}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200 transition-colors shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Coba Lagi (Try Again)</span>
                    </button>

                    {currentHintLevel < 3 && (
                      <button
                        onClick={handleAdvanceHint}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold transition-colors shadow-2xs"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          {currentHintLevel === 0 ? 'Buka Hint 1' : currentHintLevel === 1 ? 'Buka Hint 2' : 'Buka Pembahasan Konsep'}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Hint 1 Display */}
                  {currentHintLevel >= 1 && (
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 shadow-2xs">
                      <span className="font-mono font-bold text-amber-800 shrink-0">[HINT 1]:</span>
                      <span>{currentQ.hint1}</span>
                    </div>
                  )}

                  {/* Hint 2 Display */}
                  {currentHintLevel >= 2 && (
                    <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-start gap-2 shadow-2xs">
                      <span className="font-mono font-bold text-teal-800 shrink-0">[HINT 2]:</span>
                      <span>{currentQ.hint2}</span>
                    </div>
                  )}

                  {/* Full Concept Display */}
                  {currentHintLevel >= 3 && (
                    <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300 text-xs text-emerald-950 flex items-start gap-2 shadow-2xs">
                      <BookOpen className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-800 block mb-1">Rangkuman Konsep:</strong>
                        <span className="text-slate-700 leading-relaxed">{currentQ.conceptSummary}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation controls between questions */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              disabled={currentIndex === 0}
              onClick={handlePrevQuestion}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 disabled:opacity-40 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentIndex < ASSESSMENT_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <span>Soal Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={finishQuiz}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white rounded-xl text-xs font-black shadow-md transition-all"
              >
                <span>SELESAIKAN & LIHAT RAPOR</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary View */
        <div className="glass-panel-elevated rounded-3xl p-8 sm:p-12 text-center border border-amber-300 space-y-6 animate-fade-in shadow-xl bg-white/95">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2 shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-800 font-bold">
              HASIL EVALUASI ASESMEN
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Investigasi Lengkap!
            </h2>
          </div>

          {/* Score Circle */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto space-y-2 shadow-xs">
            <div className="text-xs text-slate-500 font-semibold">Skor Pemahamanmu:</div>
            <div className="text-5xl font-black font-mono text-emerald-600 tabular-nums">
              {scorePercentage}%
            </div>
            <div className="text-xs font-mono text-slate-600 font-medium">
              {totalCorrect} dari 10 Pertanyaan Dijawab dengan Benar
            </div>
          </div>

          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {scorePercentage >= 80
              ? 'Luar biasa! Kamu telah menguasai esensi fungsi irasional, sifat nilai mutlak, serta bagaimana keduanya berinteraksi dalam permasalahan dunia nyata.'
              : scorePercentage >= 60
              ? 'Bagus sekali! Pemahaman dasarmu sudah kokoh. Kamu selalu dapat meninjau kembali petunjuk atau mengeksplorasi ulang simulasi di peta misi.'
              : 'Terima kasih atas usahamu! Belajar matematika adalah proses penyelidikan yang berulang. Jangan ragu meninjau kembali Root Lab dan Graph Lab.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                sound.playClick();
                setIsQuizFinished(false);
                setCurrentIndex(0);
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
            >
              Tinjau Soal Kembali
            </button>

            <button
              onClick={() => {
                sound.playDiscovery();
                onFinishCourse();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-md transition-all"
            >
              <Award className="w-4 h-4 text-white" />
              <span>LIHAT SERTIFIKAT & LENCANA</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
