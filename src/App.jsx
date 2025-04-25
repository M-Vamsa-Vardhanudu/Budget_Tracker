import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

// Main App Component
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <AppProvider setIsAuthenticated={setIsAuthenticated}>
      <div className="min-h-screen bg-gray-100">
        {!isAuthenticated ? (
          <LoginPage />
        ) : (
          <Dashboard />
        )}
      </div>
    </AppProvider>
  );
}