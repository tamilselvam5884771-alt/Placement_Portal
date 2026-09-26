import React, { useState } from 'react';
import { Upload, BookOpen, Download, Search, FileCode, Copy, Check } from 'lucide-react';

export default function ResourcesTab({
  resources,
  loading,
  canManageAll,
  setIsResourceModalOpen,
  playAudioFeedback
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Technical', 'Aptitude', 'System Design', 'HR'];

  const filteredResources = resources.filter(res => {
    const matchesCat = selectedCategory === 'All' ? true : (res.category === selectedCategory);
    const matchesSearch = 
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (res.category && res.category.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCopyLink = (res) => {
    playAudioFeedback('pop');
    navigator.clipboard.writeText(window.location.href);
    setCopiedId(res.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Study & Exam Preparation Repository</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
              {filteredResources.length} Materials
            </span>
          </div>
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

      {/* Category Pills & Search Controls Bar */}
      <div className="cosmo-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); playAudioFeedback?.('click'); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500 w-full md:w-56"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 animate-shimmer space-y-4">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3" />
              <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-4/5" />
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center space-y-3 shadow-sm border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <div className="text-base font-bold text-slate-900 dark:text-white">No study materials found</div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Try adjusting your search terms or upload new notes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div key={res.id} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                    {res.category || 'Technical'}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                    <FileCode className="w-3 h-3 text-slate-400" /> {res.month || '2026'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug">{res.title}</h4>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <a
                  href={res.file_url || '#'}
                  onClick={() => playAudioFeedback('click')}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 flex-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 text-slate-800 dark:text-slate-200 hover:text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
                <button
                  onClick={() => handleCopyLink(res)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-rose-600 transition-colors"
                  title="Copy Reference Link"
                >
                  {copiedId === res.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
