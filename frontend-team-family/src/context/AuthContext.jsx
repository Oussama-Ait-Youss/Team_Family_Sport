import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Expose token in context for other components if needed, or just keep it internal
  const [token, setTokenState] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    api.get('/user')
      .then(res => {
        // Handle Laravel's data wrapping if necessary, or just use res.data
        setUser(res.data.data || res.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
        setTokenState(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      
      const accessToken = response.data.token || response.data.access_token;
      
      localStorage.setItem('token', accessToken);
      setTokenState(accessToken);
      
      try {
        const userRes = await api.get('/user');
        setUser(userRes.data.data || userRes.data);
      } catch (err) {
        if (response.data.user) {
          setUser(response.data.user);
        }
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Identifiants incorrects.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (localStorage.getItem('token')) {
        await api.post('/logout');
      }
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem('token');
      setTokenState(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
