import axiosInstance from './axios';

export const getCsrfToken = async () => {
  const { data } = await axiosInstance.get('/csrf-token');
  return data.csrf_token;
};

export const login = async (email, password) => {
  try {
    await getCsrfToken();
    const response = await axiosInstance.post('/login', { email, password });
    return response.data;

  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/api/user');
    return response.data;

  } catch (error) {
    throw error;
  }
};

export const register = async (name, email, password, password_confirmation, role) => {
  try {
    await getCsrfToken();
    const response = await axiosInstance.post('/register', {
      name,
      email,
      password,
      password_confirmation,
      role,
    });

    return response.data;

  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await getCsrfToken();
    await axiosInstance.post('/logout');
    localStorage.removeItem('authToken');
  } catch (error) {
    throw error;
  }
};
