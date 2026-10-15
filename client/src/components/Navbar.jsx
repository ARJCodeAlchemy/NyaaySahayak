import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout, isDark, onToggleTheme }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const profileMenuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Scroll detection for header transparency changes
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 15);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Outside click detection for profile dropdown
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    // Close mobile drawer on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const activeClass = (path) => {
        return location.pathname === path
            ? 'bg-primary text-white shadow-sm'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface/80';
    };

    const handleLogoutClick = () => {
        setProfileMenuOpen(false);
        onLogout();
        navigate('/');
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-surface/90 backdrop-blur-md shadow-sm border-b border-border' 
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-250 text-white font-bold">
                                ⚖️
                            </div>
                            <div>
                                <span className="font-headline text-lg sm:text-xl font-bold tracking-tight text-text-primary">
                                    Nyay-Sahayak
                                </span>
                            </div>
                        </Link>

                        {/* Navigation Links (Desktop) */}
                        <div className="hidden md:flex items-center gap-4">
                            <nav className="flex items-center gap-1.5 bg-surface/40 backdrop-blur-sm px-2 py-1.5 rounded-full border border-border">
                                <Link to="/" className={`px-4 py-2 rounded-full text-xs font-semibold font-label transition-all ${activeClass('/')}`}>
                                    Home
                                </Link>
                                {user && (
                                    <>
                                        <Link to="/analyze" className={`px-4 py-2 rounded-full text-xs font-semibold font-label transition-all ${activeClass('/analyze')}`}>
                                            Analyze
                                        </Link>
                                        <Link to="/history" className={`px-4 py-2 rounded-full text-xs font-semibold font-label transition-all ${activeClass('/history')}`}>
                                            History
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle Button */}
                            <button
                                type="button"
                                onClick={onToggleTheme}
                                className="p-2 rounded-full bg-surface hover:bg-surface/80 border border-border text-text-secondary hover:text-primary transition-colors cursor-pointer"
                                aria-label="Toggle Theme"
                            >
                                {isDark ? (
                                    <span className="text-sm">☀️</span>
                                ) : (
                                    <span className="text-sm">🌙</span>
                                )}
                            </button>

                            {/* User profile dropdown menu */}
                            {user ? (
                                <div className="relative" ref={profileMenuRef}>
                                    <button
                                        type="button"
                                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-surface hover:bg-surface/80 border border-border transition-colors cursor-pointer"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                        <span className="text-xs font-semibold text-text-primary max-w-[90px] truncate hidden sm:inline-block">
                                            {user.name}
                                        </span>
                                        <span className="text-[10px] text-text-secondary">▼</span>
                                    </button>

                                    {profileMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-52 bg-surface rounded-2xl shadow-lg border border-border p-2.5 z-25 animate-fade-in">
                                            <div className="px-3 py-2 border-b border-border/60">
                                                <p className="text-xs font-bold text-text-primary truncate">{user.name}</p>
                                                <p className="text-[10px] text-text-secondary truncate mt-0.5">{user.email}</p>
                                            </div>
                                            <div className="py-1">
                                                <Link to="/analyze" onClick={() => setProfileMenuOpen(false)} className="block px-3 py-2 text-xs text-text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
                                                    Start Analysis
                                                </Link>
                                                <Link to="/history" onClick={() => setProfileMenuOpen(false)} className="block px-3 py-2 text-xs text-text-secondary hover:text-primary hover:bg-primary/5 rounded-xl transition-colors">
                                                    Analysis History
                                                </Link>
                                            </div>
                                            <div className="border-t border-border/60 pt-1.5 mt-1.5">
                                                <button
                                                    type="button"
                                                    onClick={handleLogoutClick}
                                                    className="w-full text-left font-label text-xs px-3 py-2 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/40 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="font-label text-xs font-bold bg-primary text-white px-5 py-2.5 rounded-full hover:opacity-95 transition-all shadow-sm hidden sm:block"
                                >
                                    Sign In
                                </Link>
                            )}

                            {/* Mobile drawer hamburger menu */}
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl text-text-secondary hover:bg-surface/85 transition-colors cursor-pointer"
                            >
                                {mobileMenuOpen ? (
                                    <span className="text-xl">✖</span>
                                ) : (
                                    <span className="text-xl">☰</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                    <div className="absolute top-16 left-4 right-4 bg-surface rounded-2xl shadow-xl border border-border p-4 animate-fade-in">
                        <nav className="flex flex-col gap-1.5">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-text-primary hover:bg-surface/80 transition-colors">
                                Home
                            </Link>
                            {user && (
                                <>
                                    <Link to="/analyze" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-text-primary hover:bg-surface/80 transition-colors">
                                        Analyze
                                    </Link>
                                    <Link to="/history" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-text-primary hover:bg-surface/80 transition-colors">
                                        History
                                    </Link>
                                </>
                            )}
                            {!user && (
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center font-label text-sm font-bold bg-primary text-white px-5 py-3 rounded-full mt-2.5">
                                    Sign In
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            )}

            {/* Header spacer to prevent overlay content */}
            <div className="h-16" />
        </>
    );
};

export default Navbar;