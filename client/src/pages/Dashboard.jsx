import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuth, getUser } from '../utils/auth';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import SummaryCards from '../components/SummaryCards';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = getUser();
    if (!userData) {
      // If no user data, redirect to login
      clearAuth();
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchExpenses();
  }, [navigate]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/expenses');
      setExpenses(response.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        // Unauthorized - token expired or invalid
        clearAuth();
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch expenses. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleExpenseCreated = () => {
    fetchExpenses();
  };

  const handleExpenseUpdated = () => {
    fetchExpenses();
  };

  const handleExpenseDeleted = () => {
    fetchExpenses();
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-10 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Expense Tracker</h1>
                  <p className="text-slate-400 mt-1">
                    Welcome back, <span className="font-semibold text-blue-400">{user.name}</span>
                  </p>
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 self-start sm:self-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Error Alert */}
        {error && (
          <div role="alert" className="mb-8 p-5 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-200 rounded-2xl backdrop-blur-sm animate-fade-in flex items-start gap-4">
            <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Error loading expenses</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-spin opacity-75"></div>
              <div className="absolute inset-1 bg-slate-800 rounded-full"></div>
            </div>
            <p className="text-slate-400 font-medium">Loading your expenses...</p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="animate-slide-in">
              <SummaryCards expenses={expenses} />
            </div>
            
            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <ExpenseForm onExpenseCreated={handleExpenseCreated} />
            </div>
            
            <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <ExpenseList
                expenses={expenses}
                onExpenseUpdated={handleExpenseUpdated}
                onExpenseDeleted={handleExpenseDeleted}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
