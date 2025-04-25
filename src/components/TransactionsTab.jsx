import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { DollarSign, Calendar, Trash2 } from 'lucide-react';
import AddTransactionForm from './AddTransactionForm';

// Transactions Tab Component
function TransactionsTab() {
  const { transactions, deleteTransaction } = useAppContext();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  // Sort transactions
  const sortedTransactions = useMemo(() => {
    let sortableTransactions = [...transactions];
    if (sortConfig.key) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig]);
  
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h2>
      
      {/* Add Transaction Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-medium text-gray-600 mb-4">Add Transaction</h3>
        <AddTransactionForm />
      </div>
      
      {/* Transactions Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {transactions.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">
                  <button 
                    className="flex items-center" 
                    onClick={() => requestSort('date')}
                  >
                    Date
                    {sortConfig.key === 'date' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">
                  <button 
                    className="flex items-center" 
                    onClick={() => requestSort('description')}
                  >
                    Description
                    {sortConfig.key === 'description' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">
                  <button 
                    className="flex items-center" 
                    onClick={() => requestSort('category')}
                  >
                    Category
                    {sortConfig.key === 'category' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-right text-gray-600 font-medium">
                  <button 
                    className="flex items-center justify-end" 
                    onClick={() => requestSort('amount')}
                  >
                    Amount
                    {sortConfig.key === 'amount' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-center text-gray-600 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map(transaction => (
                <tr key={transaction.id} className="border-t">
                  <td className="px-4 py-3">{transaction.date}</td>
                  <td className="px-4 py-3">{transaction.description}</td>
                  <td className="px-4 py-3">{transaction.category}</td>
                  <td className="px-4 py-3 text-right font-medium">${transaction.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => deleteTransaction(transaction.id)} 
                      className="text-red-600 hover:text-red-800"
                      title="Delete transaction"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No transactions yet. Add some or fetch random data.
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionsTab;