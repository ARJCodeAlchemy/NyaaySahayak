import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const userData = await getCurrentUser(savedToken);
          setUser(userData);
          setToken(savedToken);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
          console.error("Session verification failed:", err);
          // Clear invalid session
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken('');
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = (userData, userToken) => {
    const activeToken = userToken || localStorage.getItem('token');
    setUser(userData);
    setToken(activeToken);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userToken) {
      localStorage.setItem('token', userToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
