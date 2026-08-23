import React from 'react';
import { Plus, Loader2, AlertCircle, FileText, BookmarkCheck, Bookmark } from 'lucide-react';

export default function NoticesTab({
  notices,
  loading,
  canPostNotices,
  setIsNoticeModalOpen,
  playAudioFeedback,
  toggleBookmark,
  bookmarkedNotices
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white font-display">Placement Notices & Circulars</h3>
          <p className="text-xs text-slate-400 mt-1">Official broadcast updates from Training & Placement Cell.</p>
        </div>
        {canPostNotices && (
          <button
            onClick={() => { setIsNoticeModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Post New Circular
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-12 cosmo-glass-card rounded-3xl text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-blue-400" /> Loading notices...
        </div>
      ) : notices.length === 0 ? (
        <div className="cosmo-glass-card p-12 rounded-3xl text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
          <div className="text-base font-bold text-white">No notices published yet</div>
          <p className="text-xs text-slate-400">Post broadcast notices using the admin button.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map((notice) => (
            <div key={notice.id} className="cosmo-glass-card p-6 rounded-3xl border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-300">
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {notice.created_at ? new Date(notice.created_at).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white leading-snug">{notice.title}</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed whitespace-pre-line">{notice.content}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                {notice.attachment_url ? (
                  <a 
                    href={notice.attachment_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5" /> Attachment Link
                  </a>
                ) : (
                  <span className="text-slate-500 text-[11px]">COSMOQ Verified Notice</span>
                )}

                <button
                  onClick={() => toggleBookmark(notice.id)}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {bookmarkedNotices.includes(notice.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-blue-400" />
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
