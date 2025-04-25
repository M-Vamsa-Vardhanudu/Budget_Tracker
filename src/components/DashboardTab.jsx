import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext';
import AddTransactionForm from './AddTransactionForm';
import { Trash2 } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

export default function DashboardTab() {
  const { transactions, fetchRandomData, deleteTransaction } = useAppContext();

  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const chartData = useMemo(() => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});

    return Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));
  }, [transactions]);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={fetchRandomData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Random Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Expenses</h3>
          <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium text-gray-600">Transactions</h3>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium text-gray-600 mb-4">Expenses by Category</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No data to display. Add transactions or fetch random data.
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium text-gray-600 mb-4">Recent Transactions</h3>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="border-b pb-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.category} • {transaction.date}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold mr-3">${transaction.amount.toFixed(2)}</p>
                      <button 
                        onClick={() => deleteTransaction(transaction.id)} 
                        className="text-red-600 hover:text-red-800"
                        title="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No transactions yet. Add some or fetch random data.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium text-gray-600 mb-4">Add Transaction</h3>
          <AddTransactionForm />
        </div>
      </div>
    </div>
  );
}