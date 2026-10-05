import React from 'react';
import { Menu, Search, RefreshCw, Palette, Sun, Moon, Bell, Zap, Shield } from 'lucide-react';

export default function TopHeader({
  activeTab,
  setIsSidebarOpen,
  setIsCommandOpen,
  playAudioFeedback,
  isSyncing,
  onRefreshData,
  currentDept,
  setCurrentDept,
  showToast,
  setIsThemeDrawerOpen,
  themeMode,
  setThemeMode,
  isNotificationDrawerOpen,
  setIsNotificationDrawerOpen,
  notices = []
}) {
  const getTabTitle = (tab) => {
    switch (tab) {
      case 'overview': return { title: 'Landing Page & AI Platform Overview', badge: 'Interactive Showcase' };
      case 'drives': return { title: 'Active Hiring Drives Portal', badge: '28 Recruiter Drives' };
      case 'resume_ai': return { title: 'AI ATS Resume Matcher & Optimizer', badge: 'Smart Scoring' };
      case 'prep_ai': return { title: 'Interview Prep Hub & AI Trainer', badge: 'Mock Tests & DSA' };
      case 'notices': return { title: 'Notices & Circular Broadcasts', badge: 'Realtime Alerts' };
      case 'resources': return { title: 'Learning Resources & Handbooks', badge: 'Study Vault' };
      case 'tasks': return { title: 'Placement Department Tasks', badge: 'Kanban Manager' };
      case 'placements': return { title: 'Placement Records & Hall of Fame', badge: 'Analytics 2026' };
      case 'pricing': return { title: 'Plans & Institution Pricing', badge: 'Flexible Tiers' };
      case 'faq': return { title: 'Frequently Asked Questions', badge: 'Help Center' };
      default: return { title: 'Placement Engine', badge: 'COSMOQ AI' };
    }
  };

  const currentInfo = getTabTitle(activeTab);

  return (
    <header className="sticky top-0 z-30 cosmo-glass border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu Trigger + Breadcrumb Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setIsSidebarOpen(true); playAudioFeedback?.('click'); }}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display truncate">
                {currentInfo.title}
              </h2>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                {currentInfo.badge}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden md:block">
              Dedicated section • Access via Left Navigation Bar
            </p>
          </div>
        </div>

        {/* Right Section: Controls & Triggers */}
        <div className="flex items-center gap-2 sm:gap-2.5">

          {/* Live Data Sync Button */}
          <button
            onClick={() => { onRefreshData?.(true); playAudioFeedback?.('click'); }}
            disabled={isSyncing}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:border-rose-500/40 transition-all shadow-xs"
            title="Force fetch fresh updates from Supabase"
          >
            <RefreshCw className={`w-3 h-3 text-rose-600 dark:text-rose-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isSyncing ? 'Syncing...' : 'Live Sync'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => { setIsCommandOpen(true); playAudioFeedback?.('click'); }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-rose-500/40 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xs group"
          >
            <Search className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search hub...</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Department Selector Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <select
              value={currentDept}
              onChange={(e) => {
                setCurrentDept(e.target.value);
                playAudioFeedback?.('click');
                showToast?.(`Department filter set to: ${e.target.value}`);
              }}
              className="bg-transparent text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
            >
              <option value="CSE" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Dept: CSE</option>
              <option value="ECE" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Dept: ECE</option>
              <option value="MECH" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Dept: Mech</option>
              <option value="CIVIL" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Dept: Civil</option>
              <option value="IT" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Dept: IT</option>
              <option value="EEE" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Dept: EEE</option>
            </select>
          </div>

          {/* Theme Customizer Drawer Trigger */}
          <button
            onClick={() => { setIsThemeDrawerOpen(true); playAudioFeedback?.('pop'); }}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all relative shadow-xs hover:scale-105 group"
            title="Theme Engine & Customizer"
          >
            <Palette className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* Quick Dark Mode Toggle */}
          <button
            onClick={() => {
              const newMode = themeMode === 'dark' ? 'light' : 'dark';
              setThemeMode(newMode);
              playAudioFeedback?.('click');
              showToast?.(`Switched to ${newMode === 'dark' ? 'Dark Cyber' : 'Light'} Mode`);
            }}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
            title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Notification Popover Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => { setIsNotificationDrawerOpen?.(prev => !prev); playAudioFeedback?.('click'); }}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative shadow-xs"
              title="Circulars & Broadcasts"
            >
              <Bell className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              {notices.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isNotificationDrawerOpen && (
              <div className="absolute right-0 mt-3 w-80 cosmo-glass-card rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-display">
                    <Zap className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Live AI Broadcasts
                  </span>
                  <span className="text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/20">
                    {notices.length} Total
                  </span>
                </div>
                <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                  {notices.length === 0 ? (
                    <div className="text-xs text-slate-500 dark:text-slate-400 py-4 text-center">No circulars posted yet</div>
                  ) : (
                    notices.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => { onRefreshData?.(); setIsNotificationDrawerOpen(false); }}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-rose-500/40 transition-colors cursor-pointer text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">{n.category}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">{n.created_at ? new Date(n.created_at).toLocaleDateString() : 'Just now'}</span>
                        </div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate mt-1 group-hover:text-rose-600 dark:group-hover:text-rose-400">{n.title}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
