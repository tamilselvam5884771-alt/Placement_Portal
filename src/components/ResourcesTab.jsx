import React from 'react';
import { Upload, Loader2, BookOpen, Download } from 'lucide-react';

export default function ResourcesTab({
  resources,
  loading,
  canManageAll,
  setIsResourceModalOpen,
  playAudioFeedback
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white font-display">Study & Exam Preparation Repository</h3>
          <p className="text-xs text-slate-400 mt-1">Download PPTs, company interview questions, and technical notes.</p>
        </div>
        {canManageAll && (
          <button
            onClick={() => { setIsResourceModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" /> Upload Material
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-12 cosmo-glass-card rounded-3xl text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-400" /> Loading materials...
        </div>
      ) : resources.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
          <div className="text-base font-bold text-white">No materials uploaded yet</div>
          <p className="text-xs text-slate-400">Coordinators can upload notes and PPTs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div key={res.id} className="cosmo-glass-card p-6 rounded-3xl border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/5 border border-white/10 text-slate-300">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{res.month || '2026'}</span>
                </div>
                <h4 className="text-base font-bold text-white">{res.title}</h4>
              </div>

              <a
                href={res.file_url || '#'}
                onClick={() => playAudioFeedback('click')}
                target="_blank"
                rel="noreferrer"
                className="mt-6 py-2.5 w-full rounded-xl bg-white/10 hover:bg-blue-600 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" /> Download File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
