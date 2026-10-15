import React, { useState } from "react";

// Cleans up whitespace and normalizes text for display
function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
}

// Generates a shortened version of a long description for better UI fitting
function getConciseDescription(text, maxLength = 180) {
    const normalized = normalizeText(text);
    if (normalized.length <= maxLength) return normalized;
    const sentenceEnd = normalized.lastIndexOf(". ", maxLength);
    if (sentenceEnd >= 100) return `${normalized.slice(0, sentenceEnd + 1)}...`;
    return `${normalized.slice(0, maxLength).trim()}...`;
}

// Component to display a list of applicable legal sections with expandable details
export default function LegalProvisions({ provisions }) {
    const [expandedIndex, setExpandedIndex] = useState(null);

    if (!provisions || provisions.length === 0) return null;

    return (
        <div className="bg-surface rounded-xl border border-border overflow-hidden transition-colors duration-300">
            <div className="bg-primary/5 px-6 py-3 border-b border-border">
                <h3 className="font-headline text-base font-semibold text-text-primary flex items-center gap-2">
                    <span className="text-lg">⚖️</span>
                    Relevant Legal Provisions
                </h3>
            </div>
            <div className="divide-y divide-border">
                {provisions.map((p, i) => (
                    <button
                        type="button"
                        key={i}
                        className="w-full text-left px-6 py-4 hover:bg-primary/5 transition-colors duration-200 cursor-pointer focus:outline-none"
                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        aria-expanded={expandedIndex === i}
                    >
                        <div className="flex items-start gap-3">
                            <span className="shrink-0 w-7 h-7 rounded-full gradient-primary-bg text-white text-xs font-bold flex items-center justify-center mt-0.5">
                                {i + 1}
                            </span>
                            <div className="w-full">
                                <p className="font-headline font-semibold text-text-primary text-sm">
                                    {p.section}
                                    <span className="ml-2 font-label text-xs font-normal text-text-secondary bg-background px-2 py-0.5 rounded-full border border-border">
                                        {p.act}
                                    </span>
                                </p>
                                <p className="font-body text-sm text-text-secondary mt-1 leading-relaxed">
                                    {expandedIndex === i ? normalizeText(p.relevance) : getConciseDescription(p.relevance)}
                                </p>
                                <p className="font-label text-xs font-semibold text-primary mt-2">
                                    {expandedIndex === i ? "Click to collapse" : "Click to expand"}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
