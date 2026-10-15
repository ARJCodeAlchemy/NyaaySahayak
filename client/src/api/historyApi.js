import API_BASE from './config';
import axios from 'axios';

// Fetch all history for logged-in user
export async function fetchHistory(token) {
  const response = await axios.get(`${API_BASE}/api/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.history;
}

// Delete a specific history entry
export async function deleteHistory(token, historyId) {
  const response = await axios.delete(`${API_BASE}/api/history/${historyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}