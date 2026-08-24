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
    <header className="sticky top-0 z-40 cosmo-glass border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo & COSMOQ Title */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setActiveTab('overview'); playAudioFeedback('click'); }}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-500 text-white flex items-center justify-center font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(225,29,72,0.3)] group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 font-display">
                COSMOQ <span className="text-rose-600 font-light">AI</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" /> AGENTS ACTIVE
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-wider text-slate-500 block">
              Placement & Autonomous Hiring Engine
            </span>
          </div>
        </div>

        {/* Quick Controls */}
        <div className="flex items-center gap-3">
          
          {/* Command Palette Trigger */}
          <button
            onClick={() => { setIsCommandOpen(true); playAudioFeedback('click'); }}
            className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full border border-slate-200 bg-white/90 text-xs font-medium text-slate-700 hover:border-rose-500/40 hover:bg-white hover:text-slate-900 transition-all shadow-sm group"
          >
            <Search className="w-3.5 h-3.5 text-rose-600 group-hover:scale-110 transition-transform" />
            <span>Search agent hub...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600">
              ⌘K
            </kbd>
          </button>

          {/* Department Selector Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <select
              value={currentDept}
              onChange={(e) => {
                setCurrentDept(e.target.value);
                playAudioFeedback('click');
                showToast(`Department filter set to: ${e.target.value}`);
              }}
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="CSE" className="bg-white text-slate-900">Dept: CSE</option>
              <option value="ECE" className="bg-white text-slate-900">Dept: ECE</option>
              <option value="MECH" className="bg-white text-slate-900">Dept: Mech</option>
              <option value="CIVIL" className="bg-white text-slate-900">Dept: Civil</option>
              <option value="IT" className="bg-white text-slate-900">Dept: IT</option>
              <option value="EEE" className="bg-white text-slate-900">Dept: EEE</option>
            </select>
          </div>

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => { setIsNotificationDrawerOpen(prev => !prev); playAudioFeedback('click'); }}
              className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors relative shadow-sm"
              title="Circulars & Notices"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              {notices.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notification Drawer Dropdown */}
            {isNotificationDrawerOpen && (
              <div className="absolute right-0 mt-3 w-80 cosmo-glass-card rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border border-slate-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-rose-600" /> Live AI Broadcasts
                  </span>
                  <span className="text-[10px] font-bold bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded-full border border-rose-500/20">
                    {notices.length} Total
                  </span>
                </div>
                <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {notices.length === 0 ? (
                    <div className="text-xs text-slate-500 py-4 text-center">No circulars posted yet</div>
                  ) : (
                    notices.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => { setActiveTab('notices'); setIsNotificationDrawerOpen(false); }}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-rose-500/40 transition-colors cursor-pointer text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">{n.category}</span>
                          <span className="text-[10px] text-slate-400">{n.created_at ? new Date(n.created_at).toLocaleDateString() : 'Just now'}</span>
                        </div>
                        <div className="text-xs font-semibold text-slate-800 truncate mt-1 group-hover:text-rose-600">{n.title}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Role Matrix Switcher */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full p-1 pl-3.5 shadow-sm hover:border-rose-500/40 transition-colors">
            <Shield className="w-3.5 h-3.5 text-rose-600" />
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
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none pr-2 cursor-pointer capitalize"
            >
              <option value="student" className="bg-white text-slate-900">Role: Candidate (Student)</option>
              <option value="club_student" className="bg-white text-slate-900">Role: Club Manager</option>
              <option value="coordinator" className="bg-white text-slate-900">Role: Placement Admin</option>
              <option value="hod" className="bg-white text-slate-900">Role: HOD (Executive Oversight)</option>
            </select>
          </div>

        </div>
      </div>
    </header>
  );
}
