import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { setAuth } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Trim and normalize email
      const normalizedData = {
        ...formData,
        email: formData.email.trim().toLowerCase(),
      };

      const response = await api.post('/auth/login', normalizedData);
      const { token, user } = response.data.data;

      setAuth(token, user);
      navigate('/dashboard');
    } catch (err) {
      // Handle different error types
      if (err.response) {
        // Server responded with error
        setError(err.response.data?.message || 'Login failed. Please check your credentials.');
      } else if (err.request) {
        // Request made but no response
        setError('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full max-w-md animate-slide-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-lg">Manage your expenses with ease</p>
        </div>

        <div className="card">
          {error && (
            <div role="alert" className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-200 rounded-xl text-sm font-medium animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                disabled={loading}
                placeholder="your@email.com"
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                disabled={loading}
                placeholder="••••••••"
                className="input-field"
              />
            </div>
            
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m14-4V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
                  </svg>
                  Login to Account
                </>
              )}
            </button>
          </form>
          
          <p className="mt-6 text-center text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
