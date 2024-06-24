import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { register } from '../auth';
import './animations.css';


const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const { data } = await axiosInstance.get('/csrf-token');
        axiosInstance.defaults.headers['X-CSRF-TOKEN'] = data.csrf_token;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    }
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (email !== email.toLowerCase()) {
      setErrorMessage('Email must be in lowercase.');
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    if (!role) {
      setErrorMessage('You must pick a role.');
      setIsLoading(false);
      return;
    }

    try {
      await register(name, email, password, passwordConfirmation, role);
      setSuccessMessage('Registration Successful!');
      setErrorMessage('');
      setTimeout(() => {
        setIsLoading(false);
      }, 40);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage('Invalid data. Please check your input.');
      } else if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred during registration.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
      console.error('Error registering:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-no-repeat" style={{ backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 0.65) 1.14%, rgba(0, 0, 0, 0.00) 40.45%), url("src/assets/image3.jpg")' }}>
      <div className="w-full max-w-md p-6 bg-black bg-opacity-90 shadow-md rounded-md mx-4">
        <div className="flex justify-center mb-5">
          <img src="images/logo.PNG" alt="CampusHub Logo" className="w-24 h-24 rounded-full" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Register</h1>
          {errorMessage && <p className="text-red-500 text-center text-[14px]">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center text-[14px]">{successMessage}</p>}
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                className="w-full h-10 border-b-2 border-white bg-transparent text-white placeholder-gray-200 focus:outline-none focus:border-blue-500 pl-10"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faUser} className="absolute top-3 left-3 text-white" />
            </div>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                className="w-full h-10 border-b-2 border-white bg-transparent text-white placeholder-gray-200 focus:outline-none focus:border-blue-500 pl-10"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faEnvelope} className="absolute top-3 left-3 text-white" />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full h-10 border-b-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 pl-10 pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faLock} className="absolute top-3 left-3 text-white" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-1 transform -translate-y-1/2 text-white focus:outline-none border-none"
                style={{ background: 'transparent' }}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full h-10 border-b-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:border-blue-500 pl-10 pr-10"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faLock} className="absolute top-3 left-3 text-white" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-1 transform -translate-y-1/2 text-white focus:outline-none border-none"
                style={{ background: 'transparent' }}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <label className="flex items-center">
                <input type="radio" value="student" checked={role === 'student'} onChange={() => setRole('student')} className="mr-2" />
                Student
              </label>
              <label className="flex items-center">
                <input type="radio" value="instructor" checked={role === 'instructor'} onChange={() => setRole('instructor')} className="mr-2" />
                Instructor
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-blue-500 text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none">
            {isLoading ? (
              <div className="flex justify-center items-center space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-black rounded-full opacity-75 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            ) : (
              'Register'
            )}
          </button>
          <div className="mt-3 text-center text-white">
            Already have an account? <a href="/login" className="text-white underline text-sm">Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
