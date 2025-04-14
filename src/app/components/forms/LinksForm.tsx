'use client';

import React, { useState } from 'react';
import { LinksData, LinkItem } from '../../types';

interface LinksFormProps {
  data: LinksData;
  onChange: (data: LinksData) => void;
}

const LinksForm: React.FC<LinksFormProps> = ({ data, onChange }) => {
  const [title, setTitle] = useState<string>(data.title || '');
  const [links, setLinks] = useState<LinkItem[]>(data.links || []);
  const [newLink, setNewLink] = useState<LinkItem>({ title: '', url: '' });
  const [error, setError] = useState<string>('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onChange({ title: newTitle, links });
  };

  const handleNewLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink({
      ...newLink,
      [name]: value,
    });
    
    // Validate URL if url field is changed
    if (name === 'url' && value) {
      validateUrl(value);
    }
  };

  const validateUrl = (url: string) => {
    try {
      // If URL doesn't start with http:// or https://, add https://
      let urlToCheck = url;
      if (url && !url.match(/^https?:\/\//i)) {
        urlToCheck = `https://${url}`;
      }
      
      // Check if URL is valid
      new URL(urlToCheck);
      setError('');
      return true;
    } catch (e) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return false;
    }
  };

  const addLink = () => {
    if (newLink.title.trim() === '' || newLink.url.trim() === '') return;
    if (!validateUrl(newLink.url)) return;
    
    // If URL doesn't start with http:// or https://, add https://
    let url = newLink.url;
    if (!url.match(/^https?:\/\//i)) {
      url = `https://${url}`;
    }
    
    const updatedLinks = [...links, { title: newLink.title, url }];
    setLinks(updatedLinks);
    setNewLink({ title: '', url: '' });
    onChange({ title, links: updatedLinks });
  };

  const removeLink = (index: number) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
    onChange({ title, links: updatedLinks });
  };

  const editLink = (index: number, field: keyof LinkItem, value: string) => {
    // For URL field, validate before updating
    if (field === 'url' && !validateUrl(value)) {
      return;
    }
    
    const updatedLinks = [...links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    
    setLinks(updatedLinks);
    onChange({ title, links: updatedLinks });
  };

  const moveLink = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === links.length - 1)
    ) {
      return;
    }
    
    const updatedLinks = [...links];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [updatedLinks[index], updatedLinks[newIndex]] = [updatedLinks[newIndex], updatedLinks[index]];
    
    setLinks(updatedLinks);
    onChange({ title, links: updatedLinks });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Multiple Links QR Code</h4>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Create a QR code that contains multiple links. When scanned, users will see a list of links they can choose from.
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Page Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="e.g., My Social Media Links"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          A title for your links page (optional).
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Links</h3>
        
        {links.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">No links added yet. Add your first link below.</p>
        ) : (
          <div className="space-y-4 mb-6">
            {links.map((link, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => editLink(index, 'title', e.target.value)}
                    placeholder="Link title"
                    className="flex-1 font-medium text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => moveLink(index, 'up')}
                      disabled={index === 0}
                      className={`text-gray-500 ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveLink(index, 'down')}
                      disabled={index === links.length - 1}
                      className={`text-gray-500 ${index === links.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      ↓
                    </button>
                  </div>
                </div>
                
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => editLink(index, 'url', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full text-sm text-blue-600 dark:text-blue-400 bg-transparent border-none p-0 focus:ring-0"
                />
                
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="mt-2 text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove Link
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-md p-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Add New Link</h4>
          
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={newLink.title}
              onChange={handleNewLinkChange}
              placeholder="Link title *"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <div className="mb-3">
            <input
              type="text"
              name="url"
              value={newLink.url}
              onChange={handleNewLinkChange}
              placeholder="URL * (e.g., https://example.com)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
          
          <button
            type="button"
            onClick={addLink}
            disabled={!newLink.title.trim() || !newLink.url.trim() || !!error}
            className={`w-full py-2 px-4 rounded-md ${
              !newLink.title.trim() || !newLink.url.trim() || !!error
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Add Link
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Tips for Multiple Links QR Codes</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>Use clear, descriptive titles for each link so users know what to expect.</li>
          <li>Arrange links in order of importance, with the most important links at the top.</li>
          <li>Consider grouping similar links together (e.g., all social media links).</li>
          <li>Keep the total number of links reasonable (5-10 is usually ideal).</li>
          <li>Test your QR code on different devices to ensure all links work correctly.</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        * Required fields
      </p>
    </div>
  );
};

export default LinksForm;
