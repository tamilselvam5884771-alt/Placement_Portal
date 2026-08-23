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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/30 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-float">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>✦ NEXT-GEN AI RECRUITMENT & PLACEMENT AGENTS 2.0</span>
          <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
        </div>
      </div>

      {/* Hero Headline & Subtitle */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
          Automate Campus Hiring & Placements with <span className="cosmo-gradient-blue font-semibold">Autonomous AI Agents</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Empower candidates, placement officers, and tech recruiters with instant ATS resume scoring, multi-agent workflows, AI mock interviewers, and live drive orchestration.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => { setActiveTab('drives'); playAudioFeedback('click'); }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all transform hover:scale-105 flex items-center gap-2.5"
          >
            <span>Explore AI Agent Desk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setIsVideoModalOpen(true); playAudioFeedback('click'); }}
            className="px-7 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all transform hover:scale-105 flex items-center gap-2.5 backdrop-blur-md"
          >
            <Play className="w-4 h-4 text-blue-400 fill-current" />
            <span>Watch Agent Workflow</span>
          </button>
        </div>
      </div>

      {/* Hero Terminal Widget */}
      <div className="mt-14 max-w-5xl mx-auto cosmo-glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Top Bar of Window */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" /> cosmoq-agent-orchestrator --live
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 12 AGENTS ONLINE
            </span>
          </div>
        </div>

        {/* Quick Metrics KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Placement Rate</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display flex items-baseline gap-1">
              94.8% <span className="text-xs text-emerald-400 font-normal">↑ 8.2%</span>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Highest Package</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mt-1 font-display">
              ₹48.5 <span className="text-xs font-normal text-slate-300">LPA</span>
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">AI ATS Accuracy</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
              99.2%
            </div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Active Hiring Drives</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 font-display">
              28 <span className="text-xs font-normal text-slate-400">Live</span>
            </div>
          </div>
        </div>

        {/* Terminal Activity */}
        <div className="pt-6 font-mono text-xs space-y-3 text-slate-300">
          <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
            <Bot className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-bold">[Agent #1: Resume Intelligence Engine]</span>
                <span className="text-[10px] text-slate-500">12:44:02 PM</span>
              </div>
              <p className="text-slate-400 mt-0.5">Parsed 142 resumes for Google SDE-1 Drive. Top ATS match: Candidate #89 (96% Match score in Data Structures & System Architecture).</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-amber-300 font-bold">[Agent #2: Circular & Notice Sync]</span>
                <span className="text-[10px] text-slate-500">12:44:18 PM</span>
              </div>
              <p className="text-slate-400 mt-0.5">Auto-published Microsoft Online Assessment Link notice to {noticesLength} student subscribers via Supabase real-time layer.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
