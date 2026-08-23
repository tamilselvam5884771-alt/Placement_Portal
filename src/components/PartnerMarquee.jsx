import React from 'react';
import { Building2 } from 'lucide-react';

export default function PartnerMarquee() {
  const partners = ['GOOGLE', 'MICROSOFT', 'AMAZON', 'META', 'NVIDIA', 'OPENAI', 'TESLA', 'APPLE', 'GOLDMAN SACHS', 'UBER', 'ADOBE', 'STRIPE', 'NETFLIX', 'QUALCOMM'];

  return (
    <section className="py-10 border-y border-white/10 bg-slate-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          TRUSTED BY RECRUITERS & HIRING TEAMS AT TOP GLOBAL TECH ENTERPRISES
        </p>
      </div>
      <div className="flex overflow-hidden relative">
        <div className="flex gap-12 items-center animate-marquee whitespace-nowrap py-2 text-slate-400 font-bold text-sm">
          {partners.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 px-6 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/40 hover:text-white transition-all cursor-default">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>{logo}</span>
            </div>
          ))}
          {partners.map((logo, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-3 px-6 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/40 hover:text-white transition-all cursor-default">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
