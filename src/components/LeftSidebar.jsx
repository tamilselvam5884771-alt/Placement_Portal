import React from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Briefcase,
  Target,
  Brain,
  Bell,
  BookOpen,
  CheckSquare,
  Trophy,
  Tag,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Palette,
  Sun,
  Moon,
  Cpu,
  Zap,
  LogOut,
  X
} from 'lucide-react';

export default function LeftSidebar({
  activeTab,
  setActiveTab,
  playAudioFeedback,
  noticesCount = 0,
  drivesCount = 28,
  tasksCount = 0,
  currentRole,
  setCurrentRole,
  showToast,
  isSidebarOpen,
  setIsSidebarOpen,
  isCollapsed,
  setIsCollapsed
}) {
  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        {
          id: 'overview',
          label: 'Landing Page',
          icon: LayoutDashboard,
          badge: 'Live',
          badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
        }
      ]
    },
    {
      title: 'CORE AI RECRUITMENT',
      items: [
        {
          id: 'drives',
          label: 'Hiring Drives',
          icon: Briefcase,
          badge: `${drivesCount} Active`,
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        },
        {
          id: 'resume_ai',
          label: 'ATS Resume Matcher',
          icon: Target,
          badge: 'AI Score',
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        },
        {
          id: 'prep_ai',
          label: 'Interview Prep Hub',
          icon: Brain,
          badge: 'Mock AI',
          badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
        }
      ]
    },
    {
      title: 'CIRCULARS & KNOWLEDGE',
      items: [
        {
          id: 'notices',
          label: 'Notices & Circulars',
          icon: Bell,
          badge: noticesCount > 0 ? `${noticesCount} New` : null,
          badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
        },
        {
          id: 'resources',
          label: 'Learning Resources',
          icon: BookOpen,
          badge: 'PDFs',
          badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
        }
      ]
    },
    {
      title: 'OPERATIONS & STATS',
      items: [
        {
          id: 'tasks',
          label: 'Task Manager',
          icon: CheckSquare,
          badge: tasksCount > 0 ? `${tasksCount}` : null,
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
        },
        {
          id: 'placements',
          label: 'Placement Records',
          icon: Trophy,
          badge: '94.8%',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        }
      ]
    },
    {
      title: 'SYSTEM & SUPPORT',
      items: [
        {
          id: 'pricing',
          label: 'Pricing & Plans',
          icon: Tag,
          badge: null
        },
        {
          id: 'faq',
          label: 'FAQ & Help',
          icon: HelpCircle,
          badge: null
        }
      ]
    }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    playAudioFeedback?.('click');
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white/95 dark:bg-slate-900/95 border-r border-slate-200/90 dark:border-slate-800 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-72'} w-72 shadow-xl lg:shadow-none`}
      >
        {/* Sidebar Header: Logo & Branding */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 shrink-0">
          <div
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3.5 cursor-pointer group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-700 via-rose-600 to-pink-500 text-white flex items-center justify-center font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(225,29,72,0.35)] group-hover:scale-105 transition-transform shrink-0">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white font-display">
                    COSMOQ <span className="text-rose-600 dark:text-rose-400 font-light">AI</span>
                  </h1>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                </div>
                <span className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400 block truncate">
                  Placement & Hiring Engine
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-rose-500/40 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 no-scrollbar">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase font-mono">
                  {group.title}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all relative group ${
                        isActive
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/25 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      {/* Active Left Indicator Strip */}
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1 bg-rose-600 dark:bg-rose-400 rounded-r-full shadow-[0_0_10px_rgba(225,29,72,0.6)]" />
                      )}

                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      />

                      {!isCollapsed && (
                        <div className="flex-1 flex items-center justify-between truncate text-left">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`ml-2 px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${
                                item.badgeColor || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Role & User Info */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 shrink-0 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
          {!isCollapsed && (
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Active Role
                </span>
                <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase font-semibold">
                  {currentRole}
                </span>
              </div>
              <select
                value={currentRole}
                onChange={(e) => {
                  setCurrentRole(e.target.value);
                  playAudioFeedback?.('click');
                  showToast?.(`Role switched to: ${
                    e.target.value === 'hod' ? 'HOD (Executive Oversight)' :
                    e.target.value === 'coordinator' ? 'Placement Admin' :
                    e.target.value === 'club_student' ? 'Club Manager' :
                    'Candidate / Student'
                  }`);
                }}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="student">Candidate (Student)</option>
                <option value="club_student">Club Manager</option>
                <option value="coordinator">Placement Admin</option>
                <option value="hod">HOD (Oversight)</option>
              </select>
            </div>
          )}

          {/* User Profile Mini Bar */}
          <div className="flex items-center justify-between p-2 rounded-2xl bg-white/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                TH
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Tamil Hari</div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">Student Batch 2026</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
