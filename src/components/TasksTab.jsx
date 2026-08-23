import React from 'react';
import { Plus } from 'lucide-react';

export default function TasksTab({
  currentDept,
  canUpdateDepartmentTasks,
  setIsTaskModalOpen,
  playAudioFeedback,
  filteredTasks,
  handleTaskStatusChange
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white font-display">Department Tasks & Operations Board</h3>
          <p className="text-xs text-slate-400 mt-1">Track task completion for Dept: <span className="text-blue-400 font-bold">{currentDept}</span>.</p>
        </div>
        {canUpdateDepartmentTasks && (
          <button
            onClick={() => { setIsTaskModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Department Task
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['todo', 'in_progress', 'done'].map((statusKey) => {
          const columnTasks = filteredTasks.filter(t => (t.status || 'todo') === statusKey);
          const columnTitles = { todo: 'To Do', in_progress: 'In Progress', done: 'Completed' };
          
          return (
            <div key={statusKey} className="cosmo-glass-card p-5 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-display flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusKey === 'done' ? 'bg-emerald-400' : statusKey === 'in_progress' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                  {columnTitles[statusKey]}
                </h4>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-full text-slate-300">{columnTasks.length}</span>
              </div>

              <div className="space-y-3 min-h-[200px]">
                {columnTasks.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 uppercase">Dept: {t.department}</span>
                      <div className="text-sm font-bold text-white mt-0.5">{t.title}</div>
                      {t.description && <p className="text-xs text-slate-400 mt-1">{t.description}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[10px] text-slate-500 font-mono">Due: {t.deadline || 'Soon'}</span>
                      
                      {canUpdateDepartmentTasks && (
                        <select
                          value={t.status || 'todo'}
                          onChange={(e) => handleTaskStatusChange(t.id, e.target.value)}
                          className="bg-slate-800 text-[10px] font-bold text-slate-200 px-2 py-1 rounded-lg border border-white/10 focus:outline-none"
                        >
                          <option value="todo">To Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="done">Done 🎉</option>
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
