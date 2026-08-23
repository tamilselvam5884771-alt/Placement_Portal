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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white font-display">Placement Hall of Fame</h3>
          <p className="text-xs text-slate-400 mt-1">Celebrating placed candidates & top CTC offers achieved.</p>
        </div>
        {canManageAll && (
          <button
            onClick={() => { setIsPlacementModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center gap-1.5 hover:bg-amber-400"
          >
            <Trophy className="w-4 h-4" /> Publish Placement Record
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-12 cosmo-glass-card rounded-3xl text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-400" /> Loading placements...
        </div>
      ) : placements.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center space-y-3 border border-amber-500/20">
          <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
          <div className="text-base font-bold text-white">No placement records published yet</div>
          <p className="text-xs text-slate-400">Coordinators can publish placed candidate offers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placements.map((plc) => (
            <div key={plc.id} className="cosmo-glass-card p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400 transition-all flex flex-col justify-between relative group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 font-display">
                    {plc.package || 'Confidential CTC'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Dept: {plc.department || 'CSE'}</span>
                </div>

                <h4 className="text-lg font-bold text-white">{plc.student_name}</h4>
                <div className="text-xs text-blue-400 font-semibold mt-0.5">{plc.role} @ {plc.company}</div>

                {plc.quote && (
                  <p className="text-xs text-slate-300 italic mt-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    "{plc.quote}"
                  </p>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>✦ Verified Placement</span>
                <PartyPopper className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
