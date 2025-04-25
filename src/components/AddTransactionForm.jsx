import React, { useState } from 'react';
import { DollarSign, Calendar, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AddTransactionForm() {
  const { categories, addTransaction } = useAppContext();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: categories[0] || '',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? (value === '' ? '' : parseFloat(value)) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please enter a description');
      return;
    }

    if (!formData.category) {
      setError('Please select a category');
      return;
    }

    if (!formData.date) {
      setError('Please select a date');
      return;
    }

    // Add transaction
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    // Reset form
    setFormData({
      amount: '',
      description: '',
      category: categories[0] || '',
      date: new Date().toISOString().split('T')[0]
    });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              id="date"
              name="date"
              type="date"
              className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}