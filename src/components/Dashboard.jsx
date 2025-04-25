import React, { useState } from 'react';
import { LogOut, User, BarChart2, DollarSign, PlusCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardTab from './DashboardTab';
import TransactionsTab from './TransactionsTab';
import CategoriesTab from './CategoriesTab';

export default function Dashboard() {
  const { user, logout } = useAppContext();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Budget Tracker</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.username}</span>
            <button
              onClick={logout}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <LogOut size={18} className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-full md:w-64 flex-shrink-0">
          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <button
                  className={`w-full text-left p-3 rounded flex items-center ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <BarChart2 size={18} className="mr-2" /> Dashboard
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`w-full text-left p-3 rounded flex items-center ${activeTab === 'transactions' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  <DollarSign size={18} className="mr-2" /> Transactions
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left p-3 rounded flex items-center ${activeTab === 'categories' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveTab('categories')}
                >
                  <PlusCircle size={18} className="mr-2" /> Categories
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-6">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'transactions' && <TransactionsTab />}
          {activeTab === 'categories' && <CategoriesTab />}
        </main>
      </div>
    </div>
  );
}