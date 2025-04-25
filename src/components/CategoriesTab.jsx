import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Trash2 } from 'lucide-react';

// Categories Tab Component
export default function CategoriesTab() {
  const { categories, addCategory, removeCategory } = useAppContext();
  const [newCategory, setNewCategory] = useState('');
  
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
      
      {/* Add Category Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-medium text-gray-600 mb-4">Add Category</h3>
        <form onSubmit={handleAddCategory} className="flex">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New category name"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </div>
      
      {/* Categories List */}
      <div className="bg-white rounded shadow">
        <h3 className="text-lg font-medium text-gray-600 p-4 border-b">Current Categories</h3>
        
        {categories.length > 0 ? (
          <ul>
            {categories.map(category => (
              <li key={category} className="border-b last:border-b-0 p-4 flex justify-between items-center">
                <span>{category}</span>
                <button
                  onClick={() => removeCategory(category)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No categories yet. Add some to get started.
          </div>
        )}
      </div>
    </div>
  );
}