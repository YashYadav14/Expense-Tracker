/**
 * Authentication helper functions
 */

// Save token and user data to localStorage
export const setAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get user data from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Clear authentication data
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
