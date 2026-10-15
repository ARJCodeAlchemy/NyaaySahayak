import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout({ children, user, onLogout, isDark, onToggleTheme }) {
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    return (
        <div className="relative min-h-screen bg-background transition-colors duration-300 flex flex-col font-body">
            {/* Decorative scales of justice background watermark */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-5 dark:opacity-10 flex items-center justify-center" aria-hidden="true">
                <span className="text-[30vw] select-none">⚖️</span>
            </div>

            <div className="relative z-10 flex flex-col flex-1">
                {/* Navigation Header */}
                <Navbar
                    user={user}
                    onLogout={onLogout}
                    isDark={isDark}
                    onToggleTheme={onToggleTheme}
                />

                {/* Main Content Area */}
                <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="mt-auto border-t border-border bg-surface/80 backdrop-blur-sm transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                                    ⚖️
                                </div>
                                <span className="font-headline text-sm font-semibold text-text-primary">Nyay-Sahayak</span>
                            </div>

                            <div className="flex items-center gap-6">
                                <Link to="/privacy-policy" className="font-label text-xs text-text-secondary hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms-of-service" className="font-label text-xs text-text-secondary hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setShowDisclaimer((prev) => !prev)}
                                    className="font-label text-xs text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
                                    aria-expanded={showDisclaimer}
                                >
                                    Disclaimer
                                </button>
                            </div>

                            <p className="font-label text-xs text-text-secondary">
                                © {new Date().getFullYear()} Nyay-Sahayak. Built for legal accessibility.
                            </p>
                        </div>

                        {showDisclaimer && (
                            <div className="mt-4 rounded-xl border border-amber-200 dark:border-amber-900/30 bg-amber-50/70 dark:bg-amber-950/10 px-4 py-3 animate-fade-in">
                                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                                    <strong>Disclaimer:</strong> Nyay-Sahayak is an AI legal assistant helper designed for research, educational, and informational assistance. It does <strong>not</strong> substitute for professional legal advice or representation. Please consult a qualified advocate for official legal guidance.
                                </p>
                            </div>
                        )}
                    </div>
                </footer>
            </div>
        </div>
    );
}

