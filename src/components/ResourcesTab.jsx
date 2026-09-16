import React from 'react';
import { Upload, Loader2, BookOpen, Download } from 'lucide-react';

export default function ResourcesTab({
  resources,
  loading,
  canManageAll,
  setIsResourceModalOpen,
  playAudioFeedback
}) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (res.category && res.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Study & Exam Preparation Repository</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Download PPTs, company interview questions, and technical notes.</p>
        </div>
        {canManageAll && (
          <button
            onClick={() => { setIsResourceModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto transform hover:scale-105"
          >
            <Upload className="w-4 h-4" /> Upload Material
          </button>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="cosmo-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <input
          type="text"
          placeholder="Filter resources by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
        />
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono ml-4 hidden sm:inline">
          {filteredResources.length} Materials
        </span>
      </div>

      {loading ? (
        <div className="p-12 cosmo-glass-card rounded-3xl text-center text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-rose-600 dark:text-rose-400" /> Loading materials...
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center space-y-3 shadow-sm border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <div className="text-base font-bold text-slate-900 dark:text-white">No materials found</div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Try adjusting your search terms or upload new notes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div key={res.id} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{res.month || '2026'}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{res.title}</h4>
              </div>

              <a
                href={res.file_url || '#'}
                onClick={() => playAudioFeedback('click')}
                target="_blank"
                rel="noreferrer"
                className="mt-6 py-2.5 w-full rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 text-slate-800 dark:text-slate-200 hover:text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 transform hover:scale-[1.02]"
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
