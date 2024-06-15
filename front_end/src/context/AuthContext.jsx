import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { logout } from '../auth';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setStudentId('123456');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, studentId, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
