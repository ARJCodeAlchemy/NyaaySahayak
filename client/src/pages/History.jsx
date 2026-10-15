import React, { useMemo, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { deleteHistory } from '../api/historyApi';

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleString();
}

export default function History({ history = [], onSelect, setHistory }) {
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const { token } = useContext(AuthContext);

  const filteredHistory = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return history;

    return history.filter((item) => {
      return (
        String(item.inputPreview || "").toLowerCase().includes(term) ||
        String(item.inputType || "").toLowerCase().includes(term)
      );
    });
  }, [history, query]);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevents selection click from triggering
    if (!window.confirm("Are you sure you want to delete this case analysis from your history?")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteHistory(token, id);
      // Remove from state instantly
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete history item:", err);
      alert("Failed to delete the case. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header and Search Panel */}
      <section className="app-card p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="font-label text-xs font-bold tracking-widest uppercase text-primary">History</p>
            <h1 className="mt-2 font-headline text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              All Saved Cases
            </h1>
            <p className="font-body text-text-secondary mt-1 text-sm">
              Browse your complete analysis history, query by keywords, and reopen or clear logs.
            </p>
          </div>

          <div className="w-full lg:w-[320px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full app-input"
              placeholder="Search by keywords or type..."
            />
          </div>
        </div>
      </section>

      {/* Metrics Indicators */}
      <div className="flex items-center justify-between gap-3">
        <p className="font-label text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          Showing {filteredHistory.length} of {history.length} records
        </p>
        <Link to="/dashboard" className="font-label text-xs font-bold text-primary hover:underline uppercase tracking-wider">
          Back to dashboard
        </Link>
      </div>

      {/* History Grid */}
      {filteredHistory.length === 0 ? (
        <div className="app-card p-12 text-center flex flex-col items-center">
          <span className="text-5xl mb-4">📂</span>
          <h2 className="font-headline text-xl font-bold text-text-primary">No matching records found</h2>
          <p className="font-body text-text-secondary text-sm mt-2 max-w-xs mx-auto">
            Try searching another keyword, or start a new case analysis.
          </p>
          <Link to="/analyze" className="mt-6 app-button-primary ui-button-enhance ui-button-shine px-6 py-2.5 text-xs font-semibold uppercase tracking-wider">
            Analyze new case
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item, index) => (
            <article
              key={item.id}
              className="app-card ui-border-highlight animate-popIn p-5 min-h-[220px] flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => onSelect(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSelect(item);
                }
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs relative z-10">
                  <span className="px-2.5 py-1 bg-surface font-label text-[10px] font-bold uppercase tracking-wider rounded-full text-primary border border-border">
                    {item.inputType}
                  </span>
                  <span className="font-label text-text-secondary">{formatDate(item.createdAt)}</span>
                </div>

                <p className="font-body text-text-primary text-sm leading-relaxed line-clamp-4 relative z-10">
                  {item.inputPreview || "No preview available for this document."}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between relative z-10">
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, item.id)}
                  disabled={deletingId === item.id}
                  className="font-label text-xs font-semibold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  {deletingId === item.id ? 'Deleting...' : 'Delete'}
                </button>
                <div className="flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                  <span className="font-label text-xs font-bold text-primary">Open result</span>
                  <span className="text-primary font-bold">➔</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
