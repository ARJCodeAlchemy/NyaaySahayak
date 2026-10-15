import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser, signupUser } from '../api/authApi';

const AuthPanel = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic Validations
        if (!email.trim() || !password) {
            setError('Please fill in all fields.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (!isLogin && !name.trim()) {
            setError('Please enter your name.');
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                const data = await loginUser({ email, password });
                if (data.success) {
                    setSuccess('Login successful! Redirecting...');
                    setTimeout(() => {
                        login(data.user, data.token);
                        navigate('/');
                    }, 1000);
                } else {
                    setError(data.message || 'Login failed!');
                }
            } else {
                const data = await signupUser({ name, email, password });
                if (data.success) {
                    setSuccess('Registration successful! Redirecting...');
                    setTimeout(() => {
                        login(data.user, data.token);
                        navigate('/');
                    }, 1000);
                } else {
                    setError(data.message || 'Registration failed!');
                }
            }
        } catch (err) {
            const backendError = err.response?.data?.error || err.response?.data?.message || 'Something went wrong. Please try again.';
            setError(backendError);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto animate-fade-in-up">
            <div className="app-card p-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <span className="inline-flex items-center text-4xl mb-3">⚖️</span>
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-text-primary">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </h2>
                    <p className="text-sm text-text-secondary mt-2 font-body">
                        {isLogin ? 'Access your legal assistant workspace' : 'Join Nyay-Sahayak and start analyzing cases'}
                    </p>
                </div>

                {/* Banners */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 p-3.5 rounded-xl mb-5 text-sm font-medium animate-fade-in text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-xl mb-5 text-sm font-medium animate-fade-in text-center">
                        {success}
                    </div>
                )}

                {/* Forms */}
                <form onSubmit={handleFormSubmit} className="space-y-5 font-body">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full app-input"
                                placeholder="Shubh Sharma"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full app-input"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full app-input pr-12"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary text-sm focus:outline-none transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full app-button-primary ui-button-enhance ui-button-shine py-3 text-sm disabled:opacity-55 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                {/* Toggle Tab */}
                <div className="mt-6 text-center text-sm font-body">
                    <span className="text-text-secondary">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setSuccess('');
                        }}
                        disabled={loading}
                        className="text-primary hover:underline font-semibold"
                    >
                        {isLogin ? 'Register' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPanel;