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
        <h2 className="text-2xl font-bold text-slate-900 font-display">Technical Interview Practice Engine</h2>
        <p className="text-xs text-slate-600">Master core concepts asked in top tech company placement rounds.</p>
      </div>

      <div className="cosmo-glass-card p-8 rounded-3xl border border-slate-200 text-center space-y-6 shadow-sm">
        <div className="text-xs font-mono text-rose-600 uppercase tracking-widest font-bold">
          Question {activePrepQuestionIndex + 1} of {flashcards.length}
        </div>

        <h3 className="text-xl font-bold text-slate-900 leading-relaxed">
          "{flashcards[activePrepQuestionIndex].q}"
        </h3>

        {showFlashcardAnswer ? (
          <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-sm text-rose-900 leading-relaxed text-left animate-in fade-in">
            <div className="font-bold text-xs uppercase text-rose-700 mb-2">AI Solution & Technical Explanation:</div>
            {flashcards[activePrepQuestionIndex].a}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-500">
            Click below to reveal full AI explanation & code example
          </div>
        )}

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => { setShowFlashcardAnswer(!showFlashcardAnswer); playAudioFeedback('click'); }}
            className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-md"
          >
            {showFlashcardAnswer ? 'Hide Explanation' : 'Reveal Solution'}
          </button>
          <button
            onClick={() => {
              setActivePrepQuestionIndex((prev) => (prev + 1) % flashcards.length);
              setShowFlashcardAnswer(false);
              playAudioFeedback('pop');
            }}
            className="px-6 py-3 rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 text-xs font-semibold transition-all shadow-sm"
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
}
