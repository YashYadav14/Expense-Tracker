import { useState } from 'react';
import api from '../services/api';

const ExpenseForm = ({ onExpenseCreated }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Client-side validation
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be a valid number greater than 0');
      setLoading(false);
      return;
    }

    if (!formData.category.trim()) {
      setError('Category cannot be empty');
      setLoading(false);
      return;
    }

    try {
      await api.post('/expenses', {
        amount,
        category: formData.category.trim(),
        date: formData.date,
        note: formData.note.trim(),
      });
      
      // Reset form
      setFormData({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        note: '',
      });

      setSuccess('Expense added successfully!');
      onExpenseCreated();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to create expense');
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Add New Expense</h2>
      </div>
      
      {error && (
        <div role="alert" className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-200 rounded-xl text-sm font-medium animate-fade-in flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      {success && (
        <div role="alert" className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-50 text-green-200 rounded-xl text-sm font-medium animate-fade-in flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-semibold">Success!</p>
            <p className="text-sm mt-0.5">{success}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-slate-300 mb-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Amount ($)
              </div>
            </label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
              disabled={loading}
              placeholder="0.00"
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-slate-300 mb-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Category
              </div>
            </label>
            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="e.g., Food, Transport, Shopping"
              className="input-field"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-slate-300 mb-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Date
              </div>
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={loading}
              max={new Date().toISOString().split('T')[0]}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="note" className="block text-sm font-semibold text-slate-300 mb-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Note <span className="text-slate-500">(optional)</span>
              </div>
            </label>
            <input
              id="note"
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              disabled={loading}
              placeholder="Additional details..."
              className="input-field"
            />
          </div>
        </div>
        
        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-8">
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding expense...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Expense
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
