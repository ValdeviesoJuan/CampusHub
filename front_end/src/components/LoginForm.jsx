import React, { useState, useContext, useEffect } from 'react';
import axiosInstance from '../axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { login, getUser, getCsrfToken} from '../auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const location = useLocation();

    useEffect(() => {
        async function fetchCsrfToken() {
            try {
                const { data } = await axiosInstance.get('/csrf-token');
                localStorage.removeItem('authToken');
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

        try {
          const token = getToken();
          console.log(token);
          await login(email, password);

          localStorage.setItem('authToken', token);

          const userData = await getUser(); 
          console.log(userData);

          handleLogin();
          navigate('/dashboard');

        } catch (error) {
          console.error('Error logging in:', error);
          if (error.response && error.response.status === 422) {
            setError('Invalid email or password. Please try again.');
          } else {
            setError('An error occurred during login. Please try again.');
          }
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
        <div>
            <div className="relative flex justify-center items-center h-screen  w-screen bg-cover bg-no-repeat" style={{ backgroundImage: 'linear-gradient(90deg, rgba(0, 0, 0, 0.65) 1.14%, rgba(0, 0, 0, 0.00) 40.45%), url("images/ustp.png")' }}>
                <div className="absolute top-10 left-10 flex items-center" style={{ width: '50%' }}>
                    <div className="w-24 h-7 bg-white mr-5">
                        <div className="w-72 h-4 bg-slate-300"></div>
                    </div>
                </div>
                <div className="max-w-md w-full bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center ml-auto mr-10 ">
                    <div className="text-white ">
                        <img src="images/logo.PNG" alt="CampusHub Logo" className="mb-5 w-25 h-25 rounded-full bg-transparent relative mx-auto" />
                        <h1 className="text-3xl mt-1 font-bold text-white">Login</h1>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <form onSubmit={handleSubmit} className="mt-8 relative">
                        <div className="relative">
                            <FontAwesomeIcon icon={faUser} className={`absolute top-2 left-3 text-white ${isEmailFocused ? 'text-blue-500' : 'text-white'}`} />
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={handleEmailFocus} onBlur={handleEmailBlur} name="email" required autoComplete="email" placeholder='Email' className="w-full h-10 pl-10 pr-4 mb-5 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="relative">
                            <FontAwesomeIcon icon={faLock} className={`absolute top-2 left-3 text-white ${isPasswordFocused ? 'text-blue-500' : 'text-white'}`} />
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} name="password" required autoComplete="current-password" placeholder='Password' className="w-full h-10 pl-10 pr-4 mb-5 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className='p-5'></div>
                        <button type="submit" className="w-full mt-1 py-3 bg-slate-500 text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none">Login</button>
                    </form>
                    
                    <div className="mt-4">
                        <a href="#" className="block text-blue-100 text-sm">Forgot password?</a>
                    </div>

                    <div className="mt-3 text-white text-sm">
                        Don't have an account?<a href="/register" className="block text-blue-400">Register here</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
