import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { login, getUser, getCsrfToken } from '../auth';
import './animations.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  useEffect(() => {
    async function fetchCsrfToken() {
        try {
            const { data } = await axiosInstance.get('/csrf-token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('studentName');
            localStorage.removeItem('userRole');
            console.log(data.csrf_token);
            axiosInstance.defaults.headers['X-CSRF-TOKEN'] = data.csrf_token;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            setError('Failed to fetch CSRF token.');
        }
    }
    fetchCsrfToken();
  }, []);

  const getToken = async () => {
    try {
      const token = await getCsrfToken();
      console.log(token);
      return token;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      setError('Failed to fetch CSRF token.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = await getToken();
      console.log(token);
      await login(email, password);
      localStorage.setItem('authToken', token);

      const userData = await getUser(); 
      console.log(userData.role);

      handleLogin(userData);
      setTimeout(() => {
        setIsLoading(false);
        if (userData.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (userData.role === 'student') {
          navigate('/student/dashboard');
        } else if (userData.role === 'instructor') {
          navigate('/instructor/dashboard');
        } else {
          navigate('/login');
        }
      }, 40);

    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 422) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An error occurred during login. Please try again.');
      }
      setIsLoading(false);
    }
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat" style={{ backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0)), url("src/assets/image3.jpg")' }}>
      <div className="absolute top-10 left-10 flex items-center w-1/2">
        <div className="w-24 h-7 bg-white mr-5">
          <div className="w-72 h-4 bg-slate-300"></div>
        </div>
      </div>
      <div className="w-full max-w-sm bg-black bg-opacity-75 p-6 rounded-md shadow-md">
        <div className="flex justify-center mb-5">
          <img src="images/logo.PNG" alt="CampusHub Logo" className="w-20 h-20 rounded-full" />
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className={`absolute top-1/2 left-3 transform -translate-y-1/2 ${isEmailFocused ? 'text-blue-500' : 'text-white'}`} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              required
              autoComplete="email"
              placeholder="Email"
              className="w-full h-10 pl-10 pr-4 border-b-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className={`absolute top-1/2 left-3 transform -translate-y-1/2 ${isPasswordFocused ? 'text-blue-500' : 'text-white'}`} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              required
              autoComplete="current-password"
              placeholder="Password"
              className="w-full h-10 pl-10 pr-4 border-b-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300">
            {isLoading ? (
              <div className="flex justify-center items-center space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-black rounded-full opacity-75 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
        </div>
        <div className="mt-3 text-center text-white text-sm">
          Don't have an account? <a href="/register" className="text-blue-400">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
