'use client';

import React, { useState } from 'react';
import { MenuData, MenuItem } from '../../types';

interface MenuFormProps {
  data: MenuData;
  onChange: (data: MenuData) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({ data, onChange }) => {
  const [restaurantName, setRestaurantName] = useState<string>(data.restaurantName || '');
  const [items, setItems] = useState<MenuItem[]>(data.items || []);
  const [newItem, setNewItem] = useState<MenuItem>({ name: '', description: '', price: '', category: '' });

  const handleRestaurantNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setRestaurantName(newName);
    onChange({ restaurantName: newName, items });
  };

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const addItem = () => {
    if (newItem.name.trim() === '') return;
    
    const updatedItems = [...items, { ...newItem }];
    setItems(updatedItems);
    setNewItem({ name: '', description: '', price: '', category: '' });
    onChange({ restaurantName, items: updatedItems });
  };

  const removeItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    onChange({ restaurantName, items: updatedItems });
  };

  const editItem = (index: number, field: keyof MenuItem, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems(updatedItems);
    onChange({ restaurantName, items: updatedItems });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Menu QR Code</h4>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Create a QR code for your restaurant menu. When scanned, customers can view your menu items directly on their devices.
        </p>
      </div>

      <div>
        <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Restaurant Name *
        </label>
        <input
          id="restaurantName"
          type="text"
          value={restaurantName}
          onChange={handleRestaurantNameChange}
          placeholder="e.g., Delicious Bistro"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Menu Items</h3>
        
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">No items added yet. Add your first menu item below.</p>
        ) : (
          <div className="space-y-4 mb-6">
            {items.map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => editItem(index, 'name', e.target.value)}
                      placeholder="Item name"
                      className="w-full font-medium text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => editItem(index, 'price', e.target.value)}
                      placeholder="Price"
                      className="w-full text-right text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0"
                    />
                  </div>
                </div>
                
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) => editItem(index, 'category', e.target.value)}
                  placeholder="Category (e.g., Appetizers, Main Course)"
                  className="w-full text-sm text-gray-600 dark:text-gray-400 bg-transparent border-none p-0 mb-2 focus:ring-0"
                />
                
                <textarea
                  value={item.description}
                  onChange={(e) => editItem(index, 'description', e.target.value)}
                  placeholder="Item description"
                  rows={2}
                  className="w-full text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none p-0 focus:ring-0"
                />
                
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="mt-2 text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-md p-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add New Item</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleNewItemChange}
                placeholder="Item name *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <input
                type="text"
                name="price"
                value={newItem.price}
                onChange={handleNewItemChange}
                placeholder="Price (e.g., $12.99)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="mb-3">
            <input
              type="text"
              name="category"
              value={newItem.category}
              onChange={handleNewItemChange}
              placeholder="Category (e.g., Appetizers, Main Course)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <div className="mb-3">
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleNewItemChange}
              placeholder="Item description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <button
            type="button"
            onClick={addItem}
            disabled={!newItem.name.trim()}
            className={`w-full py-2 px-4 rounded-md ${
              !newItem.name.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Add Item
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Tips for Menu QR Codes</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>Organize items by categories to make your menu easier to navigate.</li>
          <li>Include clear descriptions for each item, especially for dishes that might be unfamiliar.</li>
          <li>Consider adding dietary information (vegetarian, gluten-free, etc.) in the descriptions.</li>
          <li>For large menus, consider creating separate QR codes for different sections.</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        * Required fields
      </p>
    </div>
  );
};

export default MenuForm;
