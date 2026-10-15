import API_BASE from './config';
import axios from 'axios';

// Registers a new user
export async function signupUser({ name, email, password }) {
    const response = await axios.post(`${API_BASE}/api/signup`, { name, email, password });
    return response.data;
}

// Authenticates user and retrieves token
export async function loginUser({ email, password }) {
    const response = await axios.post(`${API_BASE}/api/login`, { email, password });
    return response.data;
}

// Retrieves current user profile using a token
export async function getCurrentUser(token) {
    const response = await axios.get(`${API_BASE}/api/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
}
