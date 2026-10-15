import React, { useState, useRef } from "react";

// Component providing interface for case text entry and PDF drag-and-drop uploads
export default function InputPanel({ onAnalyze, loading }) {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Submits the input text or file to parent analysis handler
    function handleSubmit(e) {
        e.preventDefault();
        if (file) {
            onAnalyze({ file });
        } else if (text.trim()) {
            onAnalyze({ text: text.trim() });
        }
    }

    function handleFileChange(e) {
        processFile(e.target.files[0]);
    }

    function handleDragOver(e) {
        e.preventDefault();
        if (!loading && !file) setIsDragging(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setIsDragging(false);
    }

    function handleDrop(e) {
        e.preventDefault();
        setIsDragging(false);
        if (!loading && !file) processFile(e.dataTransfer.files[0]);
    }

    // Validates file selection is a PDF
    function processFile(selected) {
        if (selected && selected.type === "application/pdf") {
            setFile(selected);
        } else if (selected) {
            alert("Please select a valid PDF file.");
        }
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    // Clears active file selection
    function removeFile() {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const canSubmit = !loading && (text.trim().length >= 50 || file);
    const charCount = text.trim().length;

    return (
        <form onSubmit={handleSubmit} className="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8 transition-colors duration-300">
            <h2 className="font-headline text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                <div className="p-2 bg-primary rounded-xl text-white shadow-md">
                    ⚖️
                </div>
                Case Description
            </h2>

            <div className="mb-6">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe the domestic violence case details here. Include facts such as nature of violence, parties involved, timeline, and any legal action taken..."
                    className="w-full h-44 px-4 py-3 bg-surface rounded-xl border border-border focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none font-body text-sm text-text-primary transition-all duration-200 resize-y placeholder:text-text-secondary/60"
                    disabled={loading || !!file}
                />
                <div className="flex items-center justify-between mt-2 px-1">
                    <span className={`font-label text-xs font-medium ${charCount >= 50 ? "text-emerald-600 dark:text-emerald-400" : "text-text-secondary"}`}>
                        {charCount} / 50 min characters
                    </span>
                    {!file && charCount > 0 && charCount < 50 && (
                        <span className="font-label text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                            Need {50 - charCount} more
                        </span>
                    )}
                </div>
            </div>

            {/* Visual Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center">
                    <span className="bg-surface px-3 font-label text-xs font-bold text-text-secondary uppercase tracking-widest">
                        Or upload brief
                    </span>
                </div>
            </div>

            {/* PDF Upload Selector */}
            {file ? (
                <div className="flex items-center gap-4 bg-primary/5 border border-primary/20 p-4 rounded-xl">
                    <div className="p-3 bg-surface rounded-lg border border-border text-2xl">
                        📄
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-text-primary truncate">{file.name}</p>
                        <p className="font-label text-xs text-primary font-medium mt-1">
                            {(file.size / 1024 / 1024).toFixed(2)} MB - PDF File
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 text-text-secondary hover:text-red-500 rounded-full transition-colors cursor-pointer"
                        disabled={loading}
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <label
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center w-full h-36 px-4 py-6 rounded-xl cursor-pointer transition-all duration-200 border-2 border-dashed ${isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-surface hover:border-primary/50 hover:bg-primary/5"
                        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="text-3xl mb-2">📤</span>
                        <p className="mb-1 font-body text-sm text-text-secondary">
                            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="font-label text-[9px] text-text-secondary uppercase tracking-widest">
                            PDF briefs only (Max. 10MB)
                        </p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={loading}
                    />
                </label>
            )}

            <button
                type="submit"
                disabled={!canSubmit}
                className="mt-8 w-full py-3.5 px-6 app-button-primary ui-button-enhance ui-button-shine text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
                Analyze Case File
            </button>
        </form>
    );
}
