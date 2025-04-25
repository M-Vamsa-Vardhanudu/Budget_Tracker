import React, { useState, createContext, useContext } from 'react';

// Create context for global state management
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// App Provider for context
export function AppProvider({ children, setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([
    'Food', 'Transportation', 'Entertainment', 'Bills', 'Shopping'
  ]);
  const [transactions, setTransactions] = useState([]);
  
  const login = (username, password) => {
    // Simulate authentication
    if (username && password) {
      setUser({ username });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  
  const addCategory = (category) => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };
  
  const removeCategory = (category) => {
    setCategories(categories.filter(c => c !== category));
  };
  
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };
  
  const fetchRandomData = () => {
    const descriptions = [
      'Grocery shopping', 'Coffee', 'Movie tickets', 'Electric bill', 
      'Gas for car', 'Restaurant dinner', 'Online purchase', 'Phone bill',
      'Bus ticket', 'New shoes', 'Gym membership', 'Haircut'
    ];
    
    const randomTransactions = Array(10).fill().map(() => {
      const randCategory = categories[Math.floor(Math.random() * categories.length)];
      const randAmount = Math.floor(Math.random() * 200) + 10;
      const randDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
      const randDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
      
      return {
        id: Date.now() + Math.random(),
        amount: randAmount,
        category: randCategory,
        description: randDesc,
        date: randDate.toISOString().split('T')[0]
      };
    });
    
    setTransactions([...transactions, ...randomTransactions]);
  };
  
  const contextValue = {
    user,
    categories,
    transactions,
    login,
    logout,
    addCategory,
    removeCategory,
    addTransaction,
    deleteTransaction,
    fetchRandomData
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}