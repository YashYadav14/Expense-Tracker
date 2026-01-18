const SummaryCards = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalCount = expenses.length;

  // Calculate expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  // Sort categories by total amount (descending)
  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([category, total]) => ({ category, total }));

  const topCategory = sortedCategories[0];

  if (expenses.length === 0) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
        <div className="py-12 text-center">
          <svg className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-400 text-lg font-medium">No expenses yet</p>
          <p className="text-slate-500 mt-2">Add your first expense to see statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Expenses Card */}
        <div className="card group hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-500 bg-opacity-20 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-400">Total Expenses</h3>
            </div>
            <p className="text-4xl font-bold text-white">
              ${totalExpenses.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-2">Across all categories</p>
          </div>
        </div>
        
        {/* Total Count Card */}
        <div className="card group hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-400">Total Count</h3>
            </div>
            <p className="text-4xl font-bold text-white">
              {totalCount}
            </p>
            <p className="text-xs text-slate-500 mt-2">Transactions recorded</p>
          </div>
        </div>
        
        {/* Top Category Card */}
        {topCategory && (
          <div className="card group hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500 opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-green-500 bg-opacity-20 rounded-lg">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-400">Top Category</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">
                {topCategory.category}
              </p>
              <p className="text-xl text-green-400 font-bold">
                ${topCategory.total.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Category Breakdown */}
      {sortedCategories.length > 0 && (
        <div className="card">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Breakdown by Category
          </h3>
          <div className="space-y-3">
            {sortedCategories.map(({ category, total }, index) => {
              const percentage = (total / totalExpenses) * 100;
              return (
                <div key={category} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></span>
                      {category}
                    </span>
                    <div className="text-right">
                      <p className="font-bold text-white">${total.toFixed(2)}</p>
                      <p className="text-xs text-slate-500">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/50"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryCards;
