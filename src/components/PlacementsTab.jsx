import React, { useState } from 'react';
import { Trophy, PartyPopper, Search, Sparkles, Building2, Quote } from 'lucide-react';

export default function PlacementsTab({
  placements,
  loading,
  canManageAll,
  setIsPlacementModalOpen,
  playAudioFeedback
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlacements = placements.filter(plc =>
    plc.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plc.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plc.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Placement Hall of Fame</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
              {filteredPlacements.length} Candidates
            </span>
          </div>
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
        <div className="cosmo-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Offers Logged</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">{placements.length} Candidates</div>
          <Sparkles className="w-6 h-6 text-rose-500/30 absolute right-4 bottom-4" />
        </div>
        <div className="cosmo-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Highest Package Achieved</div>
          <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1 font-display">₹48.5 LPA</div>
          <Trophy className="w-6 h-6 text-rose-500/30 absolute right-4 bottom-4" />
        </div>
        <div className="cosmo-glass p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Avg Candidate Offer</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">₹12.4 LPA</div>
          <Building2 className="w-6 h-6 text-rose-500/30 absolute right-4 bottom-4" />
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="cosmo-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name, company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 animate-shimmer space-y-4">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/4" />
              <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/2" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredPlacements.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center space-y-3 border border-rose-500/20 shadow-sm">
          <Trophy className="w-10 h-10 text-rose-600 dark:text-rose-400 mx-auto" />
          <div className="text-base font-bold text-slate-900 dark:text-white">No placement records found</div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Coordinators can publish placed candidate offers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPlacements.map((plc) => (
            <div key={plc.id} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between relative group shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-display">
                    {plc.package || 'Confidential CTC'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Dept: {plc.department || 'CSE'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center font-display shadow-xs">
                    {plc.student_name ? plc.student_name[0] : 'S'}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{plc.student_name}</h4>
                    <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-0.5">{plc.role} @ {plc.company}</div>
                  </div>
                </div>

                {plc.quote && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 relative">
                    <Quote className="w-3.5 h-3.5 text-rose-500/40 mb-1" />
                    <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      "{plc.quote}"
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                  <Sparkles className="w-3 h-3" /> Verified Candidate Offer
                </span>
                <PartyPopper className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
