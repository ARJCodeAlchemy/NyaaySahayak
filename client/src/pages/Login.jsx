import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPanel from '../components/AuthPanel';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // If user is already logged in, redirect to home page
    useEffect(() => {
        if (!loading && user) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <AuthPanel />
        </div>
    );
};

export default Login;