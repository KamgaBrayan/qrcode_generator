'use client';

import React, { useState } from 'react';
import { FileData } from '../../types';

interface FileFormProps {
  data: FileData;
  onChange: (data: FileData) => void;
}

const FileForm: React.FC<FileFormProps> = ({ data, onChange }) => {
  const [formData, setFormData] = useState<FileData>(data);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    
    // Validate URL if fileUrl field is changed
    if (name === 'fileUrl' && value) {
      validateUrl(value);
    }
    
    // Only update parent if there's no error
    if (!(name === 'fileUrl' && error)) {
      onChange(updatedData);
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
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com/file.pdf)');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">File QR Code</h4>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Create a QR code that links to a file hosted online. When scanned, users will be directed to download or view the file.
        </p>
      </div>

      <div>
        <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          File Name
        </label>
        <input
          id="fileName"
          name="fileName"
          type="text"
          value={formData.fileName}
          onChange={handleInputChange}
          placeholder="e.g., Company Brochure"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          A descriptive name for your file (for your reference only, not included in the QR code).
        </p>
      </div>

      <div>
        <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          File URL *
        </label>
        <input
          id="fileUrl"
          name="fileUrl"
          type="text"
          value={formData.fileUrl}
          onChange={handleInputChange}
          placeholder="https://example.com/file.pdf"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          The direct URL to your file. This should be a publicly accessible link where your file is hosted.
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Tips for File QR Codes</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>Make sure your file is hosted on a reliable service that won&apos;t remove it.</li>
          <li>Consider using cloud storage services like Google Drive, Dropbox, or OneDrive.</li>
          <li>For documents, consider using PDF format as it's widely supported across devices.</li>
          <li>Be aware of file size - large files may take time to download, especially on mobile data.</li>
          <li>If your file requires authentication, users will need to log in before accessing it.</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        * Required fields
      </p>
    </div>
  );
};

export default FileForm;
