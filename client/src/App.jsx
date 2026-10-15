import React, { useContext, useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import History from './pages/History'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthContext } from './context/AuthContext'
import { fetchHistory } from './api/historyApi'

function App() {
  const { user, token, loading, logout } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [quoteSeed] = useState(() => Date.now());
  const navigate = useNavigate();

  // Initialize theme configuration from local storage
  useEffect(() => {
    const cachedTheme = localStorage.getItem('nyay_theme');
    if (cachedTheme === 'dark') {
      setIsDark(true);
    } else if (!cachedTheme && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  // Update theme class on HTML document root element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nyay_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nyay_theme', 'light');
    }
  }, [isDark]);

  // Load analysis history when authenticated
  useEffect(() => {
    const loadHistory = async () => {
      if (token) {
        setHistoryLoading(true);
        try {
          const list = await fetchHistory(token);
          setHistory(list);
        } catch (err) {
          console.error("Failed to load history:", err);
        } finally {
          setHistoryLoading(false);
        }
      } else {
        setHistory([]);
      }
    };
    loadHistory();
  }, [token]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleHistorySelect = (item) => {
    // Navigate to analyze and pass the history item details in the route state
    navigate('/analyze', { state: { selectedCase: item } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Layout user={user} onLogout={logout} isDark={isDark} onToggleTheme={toggleTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/dashboard" element={
          user ? (
            <Dashboard
              user={user}
              quoteSeed={quoteSeed}
              history={history}
              onSelect={handleHistorySelect}
            />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/analyze" element={user ? <Analyze /> : <Navigate to="/login" replace />} />
        <Route path="/history" element={
          user ? (
            <History
              history={history}
              onSelect={handleHistorySelect}
              setHistory={setHistory}
            />
          ) : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
