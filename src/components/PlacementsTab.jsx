import React from 'react';
import { Trophy, Loader2, PartyPopper } from 'lucide-react';

export default function PlacementsTab({
  placements,
  loading,
  canManageAll,
  setIsPlacementModalOpen,
  playAudioFeedback
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Placement Hall of Fame</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Celebrating placed candidates & top CTC offers achieved.</p>
        </div>
        {canManageAll && (
          <button
            onClick={() => { setIsPlacementModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs transition-all shadow-lg flex items-center gap-1.5 hover:bg-rose-500 self-start sm:self-auto transform hover:scale-105"
          >
            <Trophy className="w-4 h-4" /> Publish Placement Record
          </button>
        )}
      </div>

      {/* Stats Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="cosmo-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Offers Published</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5 font-display">{placements.length} Candidates</div>
        </div>
        <div className="cosmo-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Highest Package Achieved</div>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-0.5 font-display">₹48.5 LPA</div>
        </div>
        <div className="cosmo-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Avg Candidate Offer</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5 font-display">₹12.4 LPA</div>
        </div>
      </div>

      {loading ? (
        <div className="p-12 cosmo-glass-card rounded-3xl text-center text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-rose-600 dark:text-rose-400" /> Loading placements...
        </div>
      ) : placements.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center space-y-3 border border-rose-500/20 shadow-sm">
          <Trophy className="w-10 h-10 text-rose-600 dark:text-rose-400 mx-auto" />
          <div className="text-base font-bold text-slate-900 dark:text-white">No placement records published yet</div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Coordinators can publish placed candidate offers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placements.map((plc) => (
            <div key={plc.id} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between relative group shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-display">
                    {plc.package || 'Confidential CTC'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Dept: {plc.department || 'CSE'}</span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{plc.student_name}</h4>
                <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-0.5">{plc.role} @ {plc.company}</div>

                {plc.quote && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic mt-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 leading-relaxed">
                    "{plc.quote}"
                  </p>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>✦ Verified Placement</span>
                <PartyPopper className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
