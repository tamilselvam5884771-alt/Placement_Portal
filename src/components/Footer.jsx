import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-white font-display">COSMOQ AI Placement Portal</span>
            <span className="text-xs text-slate-400 block">Automated Recruitment & Campus Hiring Infrastructure</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>🟢 12 Autonomous Agents Active & Supabase Synced</span>
        </div>

        <div className="text-xs text-slate-400">
          © 2026 COSMOQ Template. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
