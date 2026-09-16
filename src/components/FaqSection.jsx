import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function FaqSection({ openFaqIndex, setOpenFaqIndex, playAudioFeedback }) {
  const [search, setSearch] = React.useState('');

  const faqs = [
    {
      q: "How does the AI ATS Resume Matcher evaluate candidate profiles?",
      a: "The ATS Resume Engine extracts technical skill keywords, project complexity, and experience tags from candidate text, scoring them against specific job description requirements using natural language embeddings."
    },
    {
      q: "Can placement coordinators publish notices that update in real-time?",
      a: "Yes! Powered by Supabase real-time database channels, any notice, task, or placement record published by coordinators updates live across all connected student sessions."
    },
    {
      q: "What user roles are supported in the placement portal?",
      a: "The portal supports 4 primary roles: Candidate (Student view-only), Club Manager (Dept tasks & notices), Placement Admin (Full coordinator access), and HOD (Executive oversight)."
    },
    {
      q: "Is candidate data stored securely?",
      a: "All records are encrypted in storage and transit, utilizing role-based access control policies to safeguard candidate privacy."
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(search.toLowerCase()) || 
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mt-20 max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Frequently Asked Questions</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">Everything you need to know about COSMOQ AI Placement Engine.</p>
      </div>

      <div className="cosmo-glass p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
        />
      </div>

      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400 font-mono">
            No FAQs match your search query.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="cosmo-glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => { setOpenFaqIndex(openFaqIndex === idx ? null : idx); playAudioFeedback('click'); }}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-rose-600 dark:text-rose-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 animate-fade-in-scale">
                  {faq.a}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
