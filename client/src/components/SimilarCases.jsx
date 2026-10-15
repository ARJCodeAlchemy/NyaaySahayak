import React from 'react';

// Component that displays a grid of legally similar case precedents
export default function SimilarCases({ cases }) {
  if (!cases || cases.length === 0) return null;

  const formatCaseTitle = (title) => String(title || "").replace(/_+/g, " ").trim();

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between pb-3">
        <h3 className="font-headline text-lg font-bold text-text-primary flex items-center gap-2">
          <span className="text-xl">🏛️</span>
          Similar High Court Judgments
        </h3>
        <span className="font-label text-[10px] font-extrabold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 tracking-wider">
          {cases.length} MATCHES
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((c, i) => (
          <div 
            key={i} 
            className="bg-surface rounded-xl p-6 border border-border hover:shadow-md transition-all duration-200 group flex flex-col justify-between h-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 gradient-primary-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <h4 className="font-headline text-sm font-bold text-text-primary leading-snug">
                  {formatCaseTitle(c.caseTitle)}
                </h4>
                <div className="shrink-0 flex flex-col items-end">
                  <span className="font-label text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    {c.similarityScore}% Match
                  </span>
                  <span className="font-label text-[10px] text-text-secondary mt-1.5 bg-background border border-border px-2 py-0.5 rounded">
                    {c.year}
                  </span>
                </div>
              </div>
              
              <span className="inline-flex items-center font-label text-[9px] font-semibold px-2 py-1 bg-primary/5 text-primary rounded border border-primary/20 tracking-wider mb-4">
                CASE NO: {c.caseNumber}
              </span>

              <p className="font-body text-xs text-text-secondary leading-relaxed mb-6 whitespace-pre-line">
                <strong className="text-text-primary block text-[10px] uppercase tracking-wider mb-1">Key Parallels</strong>
                {c.keyParallels}
              </p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex items-start gap-3 bg-background border border-border rounded-lg p-3">
                <span className="text-sm mt-0.5">⚖️</span>
                <div className="text-xs">
                  <span className="font-label font-bold text-text-primary block mb-1 uppercase tracking-wider text-[9px]">Final Decision</span>
                  <span className="font-body text-text-secondary leading-relaxed block">{c.decision}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}