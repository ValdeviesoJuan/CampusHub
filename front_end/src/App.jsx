import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './newtablink';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import Students from './components/Students';
import Admin from './components/Admin';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import EnrollmentForm from './components/Enrollment';
import Grades_student from './components/Grades_student';
import Schedule_student from './components/Schedule_student';
import Grades_admin from './components/Grades_admin';
import Schedule_admin from './components/Schedule_admin';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutAndNavigate = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
      <div className="flex flex-col h-screen w-screen bg-slate-100">
        {isAuthenticated && <Header />}
        <div className="flex flex-1">
          {isAuthenticated && <Sidebar onLogout={handleLogoutAndNavigate} />}
          <div className="flex flex-col flex-1 bg-slate-100">
            <Routes>
              <Route exact path="/" element={<LoginForm />} />
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/register" element={<RegisterForm />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
              <Route exact path="/Profile" element={<Profile />} />
              <Route exact path="/Admin" element={<Admin />} />
              <Route exact path="/Students" element={<Students />} />
              <Route exact path="/pseudo-enrollment" element={<EnrollmentForm />} />
              <Route exact path="/Grades_student" element={<Grades_student />} />
              <Route exact path="/Schedule_student" element={<Schedule_student />} />
              <Route exact path="/Grades_admin" element={<Grades_admin />} />
              <Route exact path="/Schedule_admin" element={<Schedule_admin />} />
              <Route exact path="/Settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;