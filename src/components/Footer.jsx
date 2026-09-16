import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer({ showToast, playAudioFeedback }) {
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    playAudioFeedback?.('success');
    showToast?.(`Subscribed ${email} to placement circular alerts!`);
    setEmail('');
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white font-display">COSMOQ AI Placement Portal</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Automated Recruitment & Campus Hiring Infrastructure</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Get circular updates via email..."
              className="px-4 py-2 rounded-full text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs font-mono text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3.5 py-1.5 rounded-full border border-rose-500/20">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>12 Autonomous Agents Active</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div>© 2026 COSMOQ Placement Engine. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-rose-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-rose-500 cursor-pointer">Terms of Service</span>
            <span className="hover:text-rose-500 cursor-pointer">System Status: Operational 🟢</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
