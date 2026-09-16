import React from 'react';

export default function PrepTab({
  flashcards,
  activePrepQuestionIndex,
  setActivePrepQuestionIndex,
  showFlashcardAnswer,
  setShowFlashcardAnswer,
  playAudioFeedback
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Technical Interview Practice Engine</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">Master core concepts asked in top tech company placement rounds.</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-rose-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((activePrepQuestionIndex + 1) / flashcards.length) * 100}%` }}
        />
      </div>

      <div className="cosmo-glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-rose-600 dark:text-rose-400 uppercase tracking-widest font-bold">
            Question {activePrepQuestionIndex + 1} of {flashcards.length}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
            Interview Prep
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-relaxed font-display">
          "{flashcards[activePrepQuestionIndex]?.q}"
        </h3>

        {showFlashcardAnswer ? (
          <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-sm text-rose-900 dark:text-rose-200 leading-relaxed text-left animate-fade-in-scale">
            <div className="font-bold text-xs uppercase text-rose-700 dark:text-rose-400 mb-2">AI Solution & Technical Explanation:</div>
            {flashcards[activePrepQuestionIndex]?.a}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            Click below to reveal full AI explanation & code example
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setActivePrepQuestionIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
              setShowFlashcardAnswer(false);
              playAudioFeedback('pop');
            }}
            className="px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold transition-all shadow-sm"
          >
            ← Previous
          </button>

          <button
            onClick={() => { setShowFlashcardAnswer(!showFlashcardAnswer); playAudioFeedback('click'); }}
            className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-md transform hover:scale-105"
          >
            {showFlashcardAnswer ? 'Hide Explanation' : 'Reveal Solution'}
          </button>

          <button
            onClick={() => {
              setActivePrepQuestionIndex((prev) => (prev + 1) % flashcards.length);
              setShowFlashcardAnswer(false);
              playAudioFeedback('pop');
            }}
            className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-all shadow-sm transform hover:scale-105"
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
}
