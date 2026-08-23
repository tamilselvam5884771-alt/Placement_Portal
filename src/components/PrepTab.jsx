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
        <h2 className="text-2xl font-bold text-white font-display">Technical Interview Practice Engine</h2>
        <p className="text-xs text-slate-400">Master core concepts asked in top tech company placement rounds.</p>
      </div>

      <div className="cosmo-glass-card p-8 rounded-3xl border border-white/10 text-center space-y-6">
        <div className="text-xs font-mono text-blue-400 uppercase tracking-widest">
          Question {activePrepQuestionIndex + 1} of {flashcards.length}
        </div>

        <h3 className="text-xl font-bold text-white leading-relaxed">
          "{flashcards[activePrepQuestionIndex].q}"
        </h3>

        {showFlashcardAnswer ? (
          <div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-500/40 text-sm text-blue-200 leading-relaxed text-left animate-in fade-in">
            <div className="font-bold text-xs uppercase text-blue-400 mb-2">AI Solution & Technical Explanation:</div>
            {flashcards[activePrepQuestionIndex].a}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-white/10 text-xs text-slate-500">
            Click below to reveal full AI explanation & code example
          </div>
        )}

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => { setShowFlashcardAnswer(!showFlashcardAnswer); playAudioFeedback('click'); }}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md"
          >
            {showFlashcardAnswer ? 'Hide Explanation' : 'Reveal Solution'}
          </button>
          <button
            onClick={() => {
              setActivePrepQuestionIndex((prev) => (prev + 1) % flashcards.length);
              setShowFlashcardAnswer(false);
              playAudioFeedback('pop');
            }}
            className="px-6 py-3 rounded-full border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 text-xs font-semibold transition-all"
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
}
