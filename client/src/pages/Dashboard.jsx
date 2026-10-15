import React from "react";
import { Link } from "react-router-dom";

const LEGAL_QUOTES = [
    {
        quote: "Justice should not only be done, but should manifestly and undoubtedly be seen to be done.",
        author: "Lord Hewart",
    },
    {
        quote: "Bail is the rule and jail is the exception.",
        author: "Justice V.R. Krishna Iyer",
    },
    {
        quote: "The Constitution is not a mere lawyers' document, it is a vehicle of life.",
        author: "Dr. B.R. Ambedkar",
    },
    {
        quote: "Law and order exist for the purpose of establishing justice.",
        author: "Martin Luther King Jr.",
    },
    {
        quote: "A judiciary must be independent if liberty is to survive.",
        author: "Felix Frankfurter",
    },
    {
        quote: "Injustice anywhere is a threat to justice everywhere.",
        author: "Martin Luther King Jr.",
    },
    {
        quote: "The life of the law has not been logic; it has been experience.",
        author: "Oliver Wendell Holmes Jr.",
    },
    {
        quote: "Equal justice under law is not merely a caption on the facade of the Supreme Court.",
        author: "Lewis F. Powell Jr.",
    },
];

// Formats a date value into a localized human-readable string
function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown date";
    return date.toLocaleString();
}

// Extracts the first letter of a name to use as a fallback profile avatar
function getAvatarLabel(name) {
    return String(name || "U").trim().charAt(0).toUpperCase() || "U";
}

// Randomly selects a legal quote from a predefined list based on a seed value
function pickQuote(quoteSeed) {
    const safeSeed = Number(quoteSeed) || 0;
    const index = Math.abs(safeSeed) % LEGAL_QUOTES.length;
    return LEGAL_QUOTES[index];
}

// Main dashboard page showcasing user stats, profile summary, and recent activity
export default function Dashboard({ user, quoteSeed, history = [], onSelect }) {
    const totalCases = history.length;
    const textCases = history.filter((h) => h.inputType === "text").length;
    const pdfCases = history.filter((h) => h.inputType === "pdf").length;
    const recentHistory = history.slice(0, 12);
    const firstName = String(user?.name || "User").split(" ")[0];
    const quoteOfSession = pickQuote(quoteSeed);
    const selectedGender = user?.gender || user?.sex || "Not set";

    const stats = [
        { label: "Total Cases", value: totalCases },
        { label: "Text Analyses", value: textCases },
        { label: "PDF Analyses", value: pdfCases },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            {/* Profile and Greetings Section */}
            <section className="app-card p-6 sm:p-8">
                <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-stretch">
                    <aside className="app-card p-5 sm:p-6 order-2 lg:order-1 h-full flex flex-col bg-surface/50 border-dashed">
                        <p className="font-label text-[10px] font-semibold tracking-widest uppercase text-text-secondary">
                            Profile Summary
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                            {user?.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name || "User avatar"}
                                    className="h-14 w-14 rounded-full object-cover border border-border"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <span className="inline-flex h-14 w-14 rounded-full items-center justify-center gradient-primary-bg text-white font-headline text-2xl font-bold">
                                    {getAvatarLabel(user?.name)}
                                </span>
                            )}

                            <div className="min-w-0">
                                <p className="font-label text-sm font-bold text-text-primary truncate">{user?.name || "User"}</p>
                                <p className="font-body text-xs text-text-secondary truncate">{user?.email || "No email"}</p>
                                <p className="font-body text-[11px] text-text-secondary mt-1 font-medium">Gender: {selectedGender}</p>
                            </div>
                        </div>
                    </aside>

                    {/* Greeting Box */}
                    <div className="order-1 lg:order-2 flex flex-col justify-between">
                        <div>
                            <p className="font-label text-xs font-bold tracking-widest uppercase text-primary">Workspace</p>
                            <h1 className="mt-2 font-headline text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                                Welcome back, {firstName}
                            </h1>
                        </div>

                        <div className="mt-5 rounded-2xl ui-panel-box p-5 flex-1 min-h-[100px] flex flex-col justify-center">
                            <blockquote className="font-body text-text-primary text-base italic leading-relaxed">
                                "{quoteOfSession.quote}"
                            </blockquote>
                            <p className="mt-2 font-label text-xs font-semibold text-text-secondary text-right">
                                — {quoteOfSession.author}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className="app-card ui-border-highlight animate-popIn p-5 flex items-center justify-between"
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                        <div>
                            <p className="font-label text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                {stat.label}
                            </p>
                            <span className="font-headline text-2xl font-extrabold text-text-primary mt-1 block">
                                {stat.value}
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                            ⚖️
                        </div>
                    </div>
                ))}
            </div>

            {/* History Cases Display */}
            {history.length === 0 ? (
                <div className="app-card flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-3xl mb-5 animate-pulse">
                        📄
                    </div>
                    <h3 className="font-headline text-xl font-bold text-text-primary mb-2">No analysis history yet</h3>
                    <p className="font-body text-text-secondary max-w-sm mx-auto mb-8 text-sm">
                        You haven't analyzed any cases yet. Head over to the Analyze page to run your first precedent check.
                    </p>
                    <Link to="/analyze" className="app-button-primary ui-button-enhance ui-button-shine px-8 py-3.5 text-sm shadow-md">
                        Start First Analysis
                    </Link>
                </div>
            ) : (
                <section className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="font-headline text-2xl font-bold text-text-primary">Recent Case Summaries</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentHistory.map((item, index) => (
                            <article
                                key={item.id}
                                className="app-card ui-border-highlight animate-popIn p-5 min-h-[220px] flex flex-col justify-between group cursor-pointer"
                                style={{ animationDelay: `${index * 0.06}s` }}
                                onClick={() => onSelect(item)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        onSelect(item);
                                    }
                                }}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3 text-xs">
                                        <span className="px-2.5 py-1 bg-surface font-label text-[10px] font-bold uppercase tracking-wider rounded-full text-primary border border-border">
                                            {item.inputType}
                                        </span>
                                        <span className="font-label text-text-secondary">{formatDate(item.createdAt)}</span>
                                    </div>

                                    <p className="font-body text-text-primary text-sm leading-relaxed line-clamp-4">
                                        {item.inputPreview || "No preview available for this document."}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                                    <span className="font-label text-xs font-bold text-primary group-hover:underline">Open Analysis</span>
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-all duration-200">
                                        ➔
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}