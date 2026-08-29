import React from 'react';
import { 
  X, 
  Palette, 
  Moon, 
  Sun, 
  Sliders, 
  LayoutGrid, 
  Eye, 
  EyeOff, 
  Download, 
  RotateCcw, 
  Sparkles, 
  Check,
  Maximize2,
  Minimize2,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export default function ThemeDrawer({
  isOpen,
  onClose,
  themePalette,
  setThemePalette,
  themeMode,
  setThemeMode,
  layoutDensity,
  setLayoutDensity,
  bgPattern,
  setBgPattern,
  widgetVisibility,
  setWidgetVisibility,
  playAudioFeedback,
  showToast,
  notices,
  placements,
  tasks
}) {
  if (!isOpen) return null;

  const colorThemes = [
    { id: 'crimson', name: 'Crimson Cyber', color: '#E11D48', glow: 'rgba(225,29,72,0.3)', desc: 'Rose Crimson & Quartz' },
    { id: 'midnight', name: 'Midnight Cyberpunk', color: '#9333EA', glow: 'rgba(147,51,234,0.3)', desc: 'Electric Violet & Cyan' },
    { id: 'emerald', name: 'Emerald Enterprise', color: '#059669', glow: 'rgba(5,150,105,0.3)', desc: 'Vibrant Emerald & Mint' },
    { id: 'oceanic', name: 'Oceanic Sapphire', color: '#2563EB', glow: 'rgba(37,99,235,0.3)', desc: 'Royal Blue & Ice' },
    { id: 'sunset', name: 'Sunset Amber', color: '#EA580C', glow: 'rgba(234,88,12,0.3)', desc: 'Solar Coral & Gold' },
  ];

  const backgroundPatterns = [
    { id: 'grid', name: 'Radial Grid', desc: 'Subtle dots' },
    { id: 'lines', name: 'Tech Grid', desc: 'Crisp grid lines' },
    { id: 'cyber', name: 'Cyber Mesh', desc: 'Glowing gradient shapes' },
    { id: 'clean', name: 'Minimal Solid', desc: 'Pure background' }
  ];

  const widgetsList = [
    { key: 'hero', label: 'Hero Announcement & Terminal', icon: Sparkles },
    { key: 'stats', label: 'KPI Metrics Counter Bar', icon: Sliders },
    { key: 'drives', label: 'Campus Hiring Drives Grid', icon: LayoutGrid },
    { key: 'resume', label: 'AI Resume ATS Matcher Widget', icon: Layers },
    { key: 'notices', label: 'Live Circulars & Notices Desk', icon: FileSpreadsheet },
    { key: 'tasks', label: 'Kanban Task Management Board', icon: Sliders },
    { key: 'placements', label: 'Alumni Placement Hall of Fame', icon: Sparkles }
  ];

  // Helper to export data as JSON or CSV file download
  const exportToCSV = (data, filename) => {
    if (!data || !data.length) {
      showToast('No data available to export.');
      return;
    }
    const keys = Object.keys(data[0]);
    const csvContent = [
      keys.join(','),
      ...data.map(row => keys.map(k => JSON.stringify(row[k] ?? '')).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    playAudioFeedback('success');
    showToast(`Exported ${filename}.csv successfully!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-md flex justify-end animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Theme & Flexibility Engine</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Tailor color palette, dark mode, density & layouts</p>
            </div>
          </div>
          <button 
            onClick={() => { onClose(); playAudioFeedback('click'); }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Color Themes */}
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider block mb-3">
              1. Color Theme Preset
            </label>
            <div className="space-y-2">
              {colorThemes.map((theme) => {
                const isSelected = themePalette === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setThemePalette(theme.id);
                      playAudioFeedback('click');
                      showToast(`Theme changed to ${theme.name}`);
                    }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected 
                        ? 'border-rose-500/60 bg-rose-500/5 dark:bg-rose-500/10 text-slate-900 dark:text-white ring-2 ring-rose-500/20' 
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span 
                        className="w-5 h-5 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.color, boxShadow: `0 0 10px ${theme.glow}` }}
                      />
                      <div>
                        <div className="text-xs font-bold">{theme.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{theme.desc}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode Switcher */}
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider block mb-3">
              2. Interface Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setThemeMode('light');
                  playAudioFeedback('click');
                  showToast('Switched to Light Mode');
                }}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  themeMode === 'light'
                    ? 'border-rose-500/60 bg-rose-500/10 text-rose-700 dark:text-white shadow-sm ring-2 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </button>
              <button
                onClick={() => {
                  setThemeMode('dark');
                  playAudioFeedback('click');
                  showToast('Switched to Dark Cyber Mode');
                }}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  themeMode === 'dark'
                    ? 'border-purple-500/60 bg-purple-500/10 text-purple-600 dark:text-purple-300 shadow-sm ring-2 ring-purple-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Moon className="w-4 h-4 text-purple-400" />
                <span>Dark Cyber</span>
              </button>
            </div>
          </div>

          {/* Layout Density */}
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider block mb-3">
              3. Layout Density & Spacing
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'compact', label: 'Compact', icon: Minimize2 },
                { id: 'normal', label: 'Balanced', icon: Sliders },
                { id: 'spacious', label: 'Spacious', icon: Maximize2 }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setLayoutDensity(item.id);
                    playAudioFeedback('click');
                    showToast(`Layout density set to ${item.label}`);
                  }}
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    layoutDensity === item.id
                      ? 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Background Canvas Style */}
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider block mb-3">
              4. Background Texture Pattern
            </label>
            <div className="grid grid-cols-2 gap-2">
              {backgroundPatterns.map((pat) => (
                <button
                  key={pat.id}
                  onClick={() => {
                    setBgPattern(pat.id);
                    playAudioFeedback('click');
                    showToast(`Background pattern: ${pat.name}`);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    bgPattern === pat.id
                      ? 'border-rose-500 bg-rose-500/10 text-slate-900 dark:text-white font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold">{pat.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{pat.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Section Toggles */}
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider block mb-3">
              5. Dashboard Widget Flexibility
            </label>
            <div className="space-y-2">
              {widgetsList.map((w) => {
                const isVisible = widgetVisibility[w.key];
                return (
                  <div
                    key={w.key}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <w.icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{w.label}</span>
                    </div>
                    <button
                      onClick={() => {
                        setWidgetVisibility(prev => ({ ...prev, [w.key]: !prev[w.key] }));
                        playAudioFeedback('click');
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isVisible
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data Export & Backup Tools */}
          <div>
            <label className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider block mb-3">
              6. Data Export & Analytics Flexibility
            </label>
            <div className="space-y-2">
              <button
                onClick={() => exportToCSV(notices, 'Placement_Circular_Notices')}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-rose-600" />
                  <span>Export Circular Notices (CSV)</span>
                </div>
                <span className="text-[10px] text-slate-400">{notices.length} Records</span>
              </button>

              <button
                onClick={() => exportToCSV(placements, 'Alumni_Placement_HallOfFame')}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Export Placement Wall Stats (CSV)</span>
                </div>
                <span className="text-[10px] text-slate-400">{placements.length} Records</span>
              </button>

              <button
                onClick={() => exportToCSV(tasks, 'Coordinator_Tasks_Kanban')}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>Export Task Kanban (CSV)</span>
                </div>
                <span className="text-[10px] text-slate-400">{tasks.length} Tasks</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <button
            onClick={() => {
              setThemePalette('crimson');
              setThemeMode('light');
              setLayoutDensity('normal');
              setBgPattern('grid');
              setWidgetVisibility({ hero: true, stats: true, drives: true, resume: true, notices: true, tasks: true, placements: true });
              playAudioFeedback('pop');
              showToast('Theme preferences reset to default!');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={() => { onClose(); playAudioFeedback('click'); }}
            className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
