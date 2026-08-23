import React from 'react';
import { Cpu, Search, Bell, Shield, Zap } from 'lucide-react';

export default function Navbar({
  setActiveTab,
  playAudioFeedback,
  setIsCommandOpen,
  currentDept,
  setCurrentDept,
  showToast,
  setIsNotificationDrawerOpen,
  isNotificationDrawerOpen,
  notices,
  bookmarkedNotices,
  toggleBookmark,
  currentRole,
  setCurrentRole
}) {
  return (
    <header className="sticky top-0 z-40 cosmo-glass border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & COSMOQ Title */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setActiveTab('overview'); playAudioFeedback('click'); }}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white font-display">
                COSMOQ <span className="text-blue-400 font-light">AI</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> AGENTS ACTIVE
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-wider text-slate-400 block">
              Placement & Autonomous Hiring Engine
            </span>
          </div>
        </div>

        {/* Quick Controls */}
        <div className="flex items-center gap-3">
          
          {/* Command Palette Trigger */}
          <button
            onClick={() => { setIsCommandOpen(true); playAudioFeedback('click'); }}
            className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-slate-300 hover:border-blue-500/40 hover:bg-white/10 hover:text-white transition-all shadow-sm group"
          >
            <Search className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Search agent hub...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Department Selector Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-slate-900/60 text-xs font-semibold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <select
              value={currentDept}
              onChange={(e) => {
                setCurrentDept(e.target.value);
                playAudioFeedback('click');
                showToast(`Department filter set to: ${e.target.value}`);
              }}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="CSE" className="bg-slate-900">Dept: CSE</option>
              <option value="ECE" className="bg-slate-900">Dept: ECE</option>
              <option value="MECH" className="bg-slate-900">Dept: Mech</option>
              <option value="CIVIL" className="bg-slate-900">Dept: Civil</option>
              <option value="IT" className="bg-slate-900">Dept: IT</option>
              <option value="EEE" className="bg-slate-900">Dept: EEE</option>
            </select>
          </div>

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => { setIsNotificationDrawerOpen(prev => !prev); playAudioFeedback('click'); }}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors relative"
              title="Circulars & Notices"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {notices.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
              )}
            </button>

            {/* Notification Drawer Dropdown */}
            {isNotificationDrawerOpen && (
              <div className="absolute right-0 mt-3 w-80 cosmo-glass-card rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border border-white/10">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Live AI Broadcasts
                  </span>
                  <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                    {notices.length} Total
                  </span>
                </div>
                <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {notices.length === 0 ? (
                    <div className="text-xs text-slate-400 py-4 text-center">No circulars posted yet</div>
                  ) : (
                    notices.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => { setActiveTab('notices'); setIsNotificationDrawerOpen(false); }}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/40 transition-colors cursor-pointer text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{n.category}</span>
                          <span className="text-[10px] text-slate-500">{n.created_at ? new Date(n.created_at).toLocaleDateString() : 'Just now'}</span>
                        </div>
                        <div className="text-xs font-semibold text-slate-200 truncate mt-1 group-hover:text-blue-300">{n.title}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Role Matrix Switcher */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 pl-3.5 shadow-sm hover:border-blue-500/40 transition-colors">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <select 
              value={currentRole} 
              onChange={(e) => {
                setCurrentRole(e.target.value);
                playAudioFeedback('click');
                showToast(`Role switched to: ${
                  e.target.value === 'hod' ? 'HOD (Executive Oversight)' :
                  e.target.value === 'coordinator' ? 'Placement Admin' :
                  e.target.value === 'club_student' ? 'Club Manager' :
                  'Candidate / Student'
                }`);
              }}
              className="bg-transparent text-xs font-bold text-white focus:outline-none pr-2 cursor-pointer capitalize"
            >
              <option value="student" className="bg-slate-900">Role: Candidate (Student)</option>
              <option value="club_student" className="bg-slate-900">Role: Club Manager</option>
              <option value="coordinator" className="bg-slate-900">Role: Placement Admin</option>
              <option value="hod" className="bg-slate-900">Role: HOD (Executive Oversight)</option>
            </select>
          </div>

        </div>
      </div>
    </header>
  );
}
