import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HiringDrivesTab({ featuredDrives, currentDept, fireCelebration, showToast }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white font-display">Active Campus Placement Drives</h3>
          <p className="text-xs text-slate-400 mt-1">One-click AI ATS resume evaluation & drive application desk.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Department:</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20">{currentDept}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredDrives.map((drive) => (
          <div key={drive.id} className="cosmo-glass-card p-6 rounded-3xl border border-white/10 hover:border-blue-500/40 transition-all relative group flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white font-display text-sm">
                    {drive.company[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-400">{drive.company}</div>
                    <h4 className="text-base font-bold text-white mt-0.5">{drive.role}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-emerald-400 font-display">{drive.package}</span>
                  <div className="text-[10px] text-slate-500">{drive.location}</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {drive.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">AI ATS Match Index:</span>
                <span className="font-bold text-blue-300">{drive.matchScore}% Match Rate</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Deadline: {drive.deadline}</span>
              <button
                onClick={() => { fireCelebration(); showToast(`Applied for ${drive.company} ${drive.role}! AI Candidate ID generated.`); }}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <span>1-Click Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
