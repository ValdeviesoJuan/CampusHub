import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { register } from '../auth';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('')

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

    if (email !== email.toLowerCase()) {
      setErrorMessage('Email must be in lowercase.');
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (!role) {
      setErrorMessage('You must pick a role in LIFE MYGHAD.');
      return;
    }

    try {
      await register(name, email, password, passwordConfirmation, role);
      setSuccessMessage('Registration Successful!');
      setErrorMessage('');

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage('Invalid data. Please check your input.');

      } else if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred during registration.');

      } else {
        setErrorMessage('An error occurred. Please try again later.');

      }

      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <div className="relative flex justify-center items-center h-screen w-screen bg-cover bg-no-repeat" style={{ backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 0.65) 1.14%, rgba(0, 0, 0, 0.00) 40.45%), url("images/ustp.png")' }}>
        <div className="mx-auto p-10 md:p-20 m-5 md:m-10 bg-black bg-opacity-90 shadow-md rounded-md h-auto md:h-auto lg:h-auto max-h-screen">
          <div className="flex justify-center">
            <img src="images/logo.PNG" alt="CampusHub Logo" className="mb-5 w-50 h-50 rounded-full relative" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Register</h1>
            {errorMessage && <p className="relative text-red-500 text-center text-[14px]">{errorMessage}</p>}
            {successMessage && <p className="relative text-green-500 text-center text-[14px]">{successMessage}</p>}
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full h-10 mb-5 border-b-2 border-white bg-transparent text-white placeholder-gray-200 placeholder-opacity-10 focus:outline-none focus:border-blue-500 pl-10"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faUser} className="absolute top-3 left-3 text-white" />
              </div>
              <div className="flex flex-col w-1/2 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full h-10 mb-5 border-b-2 border-white bg-transparent text-white placeholder-gray-200 placeholder-opacity-10 focus:outline-none focus:border-blue-500 pl-10"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faEnvelope} className="absolute top-3 left-3 text-white" />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full h-10 mb-5 border-b-2 border-white bg-transparent text-white placeholder-gray-300 placeholder-opacity-10 focus:outline-none focus:border-blue-500 pl-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faLock} className="absolute top-3 left-3 text-white" />
              </div>
              <div className="flex flex-col w-1/2 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full h-10 mb-5 border-b-2 border-white bg-transparent text-white placeholder-gray-300 placeholder-opacity-10 bg-opacity-10 focus:outline-none focus:border-blue-500 pl-10"
                  placeholder="Confirm Password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faLock} className="absolute top-3 left-3 text-white" />
              </div>
              <div className="relative activeflex items-center mb-4 mt-[20px]">
                  <input type="radio" value="student" checked={role === 'student'} onChange={() => setRole('student')} className="mr-2" text-white />
                  <label className="text-white">Student</label>
                  <input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} className="ml-4 mr-2 text-white" />
                  <label className="text-white">Admin</label>
                  <input type="radio" value="instructor" checked={role === 'instructor'} onChange={() => setRole('instructor')} className="ml-4 mr-2 text-white" />
                  <label className="text-white">Instructor</label> 
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-10 mb-5 border-b-2  bg-slate-500 text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none">
              Register
            </button>
            <div className="mt-3 text-center">
              Already have an account?<a href="/login" className="block text-white text-sm">Login here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;