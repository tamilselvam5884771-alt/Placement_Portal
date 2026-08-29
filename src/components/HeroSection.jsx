import React from 'react';
import { Sparkles, ChevronRight, ArrowRight, Play, Terminal, Bot, Zap } from 'lucide-react';

export default function HeroSection({
  setActiveTab,
  playAudioFeedback,
  setIsVideoModalOpen,
  noticesLength
}) {
  return (
    <section className="relative pt-12 pb-16 px-6 max-w-7xl mx-auto z-10">
      
      {/* Announcement Pill Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500/10 via-rose-500/15 to-pink-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 shadow-sm animate-float">
          <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          <span>✦ NEXT-GEN AI RECRUITMENT & PLACEMENT AGENTS 2.0</span>
          <ChevronRight className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
        </div>
      </div>

      {/* Hero Headline & Subtitle */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-display">
          Automate Campus Hiring & Placements with <span className="cosmo-gradient-crimson font-semibold">Autonomous AI Agents</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Empower candidates, placement officers, and tech recruiters with instant ATS resume scoring, multi-agent workflows, AI mock interviewers, and live drive orchestration.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => { setActiveTab('drives'); playAudioFeedback('click'); }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-700 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-[0_0_30px_rgba(225,29,72,0.4)] transition-all transform hover:scale-105 flex items-center gap-2.5"
          >
            <span>Explore AI Agent Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setIsVideoModalOpen(true); playAudioFeedback('click'); }}
            className="px-7 py-4 rounded-full border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all transform hover:scale-105 flex items-center gap-2.5 shadow-sm backdrop-blur-md"
          >
            <Play className="w-4 h-4 text-rose-600 dark:text-rose-400 fill-current" />
            <span>Watch Agent Workflow</span>
          </button>
        </div>
      </div>

      {/* Hero Terminal Widget */}
      <div className="mt-14 max-w-5xl mx-auto cosmo-glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl relative overflow-hidden">
        
        {/* Top Bar of Window */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-pink-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
            <span className="ml-3 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> cosmoq-agent-orchestrator --live
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> 12 AGENTS ONLINE
            </span>
          </div>
        </div>

        {/* Quick Metrics KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Placement Rate</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display flex items-baseline gap-1">
              94.8% <span className="text-xs text-rose-600 dark:text-rose-400 font-normal">↑ 8.2%</span>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Highest Package</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1 font-display">
              ₹48.5 <span className="text-xs font-normal text-slate-600 dark:text-slate-400">LPA</span>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">AI ATS Accuracy</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">
              99.2%
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Active Hiring Drives</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 dark:text-rose-400 mt-1 font-display">
              28 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Live</span>
            </div>
          </div>
        </div>

        {/* Terminal Activity */}
        <div className="pt-6 font-mono text-xs space-y-3 text-slate-300">
          <div className="flex items-start gap-3 bg-slate-900 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-200">
            <Bot className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-rose-300 font-bold">[Agent #1: Resume Intelligence Engine]</span>
                <span className="text-[10px] text-slate-400">12:44:02 PM</span>
              </div>
              <p className="text-slate-300 mt-0.5">Parsed 142 resumes for Google SDE-1 Drive. Top ATS match: Candidate #89 (96% Match score in Data Structures & System Architecture).</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-900 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-200">
            <Zap className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-rose-300 font-bold">[Agent #2: Circular & Notice Sync]</span>
                <span className="text-[10px] text-slate-400">12:44:18 PM</span>
              </div>
              <p className="text-slate-300 mt-0.5">Auto-published Microsoft Online Assessment Link notice to {noticesLength} student subscribers via Supabase real-time layer.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

