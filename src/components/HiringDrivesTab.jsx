import React, { useState } from 'react';
import { ArrowRight, LayoutGrid, List, SlidersHorizontal, Search, Filter, Sparkles, Building2, MapPin } from 'lucide-react';

export default function HiringDrivesTab({ featuredDrives, currentDept, fireCelebration, showToast, playAudioFeedback }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list' | 'compact'
  const [minSalary, setMinSalary] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');

  // Extract numerical LPA from string e.g. "₹32.5 LPA" -> 32.5
  const getPackageNum = (pkgStr) => {
    const match = pkgStr.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const filteredDrives = featuredDrives.filter(drive => {
    const pkg = getPackageNum(drive.package);
    const matchesSalary = pkg >= minSalary;
    const matchesSearch = 
      drive.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchFilter.toLowerCase()) ||
      drive.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesSalary && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Flexibility Controls Bar */}
      <div className="cosmo-glass p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            Active Campus Placement Drives
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
              {filteredDrives.length} Drives
            </span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">One-click AI ATS resume evaluation & drive application desk.</p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search company, role or tech..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-rose-500/50 w-44 sm:w-56"
            />
          </div>

          {/* View Switchers */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => { setViewMode('grid'); playAudioFeedback?.('click'); }}
              className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setViewMode('list'); playAudioFeedback?.('click'); }}
              className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Salary Filter Slider Pill */}
      <div className="px-5 py-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Minimum CTC Salary Filter:</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            ≥ ₹{minSalary} LPA
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="40"
          step="5"
          value={minSalary}
          onChange={(e) => setMinSalary(Number(e.target.value))}
          className="w-48 accent-rose-600 cursor-pointer"
        />
      </div>

      {/* Drives Grid / List Render */}
      {filteredDrives.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
          No hiring drives match your search query or minimum package criteria.
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDrives.map((drive) => (
            <div key={drive.id} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 dark:hover:border-rose-500/40 transition-all relative group flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-bold text-rose-600 dark:text-rose-400 font-display text-base shadow-sm">
                      {drive.company[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-rose-600 dark:text-rose-400">{drive.company}</div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{drive.role}</h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400 font-display">{drive.package}</span>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {drive.location}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {drive.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600 dark:text-slate-400">AI ATS Match Index:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{drive.matchScore}% Match Rate</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Deadline: {drive.deadline}</span>
                <button
                  onClick={() => { fireCelebration(); showToast(`Applied for ${drive.company} ${drive.role}! AI Candidate ID generated.`); }}
                  className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>1-Click Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredDrives.map((drive) => (
            <div key={drive.id} className="cosmo-glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-bold text-rose-600 dark:text-rose-400 font-display">
                  {drive.company[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">{drive.company}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{drive.location}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{drive.role}</h4>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-extrabold text-rose-600 dark:text-rose-400">{drive.package}</div>
                  <div className="text-[10px] text-slate-400 font-mono">ATS: {drive.matchScore}%</div>
                </div>
                <button
                  onClick={() => { fireCelebration(); showToast(`Applied for ${drive.company} ${drive.role}!`); }}
                  className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all flex items-center gap-1"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

