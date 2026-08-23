import React from 'react';
import { Zap, Check } from 'lucide-react';

export default function PricingSection({
  billingCycle,
  setBillingCycle,
  playAudioFeedback,
  setActiveTab,
  fireCelebration,
  showToast
}) {
  return (
    <section className="mt-20 pt-12 border-t border-white/10">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Zap className="w-3.5 h-3.5" /> FLEXIBLE ENTERPRISE PLANS
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Designed for Candidates, Placement Cells & Tech Hiring Teams
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">Choose the AI deployment scale for your institution.</p>

        {/* Billing Toggle Switch */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => { setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly'); playAudioFeedback('click'); }}
            className="w-12 h-6 rounded-full bg-blue-600 p-1 relative transition-colors"
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
            Annual <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">20% OFF</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Student Tier */}
        <div className="cosmo-glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Candidate Access</span>
            <h3 className="text-xl font-bold text-white mt-1">Student Portal</h3>
            <div className="mt-4 text-3xl font-extrabold text-white font-display">
              $0 <span className="text-xs text-slate-400 font-normal">/ forever</span>
            </div>
            <ul className="mt-6 space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited AI Resume ATS scoring</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Technical Flashcard Prep Engine</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> One-click hiring drive application</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Real-time notice notifications</li>
            </ul>
          </div>
          <button 
            onClick={() => { setActiveTab('drives'); playAudioFeedback('click'); }}
            className="mt-8 py-3 w-full rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all"
          >
            Access Free Desk
          </button>
        </div>

        {/* Recruiter / Pro Tier */}
        <div className="cosmo-glass-card p-8 rounded-3xl border border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.25)] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500 text-white uppercase tracking-wider">
            RECOMMENDED
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Placement Cell</span>
            <h3 className="text-xl font-bold text-white mt-1">Pro Agent Suite</h3>
            <div className="mt-4 text-3xl font-extrabold text-white font-display">
              {billingCycle === 'annual' ? '$149' : '$179'} <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>
            <ul className="mt-6 space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> All Student Tier capabilities</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Autonomous Multi-Agent Workflows</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Supabase Realtime Database Sync</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Automated Drive & Notice Broadcaster</li>
            </ul>
          </div>
          <button 
            onClick={() => { fireCelebration(); showToast('Pro Agent Suite trial activated!'); }}
            className="mt-8 py-3 w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md"
          >
            Launch Pro Suite
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="cosmo-glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">University Scale</span>
            <h3 className="text-xl font-bold text-white mt-1">Enterprise AI</h3>
            <div className="mt-4 text-3xl font-extrabold text-white font-display">
              Custom <span className="text-xs text-slate-400 font-normal">/ campus</span>
            </div>
            <ul className="mt-6 space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Unlimited Candidate Profiles</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Custom LLM Model Integration</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Dedicated Account Manager & SLA</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Advanced Placement Analytics</li>
            </ul>
          </div>
          <button 
            onClick={() => showToast('Enterprise inquiry logged. Placement team will contact you.')}
            className="mt-8 py-3 w-full rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all"
          >
            Contact Enterprise Team
          </button>
        </div>
      </div>
    </section>
  );
}
