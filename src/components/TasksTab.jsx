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
  const completedCount = filteredTasks.filter(t => t.status === 'done').length;
  const totalTasks = filteredTasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Department Tasks & Operations Board</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Track task completion for Dept: <span className="text-rose-600 dark:text-rose-400 font-bold">{currentDept}</span>.</p>
        </div>
        {canUpdateDepartmentTasks && (
          <button
            onClick={() => { setIsTaskModalOpen(true); playAudioFeedback('click'); }}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-start sm:self-auto transform hover:scale-105"
          >
            <Plus className="w-4 h-4" /> Create Department Task
          </button>
        )}
      </div>

      {/* Task Completion Bar */}
      <div className="cosmo-glass p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Overall Board Completion Progress</span>
            <span className="font-mono text-rose-600 dark:text-rose-400">{completionPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-rose-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
          {completedCount}/{totalTasks} Done
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['todo', 'in_progress', 'done'].map((statusKey) => {
          const columnTasks = filteredTasks.filter(t => (t.status || 'todo') === statusKey);
          const columnTitles = { todo: 'To Do', in_progress: 'In Progress', done: 'Completed' };
          
          return (
            <div key={statusKey} className="cosmo-glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-display flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusKey === 'done' ? 'bg-rose-500' : statusKey === 'in_progress' ? 'bg-pink-500' : 'bg-rose-700'}`} />
                  {columnTitles[statusKey]}
                </h4>
                <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-700 dark:text-slate-300">{columnTasks.length}</span>
              </div>

              <div className="space-y-3 min-h-[200px]">
                {columnTasks.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-500 font-mono">
                    No tasks in {columnTitles[statusKey]}
                  </div>
                ) : (
                  columnTasks.map((t) => (
                    <div key={t.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
                      <div>
                        <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 uppercase font-bold">Dept: {t.department}</span>
                        <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{t.title}</div>
                        {t.description && <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{t.description}</p>}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Due: {t.deadline || 'Soon'}</span>
                        
                        {canUpdateDepartmentTasks && (
                          <select
                            value={t.status || 'todo'}
                            onChange={(e) => handleTaskStatusChange(t.id, e.target.value)}
                            className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-800 dark:text-slate-200 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none"
                          >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done 🎉</option>
                          </select>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
