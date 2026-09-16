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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
          <Brain className="w-3.5 h-3.5" /> COSMOQ ATS RESUME INTELLIGENCE
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display">Evaluate Resume & Job Description Compatibility</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">Instant AI keyword score, ATS gap analysis, and recruiter recommendation.</p>
      </div>

      <div className="cosmo-glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">Target Job Role</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-rose-500"
            >
              <option value="Fullstack Engineer">Fullstack Engineer (React / Node)</option>
              <option value="AI / ML Systems Engineer">AI / ML Systems Engineer (Python / PyTorch)</option>
              <option value="Cloud Solutions Architect">Cloud Solutions Architect (AWS / Kubernetes)</option>
              <option value="Data Engineer & Analytics">Data Engineer (SQL / Spark)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">Candidate Department</label>
            <input
              type="text"
              disabled
              value={`Dept: ${currentDept}`}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">Paste Resume Text / Skill Summary</label>
            <button
              type="button"
              onClick={() => setResumeText("Experienced Fullstack Engineer proficient in React, Node.js, TypeScript, PostgreSQL, REST APIs, GraphQL, and Docker. Implemented real-time features using WebSockets and CI/CD automation pipelines.")}
              className="text-[10px] font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              + Fill Sample Resume
            </button>
          </div>
          <textarea
            rows={5}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste candidate technical summary, key projects, languages (React, Python, SQL, C++), and achievements..."
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono focus:outline-none focus:border-rose-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        <button
          onClick={handleAnalyzeResume}
          disabled={isAnalyzingResume}
          className="w-full py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-700 to-rose-500 text-white font-bold text-xs uppercase tracking-wider hover:from-rose-500 hover:to-rose-600 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transform hover:scale-[1.01]"
        >
          {isAnalyzingResume ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing ATS Compatibility...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Compute AI ATS Match Score</span>
            </>
          )}
        </button>

        {aiMatchResult && (
          <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-rose-500/30 space-y-4 animate-fade-in-scale shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Target Role: {aiMatchResult.targetRole}</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">AI Assessment Results</h4>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-display">{aiMatchResult.score}%</span>
                <div className="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase">ATS Compatibility</div>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/60 leading-relaxed">
              {aiMatchResult.recommendation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300">
                <div className="font-bold text-[10px] uppercase mb-1">✔ Matching Tech Keywords</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {aiMatchResult.matchingSkills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-900 dark:text-rose-200 text-[10px] font-mono">{s}</span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                <div className="font-bold text-[10px] uppercase mb-1">⚡ Recommended Gaps to Add</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {aiMatchResult.missingKeywords.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-[10px] font-mono">{s}</span>
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
