import React from 'react';
import { Brain, Loader2, Sparkles } from 'lucide-react';

export default function ResumeMatcherTab({
  targetRole,
  setTargetRole,
  currentDept,
  resumeText,
  setResumeText,
  handleAnalyzeResume,
  isAnalyzingResume,
  aiMatchResult
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Brain className="w-3.5 h-3.5" /> COSMOQ ATS RESUME INTELLIGENCE
        </div>
        <h2 className="text-3xl font-bold text-white font-display">Evaluate Resume & Job Description Compatibility</h2>
        <p className="text-xs text-slate-400">Instant AI keyword score, ATS gap analysis, and recruiter recommendation.</p>
      </div>

      <div className="cosmo-glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-2">Target Job Role</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-blue-500"
            >
              <option value="Fullstack Engineer">Fullstack Engineer (React / Node)</option>
              <option value="AI / ML Systems Engineer">AI / ML Systems Engineer (Python / PyTorch)</option>
              <option value="Cloud Solutions Architect">Cloud Solutions Architect (AWS / Kubernetes)</option>
              <option value="Data Engineer & Analytics">Data Engineer (SQL / Spark)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-2">Candidate Department</label>
            <input
              type="text"
              disabled
              value={`Dept: ${currentDept}`}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/40 border border-white/10 text-slate-400 text-xs font-semibold cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-2">Paste Resume Text / Skill Summary</label>
          <textarea
            rows={5}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste candidate technical summary, key projects, languages (React, Python, SQL, C++), and achievements..."
            className="w-full p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
          />
        </div>

        <button
          onClick={handleAnalyzeResume}
          disabled={isAnalyzingResume}
          className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-xs uppercase tracking-wider hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {isAnalyzingResume ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing ATS Compatibility...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>Compute AI ATS Match Score</span>
            </>
          )}
        </button>

        {aiMatchResult && (
          <div className="mt-6 p-6 rounded-2xl bg-slate-900/90 border border-blue-500/30 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">Target Role: {aiMatchResult.targetRole}</span>
                <h4 className="text-lg font-bold text-white">AI Assessment Results</h4>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-blue-400 font-display">{aiMatchResult.score}%</span>
                <div className="text-[10px] text-emerald-400 font-bold uppercase">ATS Compatibility</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 leading-relaxed">
              {aiMatchResult.recommendation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <div className="font-bold text-[10px] uppercase mb-1">✔ Matching Tech Keywords</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {aiMatchResult.matchingSkills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/20 text-[10px] font-mono">{s}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <div className="font-bold text-[10px] uppercase mb-1">⚡ Recommended Gaps to Add</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {aiMatchResult.missingKeywords.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
