import React, { createContext, useContext, useState, useEffect } from 'react';
import { logout } from '../auth';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole('');
    }
  }, []);

  const handleLogin = (userData) => {
    const { token, role } = userData;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('studentName');
      localStorage.removeItem('userRole');
      localStorage.removeItem('profileImage');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, studentId, handleLogin, handleLogout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
