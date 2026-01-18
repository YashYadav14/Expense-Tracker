import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onExpenseUpdated, onExpenseDeleted }) => {
  if (expenses.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Your Expenses
        </h2>
        <div className="py-16 text-center">
          <svg className="w-20 h-20 text-slate-600 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-slate-400 text-lg font-medium">No expenses yet</p>
          <p className="text-slate-500 mt-2">Add your first expense to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Your Expenses
        </div>
        <span className="text-lg font-normal text-slate-400 bg-slate-700 px-4 py-1.5 rounded-lg">
          {expenses.length}
        </span>
      </h2>
      <div className="space-y-4">
        {expenses.map((expense, index) => (
          <div 
            key={expense._id}
            style={{ 
              animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
            }}
            className="animate-slide-in"
          >
            <ExpenseItem
              expense={expense}
              onExpenseUpdated={onExpenseUpdated}
              onExpenseDeleted={onExpenseDeleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
