import { useState } from 'react';
import api from '../services/api';

const ExpenseItem = ({ expense, onExpenseUpdated, onExpenseDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    amount: expense.amount,
    category: expense.category,
    date: new Date(expense.date).toISOString().split('T')[0],
    note: expense.note || '',
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

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      amount: expense.amount,
      category: expense.category,
      date: new Date(expense.date).toISOString().split('T')[0],
      note: expense.note || '',
    });
    setError('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      await api.put(`/expenses/${expense._id}`, {
        amount,
        category: formData.category.trim(),
        date: formData.date,
        note: formData.note.trim(),
      });
      setIsEditing(false);
      onExpenseUpdated();
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to update expense');
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this expense: ${expense.category} - $${expense.amount.toFixed(2)}?`)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.delete(`/expenses/${expense._id}`);
      onExpenseDeleted();
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to delete expense');
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="card border-2 border-blue-500 border-opacity-50">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Expense
        </h3>
        {error && (
          <div role="alert" className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-200 rounded-xl text-sm font-medium flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor={`amount-${expense._id}`} className="block text-sm font-semibold text-slate-300 mb-2">
                Amount ($)
              </label>
              <input
                id={`amount-${expense._id}`}
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0.01"
                required
                disabled={loading}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor={`category-${expense._id}`} className="block text-sm font-semibold text-slate-300 mb-2">
                Category
              </label>
              <input
                id={`category-${expense._id}`}
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={loading}
                className="input-field"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor={`date-${expense._id}`} className="block text-sm font-semibold text-slate-300 mb-2">
                Date
              </label>
              <input
                id={`date-${expense._id}`}
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
              <label htmlFor={`note-${expense._id}`} className="block text-sm font-semibold text-slate-300 mb-2">
                Note
              </label>
              <input
                id={`note-${expense._id}`}
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                disabled={loading}
                className="input-field"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
            <button type="button" onClick={handleCancel} disabled={loading} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="card group hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity pointer-events-none"></div>
      <div className="relative z-10">
        {error && (
          <div role="alert" className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 text-red-200 rounded-lg text-sm font-medium flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="inline-block px-4 py-1.5 bg-blue-500 bg-opacity-20 text-blue-300 font-semibold rounded-lg text-sm">
                {expense.category}
              </span>
              <span className="text-3xl font-bold text-white">
                ${expense.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(expense.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            {expense.note && (
              <p className="mt-3 text-sm text-slate-400 italic border-l-2 border-slate-600 pl-3">"{expense.note}"</p>
            )}
          </div>
          <div className="flex gap-2 sm:flex-col">
            <button 
              onClick={() => setIsEditing(true)} 
              disabled={loading} 
              className="btn-secondary flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button 
              onClick={handleDelete} 
              disabled={loading} 
              className="btn-danger flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
