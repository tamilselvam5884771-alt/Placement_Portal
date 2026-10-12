import React from 'react';
import { X, Command, Search, Briefcase, Brain, Bell, Trophy, BookOpen, Layers, ArrowUpRight } from 'lucide-react';

export default function Modals({
  isCommandOpen,
  setIsCommandOpen,
  searchQuery,
  setSearchQuery,
  setActiveTab,
  isVideoModalOpen,
  setIsVideoModalOpen,
  isNoticeModalOpen,
  setIsNoticeModalOpen,
  newNotice,
  setNewNotice,
  handleCreateNotice,
  isTaskModalOpen,
  setIsTaskModalOpen,
  newTask,
  setNewTask,
  handleCreateTask,
  isResourceModalOpen,
  setIsResourceModalOpen,
  newResource,
  setNewResource,
  handleCreateResource,
  isPlacementModalOpen,
  setIsPlacementModalOpen,
  newPlacement,
  setNewPlacement,
  handleCreatePlacement,
  globalSearchIndex = []
}) {
  const filteredSearchResults = searchQuery.trim() 
    ? globalSearchIndex.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Command Palette Modal Overlay (⌘K) */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-start justify-center pt-20 p-4">
          <div className="cosmo-glass-card max-w-xl w-full rounded-3xl p-5 border border-rose-500/40 shadow-2xl space-y-4 animate-fade-in-scale bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Command className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>COSMOQ AI Global Search & Action Hub</span>
              </div>
              <button 
                onClick={() => setIsCommandOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search circulars, hiring drives, resources, tasks, or candidates..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 text-xs">
              {searchQuery.trim() ? (
                <>
                  <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold px-1 flex items-center justify-between">
                    <span>Search Results ({filteredSearchResults.length})</span>
                    <span>Instant Retrieval</span>
                  </div>
                  {filteredSearchResults.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 dark:text-slate-500 text-xs">
                      No matching drives, circulars, or materials found for "{searchQuery}".
                    </div>
                  ) : (
                    filteredSearchResults.map(item => (
                      <div
                        key={`${item.targetTab}-${item.id}`}
                        onClick={() => {
                          setActiveTab(item.targetTab);
                          setIsCommandOpen(false);
                          setSearchQuery('');
                        }}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:border-rose-500/40 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="space-y-0.5 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                              {item.type}
                            </span>
                          </div>
                          <div className="font-bold text-slate-900 dark:text-white truncate group-hover:text-rose-600 dark:group-hover:text-rose-400">{item.title}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{item.subtitle}</div>
                        </div>
                        <div className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Jump</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>
                    ))
                  )}
                </>
              ) : (
                <>
                  <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold px-1">Quick Workspace Desks</div>
                  <div 
                    onClick={() => { setActiveTab('drives'); setIsCommandOpen(false); }}
                    className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2 font-semibold"><Briefcase className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Active Campus Hiring Drives</span>
                    <span className="text-[10px] font-mono text-slate-500">Tab → Drives</span>
                  </div>
                  <div 
                    onClick={() => { setActiveTab('resume_ai'); setIsCommandOpen(false); }}
                    className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2 font-semibold"><Brain className="w-4 h-4 text-rose-600 dark:text-rose-400" /> AI Resume ATS Matcher</span>
                    <span className="text-[10px] font-mono text-slate-500">Tab → Resume AI</span>
                  </div>
                  <div 
                    onClick={() => { setActiveTab('notices'); setIsCommandOpen(false); }}
                    className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2 font-semibold"><Bell className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Placement Circulars & Notices</span>
                    <span className="text-[10px] font-mono text-slate-500">Tab → Notices</span>
                  </div>
                  <div 
                    onClick={() => { setActiveTab('resources'); setIsCommandOpen(false); }}
                    className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2 font-semibold"><BookOpen className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Study Repository & Notes</span>
                    <span className="text-[10px] font-mono text-slate-500">Tab → Resources</span>
                  </div>
                  <div 
                    onClick={() => { setActiveTab('placements'); setIsCommandOpen(false); }}
                    className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2 font-semibold"><Trophy className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Placement Wall of Fame</span>
                    <span className="text-[10px] font-mono text-slate-500">Tab → Wall of Fame</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post Notice Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmo-glass-card max-w-lg w-full p-6 rounded-3xl border border-rose-500/40 relative bg-white dark:bg-slate-900 shadow-2xl">
            <button onClick={() => setIsNoticeModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white absolute top-4 right-4 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Post Broadcast Circular Notice</h3>
            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="e.g. Google Hiring Drive Registration Deadline"
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Category</label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  <option value="General" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">General Announcement</option>
                  <option value="Drive" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Hiring Drive</option>
                  <option value="Urgent" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Urgent Alert</option>
                  <option value="Exam" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Exam / Assessment</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Notice Description</label>
                <textarea
                  rows={4}
                  required
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  placeholder="Enter notice details..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Publish Notice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmo-glass-card max-w-lg w-full p-6 rounded-3xl border border-rose-500/40 relative bg-white dark:bg-slate-900 shadow-2xl">
            <button onClick={() => setIsTaskModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white absolute top-4 right-4 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Assign Department Operation Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g. Verify CSE 2026 Batch Student Resumes"
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Department</label>
                <select
                  value={newTask.department}
                  onChange={(e) => setNewTask({ ...newTask, department: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  <option value="CSE" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">CSE</option>
                  <option value="ECE" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">ECE</option>
                  <option value="MECH" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Mechanical</option>
                  <option value="CIVIL" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Civil</option>
                  <option value="IT" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">IT</option>
                  <option value="EEE" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">EEE</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task instructions..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload Resource Modal */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmo-glass-card max-w-lg w-full p-6 rounded-3xl border border-rose-500/40 relative bg-white dark:bg-slate-900 shadow-2xl">
            <button onClick={() => setIsResourceModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white absolute top-4 right-4 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Upload Study Repository Material</h3>
            <form onSubmit={handleCreateResource} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Material Title</label>
                <input
                  type="text"
                  required
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="e.g. Data Structures & Algorithms Master Sheet"
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Category</label>
                <select
                  value={newResource.category}
                  onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  <option value="Technical" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Technical Notes</option>
                  <option value="Aptitude" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Aptitude & Reasoning</option>
                  <option value="System Design" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">System Design</option>
                  <option value="HR" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">HR Interview Guide</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Upload Resource
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Publish Placement Record Modal */}
      {isPlacementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmo-glass-card max-w-lg w-full p-6 rounded-3xl border border-rose-500/40 relative bg-white dark:bg-slate-900 shadow-2xl">
            <button onClick={() => setIsPlacementModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white absolute top-4 right-4 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Publish Placed Candidate (Wall of Fame)</h3>
            <form onSubmit={handleCreatePlacement} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={newPlacement.student_name}
                  onChange={(e) => setNewPlacement({ ...newPlacement, student_name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={newPlacement.company}
                    onChange={(e) => setNewPlacement({ ...newPlacement, company: e.target.value })}
                    placeholder="e.g. Google"
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">CTC Package</label>
                  <input
                    type="text"
                    required
                    value={newPlacement.package}
                    onChange={(e) => setNewPlacement({ ...newPlacement, package: e.target.value })}
                    placeholder="e.g. ₹28.5 LPA"
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={newPlacement.role}
                  onChange={(e) => setNewPlacement({ ...newPlacement, role: e.target.value })}
                  placeholder="e.g. Software Engineer - AI Systems"
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-rose-500"
              >
                Publish Record 🎉
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
