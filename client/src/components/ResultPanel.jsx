import React from 'react';
import CaseSummary from "./CaseSummary";
import LegalProvisions from "./LegalProvisions";
import SimilarCases from "./SimilarCases";

// Formats the total time taken for analysis into a readable string
function formatAnalysisTime(ms) {
  if (typeof ms !== "number" || Number.isNaN(ms) || ms < 0) return null;
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(2)} s`;
}

// Container component that holds the full suite of analysis results sections
export default function ResultsPanel({ result, analysisTimeMs }) {
  const timeLabel = formatAnalysisTime(analysisTimeMs);

  return (
    <div className="space-y-6 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-2xl font-bold text-text-primary">Analysis Results</h2>
        {timeLabel && (
          <span className="font-label text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Completed in {timeLabel}
          </span>
        )}
      </div>

      <CaseSummary summary={result.summary} />
      <LegalProvisions provisions={result.legalProvisions} />
      <SimilarCases cases={result.similarCases} />

      {result.disclaimer && (
        <div className="bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30 rounded-xl px-5 py-4 mt-6 flex gap-3">
          <span className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">⚠️</span>
          <p className="font-body text-xs text-amber-800 dark:text-amber-300 leading-relaxed italic">{result.disclaimer}</p>
        </div>
      )}
    </div>
  );
}