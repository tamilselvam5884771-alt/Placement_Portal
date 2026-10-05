import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronRight,
  ArrowRight,
  Play,
  Terminal,
  Bot,
  Zap,
  Target,
  Brain,
  Bell,
  BookOpen,
  CheckSquare,
  Trophy,
  CheckCircle2,
  Activity,
  Code2,
  Sliders,
  Shield,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
  Command,
  Building2,
  Users,
  TrendingUp,
  Cpu,
  Layers,
  Star,
  Quote
} from 'lucide-react';

import PartnerMarquee from './PartnerMarquee';
import PricingSection from './PricingSection';
import FaqSection from './FaqSection';

export default function LandingPage({
  setActiveTab,
  playAudioFeedback,
  setIsVideoModalOpen,
  setIsCommandOpen,
  notices = [],
  loading = false,
  canPostNotices = false,
  bookmarkedNotices = [],
  toggleBookmark,
  agentRules = [],
  toggleAgentRule,
  flashcards = [],
  activePrepQuestionIndex = 0,
  setActivePrepQuestionIndex,
  showFlashcardAnswer = false,
  setShowFlashcardAnswer,
  openFaqIndex = 0,
  setOpenFaqIndex,
  billingCycle = 'annual',
  setBillingCycle,
  fireCelebration,
  showToast,
  placements = []
}) {
  // Animated badge typing/rotation text effect
  const words = ['AI ATS RESUME SCORING', 'AUTONOMOUS RECRUITING AGENTS', 'MOCK INTERVIEW TRAINER', 'LIVE DRIVE ORCHESTRATION'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const featureCards = [
    {
      id: 'drives',
      title: 'Active Hiring Drives',
      desc: 'Explore 28+ top recruiter drives with match scores, package tags, and instant application tracking.',
      icon: Building2,
      badge: '28 Live Drives',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      glow: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      btnText: 'Browse Hiring Drives',
      highlights: ['Google, Microsoft, NVIDIA drives', 'Realtime slot booking', 'Filter by department & package']
    },
    {
      id: 'resume_ai',
      title: 'ATS Resume Matcher',
      desc: 'Instant AI resume analysis against target job descriptions with keyword gap detection and score optimization.',
      icon: Target,
      badge: '99.2% Accuracy',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
      glow: 'hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)]',
      btnText: 'Launch ATS Scanner',
      highlights: ['Parsing algorithms & ATS scoring', 'Missing keyword alerts', 'One-click formatting recommendations']
    },
    {
      id: 'prep_ai',
      title: 'Interview Prep Hub',
      desc: 'Interactive AI mock interview trainer, DSA flashcards, system design templates, and STAR method guides.',
      icon: Brain,
      badge: 'AI Mock Bot',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      glow: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
      btnText: 'Practice Mock Tests',
      highlights: ['100+ Algorithmic flashcards', 'Behavioral STAR trainer', 'Realtime AI solution reveals']
    },
    {
      id: 'notices',
      title: 'Notices & Circulars',
      desc: 'Realtime announcements with category badges, priority alerts, Supabase sync, and bookmarking vault.',
      icon: Bell,
      badge: 'Live Broadcast',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      glow: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
      btnText: 'View Circular Board',
      highlights: ['Instant circular pushes', 'Multi-channel broadcast', 'Category & tag filtering']
    },
    {
      id: 'resources',
      title: 'Learning Resources',
      desc: 'Curated technical handbooks, aptitude guides, interview cheat sheets, and downloadable preparation kits.',
      icon: BookOpen,
      badge: 'Study Vault',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      glow: 'hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
      btnText: 'Access Study Vault',
      highlights: ['System design handbooks', 'Top 100 DSA pattern guide', 'PDF & resource downloads']
    },
    {
      id: 'placements',
      title: 'Placement Analytics',
      desc: 'Comprehensive placement statistics, department-wise CTC trends, hall of fame, and success stories.',
      icon: Trophy,
      badge: '94.8% Rate',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      glow: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      btnText: 'View Placement Records',
      highlights: ['Highest CTC ₹48.5 LPA', 'Branch distribution graphs', 'Student testimonials']
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'ATS Resume Scoring',
      desc: 'Candidate submits resume. AI Agent evaluates keywords, layout, and tech stack match against live job specs.',
      icon: Target
    },
    {
      step: '02',
      title: 'AI Mock Assessment',
      desc: 'Candidates above target ATS threshold receive automated technical and system design screening links.',
      icon: Brain
    },
    {
      step: '03',
      title: 'Drive Orchestration',
      desc: 'Placement admins configure interview slots, coordinate recruiters, and sync candidate pipelines in real-time.',
      icon: Cpu
    },
    {
      step: '04',
      title: 'Verified Offer Logging',
      desc: 'Offers are validated, recorded in Supabase, and celebrated on the Placement Hall of Fame ticker.',
      icon: Trophy
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* SECTION 1: ANIMATED HERO BANNER */}
      <section className="relative pt-8 pb-12 px-4 sm:px-6 max-w-7xl mx-auto z-10">
        
        {/* Floating Animated Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500/10 via-pink-500/15 to-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 shadow-md animate-float">
            <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-mono font-bold tracking-wider">✦ {words[wordIndex]}</span>
            <ChevronRight className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          </div>
        </div>

        {/* Hero Main Headline */}
        <div className="text-center max-w-5xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-display">
            Automate Campus Hiring & Placements with{' '}
            <span className="cosmo-gradient-crimson font-semibold">Autonomous AI Agents</span>
          </h1>
          
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A unified intelligence portal empowering candidates, placement officers, and tech recruiters with instant ATS scoring, live hiring drive orchestration, AI mock interviews, and circular broadcasts.
          </p>

          {/* Quick Action Navigation CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => { setActiveTab('drives'); playAudioFeedback?.('click'); }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-700 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-[0_0_30px_rgba(225,29,72,0.4)] transition-all transform hover:scale-105 flex items-center gap-2.5 cursor-pointer"
            >
              <span>Explore Hiring Drives</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setActiveTab('resume_ai'); playAudioFeedback?.('click'); }}
              className="px-7 py-4 rounded-full border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold text-sm transition-all transform hover:scale-105 flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Target className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Launch ATS Matcher</span>
            </button>

            <button
              onClick={() => { setIsVideoModalOpen(true); playAudioFeedback?.('click'); }}
              className="px-7 py-4 rounded-full border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all transform hover:scale-105 flex items-center gap-2.5 shadow-sm backdrop-blur-md cursor-pointer"
            >
              <Play className="w-4 h-4 text-rose-600 dark:text-rose-400 fill-current" />
              <span>Watch Agent Demo</span>
            </button>
          </div>
        </div>

        {/* Animated Terminal & Metric Bar */}
        <div className="mt-14 max-w-5xl mx-auto cosmo-glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Top Bar of Terminal Window */}
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
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> 12 AGENTS ONLINE
              </span>
            </div>
          </div>

          {/* Quick Animated Metric KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-rose-500/40 transition-all">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Placement Rate</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display flex items-baseline gap-1">
                94.8% <span className="text-xs text-emerald-600 font-normal">↑ 8.2%</span>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-rose-500/40 transition-all">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Highest Package</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-1 font-display">
                ₹48.5 <span className="text-xs font-normal text-slate-600 dark:text-slate-400">LPA</span>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-rose-500/40 transition-all">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">AI ATS Accuracy</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">
                99.2%
              </div>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-rose-500/40 transition-all">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Active Hiring Drives</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 dark:text-rose-400 mt-1 font-display">
                28 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Live</span>
              </div>
            </div>
          </div>

          {/* Terminal Activity Logs */}
          <div className="pt-6 font-mono text-xs space-y-3 text-slate-300">
            <div className="flex items-start gap-3 bg-slate-900 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-200 shadow-inner">
              <Bot className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-rose-300 font-bold">[Agent #1: Resume Intelligence Engine]</span>
                  <span className="text-[10px] text-slate-400">12:44:02 PM</span>
                </div>
                <p className="text-slate-300 mt-0.5">Parsed 142 resumes for Google SDE-1 Drive. Top ATS match: Candidate #89 (96% Match score in Data Structures & System Architecture).</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-900 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-200 shadow-inner">
              <Zap className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-rose-300 font-bold">[Agent #2: Circular & Notice Sync]</span>
                  <span className="text-[10px] text-slate-400">12:44:18 PM</span>
                </div>
                <p className="text-slate-300 mt-0.5">Auto-published Microsoft Online Assessment Link notice to {notices.length} student subscribers via Supabase real-time layer.</p>
              </div>
            </div>
          </div>

          {/* Quick Hub Navigation Quick Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button 
              onClick={() => { setActiveTab('resume_ai'); playAudioFeedback?.('click'); }}
              className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-rose-500/40 text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center justify-between">
                ATS Resume Matcher
                <ChevronRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Scan & score against JDs</div>
            </button>
            
            <button 
              onClick={() => { setActiveTab('drives'); playAudioFeedback?.('click'); }}
              className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-rose-500/40 text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center justify-between">
                Active Hiring Drives
                <ChevronRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Explore 28+ top drives</div>
            </button>

            <button 
              onClick={() => { setActiveTab('prep_ai'); playAudioFeedback?.('click'); }}
              className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-rose-500/40 text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center justify-between">
                Prep Lab & Mock AI
                <ChevronRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">DSA & System Design tests</div>
            </button>

            <button 
              onClick={() => { setActiveTab('placements'); playAudioFeedback?.('click'); }}
              className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-rose-500/40 text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center justify-between">
                Placement Stats
                <ChevronRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">View department analytics</div>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 2: LIVE RECRUITER PARTNERS MARQUEE */}
      <section className="py-6 border-y border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
            TRUSTED BY RECRUITMENT TEAMS AT GLOBAL TECH LEADERS
          </span>
        </div>
        <PartnerMarquee />
      </section>

      {/* SECTION 3: DEDICATED FEATURE GRID SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
            <Layers className="w-3.5 h-3.5" /> DEDICATED MODULES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display">
            Explore Core Feature Pages
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Each feature operates as a standalone page with dedicated controls and clean sections. Access them anytime via the left navigation bar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => { setActiveTab(feat.id); playAudioFeedback?.('click'); }}
                className={`cosmo-glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200 dark:border-slate-800 transition-all duration-300 cursor-pointer group ${feat.glow}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <Icon className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono border ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {feat.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {feat.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-6">
                    {feat.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
                  <span>{feat.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: ANIMATED WORKFLOW STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="cosmo-glass-card rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              AUTONOMOUS ENGINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
              How COSMOQ AI Automates Placements
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              End-to-end multi-agent workflow from candidate resume scanning to offer letter verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((ws, i) => {
              const Icon = ws.icon;
              return (
                <div
                  key={i}
                  className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative group hover:border-rose-500/40 transition-all shadow-xs"
                >
                  <div className="text-3xl font-extrabold font-mono text-rose-500/20 dark:text-rose-500/30 mb-4">
                    {ws.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 font-display">
                    {ws.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {ws.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: INTERACTIVE AGENT PIPELINE & AUTOMATION CONFIG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Multi-Agent Orchestration Card */}
          <div className="lg:col-span-2 cosmo-glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 mb-4">
                <Bot className="w-3.5 h-3.5" /> MULTI-AGENT WORKFLOW ORCHESTRATION
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                Automated Hiring & Screening Pipeline
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Configure multi-agent rules to auto-screen candidates, schedule interview slots, sync notices to Telegram, and log placement records seamlessly.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-slate-50 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-colors shadow-xs">
                <div className="text-rose-600 dark:text-rose-400 font-bold flex items-center justify-between">
                  <span>Node #1</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="text-slate-900 dark:text-white font-semibold mt-1">Resume Ingestion</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Auto-extract tech skills & GPA metrics</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-colors shadow-xs">
                <div className="text-rose-600 dark:text-rose-400 font-bold flex items-center justify-between">
                  <span>Node #2</span>
                  <Activity className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                </div>
                <div className="text-slate-900 dark:text-white font-semibold mt-1">AI ATS Evaluator</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Match candidate vs Job Description</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-colors shadow-xs">
                <div className="text-rose-600 dark:text-rose-400 font-bold flex items-center justify-between">
                  <span>Node #3</span>
                  <Bot className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="text-slate-900 dark:text-white font-semibold mt-1">Auto Schedule</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Dispatch interview links & notices</div>
              </div>
            </div>
          </div>

          {/* AI Flashcard Mini Widget */}
          <div className="cosmo-glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" /> AI INTERVIEW TRAINER
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Card {activePrepQuestionIndex + 1}/{flashcards.length || 4}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {flashcards[activePrepQuestionIndex]?.q || "What is the difference between Synchronous and Asynchronous execution?"}
              </h4>
              
              {showFlashcardAnswer && (
                <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-900 dark:text-rose-200 animate-in fade-in">
                  {flashcards[activePrepQuestionIndex]?.a || "Synchronous blocks main thread; asynchronous delegates work without blocking."}
                </div>
              )}
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => { setShowFlashcardAnswer?.(!showFlashcardAnswer); playAudioFeedback?.('click'); }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                {showFlashcardAnswer ? 'Hide AI Solution' : 'Reveal AI Solution'}
              </button>
              <button
                onClick={() => {
                  setActivePrepQuestionIndex?.((prev) => (prev + 1) % (flashcards.length || 4));
                  setShowFlashcardAnswer?.(false);
                  playAudioFeedback?.('pop');
                }}
                className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Next Practice Question</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: RECENT CIRCULARS PREVIEW & AUTOMATION RULES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Circulars Spotlight */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
                <Bell className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Recent Placement Circulars
              </h3>
              <button 
                onClick={() => { setActiveTab('notices'); playAudioFeedback?.('click'); }}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                View All Notices <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {loading ? (
              <div className="p-8 cosmo-glass-card rounded-2xl text-center text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-rose-600" /> Fetching circulars from Supabase...
              </div>
            ) : notices.length === 0 ? (
              <div className="cosmo-glass-card p-8 rounded-2xl text-center space-y-3 shadow-xs">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-sm font-bold text-slate-900 dark:text-white">No announcements published yet</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {canPostNotices ? 'Use the button inside Notices page to post broadcasts.' : 'Check back later for updates.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {notices.slice(0, 3).map((notice) => (
                  <div 
                    key={notice.id}
                    className="cosmo-glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all group shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400">
                            {notice.category}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {notice.created_at ? new Date(notice.created_at).toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                          {notice.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {notice.content}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleBookmark?.(notice.id)}
                        className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-rose-500/40 text-slate-700 dark:text-slate-300 transition-colors shadow-xs"
                        title="Save Circular"
                      >
                        {bookmarkedNotices.includes(notice.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Agent Automation Rules Toggles */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
              <Sliders className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Agent Automation Rules
            </h3>
            
            <div className="space-y-3">
              {agentRules.map((rule) => (
                <div 
                  key={rule.id}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                    rule.active 
                      ? 'bg-rose-500/10 border-rose-500/30' 
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-70'
                  }`}
                  onClick={() => toggleAgentRule?.(rule.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Zap className={`w-3.5 h-3.5 ${rule.active ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'}`} />
                      {rule.title}
                    </div>
                    <div className={`w-8 h-4 rounded-full transition-colors relative ${rule.active ? 'bg-rose-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${rule.active ? 'right-0.5' : 'left-0.5'}`} />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 leading-normal">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: PLACEMENT HALL OF FAME SPOTLIGHT */}
      {placements && placements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                SUCCESS STORIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2 font-display">
                Placement Hall of Fame Spotlight
              </h2>
            </div>
            <button
              onClick={() => { setActiveTab('placements'); playAudioFeedback?.('click'); }}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Full Hall of Fame <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placements.slice(0, 3).map((plc, idx) => (
              <div
                key={plc.id || idx}
                className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs hover:border-rose-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs">
                      {plc.package}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      DEPT: {plc.department}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    {plc.student_name}
                  </h3>
                  <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-3">
                    {plc.role} @ {plc.company}
                  </div>

                  {plc.quote && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed flex items-start gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>"{plc.quote}"</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 8: PRICING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <PricingSection
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
          playAudioFeedback={playAudioFeedback}
          setActiveTab={setActiveTab}
          fireCelebration={fireCelebration}
          showToast={showToast}
        />
      </section>

      {/* SECTION 9: FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <FaqSection
          openFaqIndex={openFaqIndex}
          setOpenFaqIndex={setOpenFaqIndex}
          playAudioFeedback={playAudioFeedback}
        />
      </section>

      {/* SECTION 10: BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="cosmo-glass-card rounded-3xl p-10 text-center relative overflow-hidden border border-rose-500/30 bg-white dark:bg-slate-900 shadow-2xl">
          <div className="absolute inset-0 bg-radial from-rose-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
              Ready to Automate Your Campus Placement Engine?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Launch autonomous recruitment workflows, AI ATS scoring, and live drive orchestration today.
            </p>
            <button
              onClick={() => { setIsCommandOpen(true); playAudioFeedback?.('click'); }}
              className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(225,29,72,0.3)] transition-all transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
            >
              <Command className="w-4 h-4" />
              <span>Launch Command Hub (⌘K)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
