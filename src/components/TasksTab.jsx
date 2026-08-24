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
          <h3 className="text-2xl font-bold text-slate-900 font-display">Department Tasks & Operations Board</h3>
          <p className="text-xs text-slate-600 mt-1">Track task completion for Dept: <span className="text-rose-600 font-bold">{currentDept}</span>.</p>
        </div>
        {canUpdateDepartmentTasks && (
          <button
            onClick={() => { setIsTaskModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
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
            <div key={statusKey} className="cosmo-glass-card p-5 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-display flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusKey === 'done' ? 'bg-rose-500' : statusKey === 'in_progress' ? 'bg-pink-500' : 'bg-rose-700'}`} />
                  {columnTitles[statusKey]}
                </h4>
                <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-700">{columnTasks.length}</span>
              </div>

              <div className="space-y-3 min-h-[200px]">
                {columnTasks.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3 shadow-sm">
                    <div>
                      <span className="text-[10px] font-mono text-rose-600 uppercase font-bold">Dept: {t.department}</span>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">{t.title}</div>
                      {t.description && <p className="text-xs text-slate-600 mt-1">{t.description}</p>}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[10px] text-slate-500 font-mono">Due: {t.deadline || 'Soon'}</span>
                      
                      {canUpdateDepartmentTasks && (
                        <select
                          value={t.status || 'todo'}
                          onChange={(e) => handleTaskStatusChange(t.id, e.target.value)}
                          className="bg-slate-100 text-[10px] font-bold text-slate-800 px-2 py-1 rounded-lg border border-slate-200 focus:outline-none"
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
