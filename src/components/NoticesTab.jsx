import React, { useState } from 'react';
import { Plus, AlertCircle, FileText, BookmarkCheck, Bookmark, Search, Sparkles } from 'lucide-react';

export default function NoticesTab({
  notices,
  loading,
  canPostNotices,
  setIsNoticeModalOpen,
  playAudioFeedback,
  toggleBookmark,
  bookmarkedNotices
}) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'General', 'Interview Schedule', 'Results', 'Urgent', 'Bookmarked'];

  const filteredNotices = notices.filter(n => {
    const matchesCat = 
      selectedCat === 'All' ? true :
      selectedCat === 'Bookmarked' ? bookmarkedNotices.includes(n.id) :
      n.category === selectedCat;
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Urgent':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400';
      case 'Interview Schedule':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400';
      case 'Results':
        return 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400';
      default:
        return 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Placement Notices & Circulars</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
              {filteredNotices.length} Items
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Official broadcast updates from Training & Placement Cell.</p>
        </div>
        
        {canPostNotices && (
          <button
            onClick={() => { setIsNoticeModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto transform hover:scale-105"
          >
            <Plus className="w-4 h-4" /> Post New Circular
          </button>
        )}
      </div>

      {/* Filter Pills Bar & Search */}
      <div className="cosmo-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCat(cat); playAudioFeedback?.('click'); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-rose-600 text-white shadow-sm scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {cat === 'Bookmarked' ? `Saved List (${bookmarkedNotices.length})` : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search circulars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-rose-500/50 w-full md:w-56"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 animate-shimmer space-y-4">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/4" />
              <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center space-y-3 shadow-sm border border-slate-200 dark:border-slate-800">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <div className="text-base font-bold text-slate-900 dark:text-white">No matching circulars found</div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Try adjusting search filters or post new circulars.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotices.map((notice) => (
            <div key={notice.id} className="cosmo-glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 dark:hover:border-rose-500/40 transition-all flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadgeClass(notice.category)}`}>
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {notice.created_at ? new Date(notice.created_at).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{notice.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-line">{notice.content}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                {notice.attachment_url ? (
                  <a 
                    href={notice.attachment_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5" /> Attachment Link
                  </a>
                ) : (
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-rose-500" /> COSMOQ Verified Circular
                  </span>
                )}

                <button
                  onClick={() => toggleBookmark(notice.id)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Save to Reading List"
                >
                  {bookmarkedNotices.includes(notice.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
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
