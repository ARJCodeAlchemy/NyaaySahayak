import React from 'react';

// Component to display a concise summary section for a legal case
export default function CaseSummary({ summary }) {
    return (
        <div className="bg-surface rounded-xl border border-border overflow-hidden transition-colors duration-300">
            <div className="bg-primary/5 px-6 py-3 border-b border-border">
                <h3 className="font-headline text-base font-semibold text-text-primary flex items-center gap-2">
                    <span className="text-lg">📄</span>
                    Case Summary
                </h3>
            </div>
            <div className="px-6 py-4">
                <p className="font-body text-text-secondary text-sm leading-relaxed whitespace-pre-line">{summary}</p>
            </div>
        </div>
    );
}
