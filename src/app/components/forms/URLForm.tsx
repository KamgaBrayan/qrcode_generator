'use client';

import React, { useState, useEffect } from 'react';
import { URLData } from '../../types';

interface URLFormProps {
  data: URLData;
  onChange: (data: URLData) => void;
}

const URLForm: React.FC<URLFormProps> = ({ data, onChange }) => {
  const [url, setUrl] = useState<string>(data.url || '');
  const [error, setError] = useState<string>('');

  // Only update parent when URL changes by user input, not on initial render
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Basic URL validation
    if (newUrl && !isValidUrl(newUrl)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
    } else {
      setError('');
    }
    
    // Update parent component with new URL
    onChange({ url: newUrl });
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      // If URL doesn't start with http:// or https://, add https://
      let urlToCheck = urlString;
      if (urlString && !urlString.match(/^https?:\/\//i)) {
        urlToCheck = `https://${urlString}`;
      }
      
      // Check if URL is valid
      new URL(urlToCheck);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Enter URL
        </label>
        <input
          id="url-input"
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Enter the URL you want to encode in the QR code. This can be a website, social media profile, or video link.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">URL QR Code Tips</h4>
        <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 list-disc pl-4">
          <li>Keep URLs as short as possible for better scanning.</li>
          <li>Consider using a URL shortener for long addresses.</li>
          <li>Make sure your website is mobile-friendly for users scanning with phones.</li>
          <li>Test your QR code on different devices before distributing.</li>
        </ul>
      </div>
    </div>
  );
};

export default URLForm;
