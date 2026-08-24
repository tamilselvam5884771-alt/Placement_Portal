import React from 'react';
import { X, Command, Search, Briefcase, Brain, Bell, Trophy } from 'lucide-react';

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
  handleCreatePlacement
}) {
  return (
    <>
      {/* Command Palette Modal Overlay (⌘K) */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-start justify-center pt-24 p-4">
          <div className="cosmo-glass-card max-w-xl w-full rounded-3xl p-4 border border-rose-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Command className="w-4 h-4 text-rose-600" />
                <span>COSMOQ AI Command Hub</span>
              </div>
              <button 
                onClick={() => setIsCommandOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900"
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
                placeholder="Search circulars, job drives, materials, or candidate records..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-rose-500 placeholder:text-slate-400"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 text-xs">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold px-1">Quick Navigation Actions</div>
              <div 
                onClick={() => { setActiveTab('drives'); setIsCommandOpen(false); }}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 cursor-pointer flex items-center justify-between"
              >
                <span className="flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-rose-600" /> View Hiring Drives Desk</span>
                <span className="text-[10px] text-slate-500">Tab → Drives</span>
              </div>
              <div 
                onClick={() => { setActiveTab('resume_ai'); setIsCommandOpen(false); }}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 cursor-pointer flex items-center justify-between"
              >
                <span className="flex items-center gap-2"><Brain className="w-3.5 h-3.5 text-rose-600" /> Test AI Resume ATS Matcher</span>
                <span className="text-[10px] text-slate-500">Tab → Resume AI</span>
              </div>
              <div 
                onClick={() => { setActiveTab('notices'); setIsCommandOpen(false); }}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 cursor-pointer flex items-center justify-between"
              >
                <span className="flex items-center gap-2"><Bell className="w-3.5 h-3.5 text-rose-600" /> Browse Broadcast Notices</span>
                <span className="text-[10px] text-slate-500">Tab → Notices</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Notice Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmo-glass-card max-w-lg w-full p-6 rounded-3xl border border-rose-500/40 relative bg-white shadow-2xl">
            <button onClick={() => setIsNoticeModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Post Broadcast Circular Notice</h3>
            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="e.g. Google Hiring Drive Registration Deadline"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                >
                  <option value="General">General Announcement</option>
                  <option value="Drive">Hiring Drive</option>
                  <option value="Urgent">Urgent Alert</option>
                  <option value="Exam">Exam / Assessment</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Notice Description</label>
                <textarea
                  rows={4}
                  required
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  placeholder="Enter notice details..."
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmo-glass-card max-w-lg w-full p-6 rounded-3xl border border-rose-500/40 relative bg-white shadow-2xl">
            <button onClick={() => setIsTaskModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Assign Department Operation Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g. Verify CSE 2026 Batch Student Resumes"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Department</label>
                <select
                  value={newTask.department}
                  onChange={(e) => setNewTask({ ...newTask, department: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                >
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">Mechanical</option>
                  <option value="CIVIL">Civil</option>
                  <option value="IT">IT</option>
                  <option value="EEE">EEE</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task instructions..."
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmo-glass-card max-w-lg w-full p-6 rounded-3xl border border-rose-500/40 relative bg-white shadow-2xl">
            <button onClick={() => setIsResourceModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Upload Study Repository Material</h3>
            <form onSubmit={handleCreateResource} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Material Title</label>
                <input
                  type="text"
                  required
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="e.g. Data Structures & Algorithms Master Sheet"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={newResource.category}
                  onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                >
                  <option value="Technical">Technical Notes</option>
                  <option value="Aptitude">Aptitude & Reasoning</option>
                  <option value="System Design">System Design</option>
                  <option value="HR">HR Interview Guide</option>
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmo-glass-card max-w-lg w-full p-6 rounded-3xl border border-rose-500/40 relative bg-white shadow-2xl">
            <button onClick={() => setIsPlacementModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Publish Placed Candidate (Wall of Fame)</h3>
            <form onSubmit={handleCreatePlacement} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={newPlacement.student_name}
                  onChange={(e) => setNewPlacement({ ...newPlacement, student_name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={newPlacement.company}
                    onChange={(e) => setNewPlacement({ ...newPlacement, company: e.target.value })}
                    placeholder="e.g. Google"
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">CTC Package</label>
                  <input
                    type="text"
                    required
                    value={newPlacement.package}
                    onChange={(e) => setNewPlacement({ ...newPlacement, package: e.target.value })}
                    placeholder="e.g. ₹28.5 LPA"
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={newPlacement.role}
                  onChange={(e) => setNewPlacement({ ...newPlacement, role: e.target.value })}
                  placeholder="e.g. Software Engineer - AI Systems"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-500"
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
