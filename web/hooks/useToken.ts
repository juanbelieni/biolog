import { useState, useEffect } from 'react';

const storage = {
  getToken() {
    if (typeof window === 'undefined') {
      return '';
    }
    try {
      return localStorage.getItem('token') || '';
    } catch (error) {
      return '';
    }
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },
};

export default function useToken() {
  const [token, setToken] = useState(() => storage.getToken());

  useEffect(() => {
    storage.setToken(token);
  }, [token]);

  return { token, setToken };
}
