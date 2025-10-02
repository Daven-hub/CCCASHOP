import axios from './api';

const register = async userData => {
  const response = await axios.post ('/auth?action=register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post ('/auth?action=login', userData);
  // console.log(response.data)
  return response.data;
};

const logout = () => {
  localStorage.removeItem ('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
