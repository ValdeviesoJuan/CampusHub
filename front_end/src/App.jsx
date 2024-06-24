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
import Dashboard_admin from './components/Dashboard_admin';
import EnrollmentAdmin from './components/Enrollment_admin';
import Dashboard_instructor from './components/Dashboard_instructor';
import EnrollmentInstructor from './components/Enrollment_instructor';
import Schedule_instructor from './components/Schedule_instructor';

function App() {
  const { isAuthenticated, handleLogout, userRole } = useAuth();
  const navigate = useNavigate();
  console.log(isAuthenticated);

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'admin':
        return "/admin/dashboard";
      case 'student':
        return "/student/dashboard";
      case 'instructor':
        return "/instructor/dashboard";
      default:
        return "/login";
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100">
      {isAuthenticated && <Header />}
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className="flex flex-col flex-1 bg-slate-100">
          <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? getDashboardRoute(userRole) : "/login"} />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to={getDashboardRoute(userRole)} /> : <LoginForm />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to={getDashboardRoute(userRole)} /> : <RegisterForm />} />
            <Route path="/admin/dashboard" element={isAuthenticated && userRole === 'admin' ? <Dashboard_admin /> : <Navigate to="/login" />} />
            <Route path="/admin/instructor-assign" element={isAuthenticated && userRole === 'admin' ? <EnrollmentAdmin /> : <Navigate to="/login" />} />
            <Route path="/admin/schedules" element={isAuthenticated && userRole === 'admin' ? <Schedule_admin /> : <Navigate to="/login" />} />
            <Route path="/student/dashboard" element={isAuthenticated && userRole === 'student' ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/student/profile" element={isAuthenticated && userRole === 'student' ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/student/pseudo-enrollment" element={isAuthenticated && userRole === 'student' ? <EnrollmentForm /> : <Navigate to="/login" />} />
            <Route path="/student/grades" element={isAuthenticated && userRole === 'student' ? <Grades_student /> : <Navigate to="/login" />} />
            <Route path="/student/schedules" element={isAuthenticated && userRole === 'student' ? <Schedule_student /> : <Navigate to="/login" />} />
            <Route path="/instructor/dashboard" element={isAuthenticated && userRole === 'instructor' ? <Dashboard_instructor /> : <Navigate to="/login" />} />
            <Route path="/instructor/pseudo-enrollment" element={isAuthenticated && userRole === 'instructor' ? <EnrollmentInstructor /> : <Navigate to="/login" />} />
            <Route path="/instructor/grades" element={isAuthenticated && userRole === 'instructor' ? <Grades_admin /> :  <Navigate to="/login" />} />
            <Route path="/instructor/schedules" element={isAuthenticated && userRole === 'instructor' ? <Schedule_instructor/> : <Navigate to="/login" />} />
            <Route path="/admin" element={isAuthenticated && userRole === 'admin' ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/students" element={isAuthenticated && userRole === 'admin' ? <Students /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? (userRole === 'admin' ? "/admin/dashboard" : "/student/dashboard") : "/login"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;