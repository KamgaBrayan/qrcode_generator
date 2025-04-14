'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface LogoUploaderProps {
  logo: string | undefined;
  onChange: (logo: string) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ logo, onChange }) => {
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('File size exceeds 2MB limit');
      return;
    }
    
    // Check file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|svg\+xml)/)) {
      setError('Only JPEG, PNG, GIF, and SVG files are supported');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/svg+xml': [],
    },
    maxFiles: 1,
  });

  const removeLogo = () => {
    onChange('');
    setError('');
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Logo</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Add a logo to the center of your QR code.
      </p>
      
      {logo ? (
        <div className="mb-4">
          <div className="flex items-center justify-center mb-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <img 
              src={logo} 
              alt="Uploaded logo" 
              className="max-w-full max-h-32 object-contain"
            />
          </div>
          <button
            type="button"
            onClick={removeLogo}
            className="w-full py-2 px-4 border border-red-300 rounded-md text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Remove Logo
          </button>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-blue-900/10'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-gray-400 mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isDragActive ? 'Drop the logo here' : 'Drag & drop a logo, or click to select'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              PNG, JPG, GIF, or SVG (max 2MB)
            </p>
          </div>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Logo Tips</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>Use a simple, high-contrast logo for best results.</li>
          <li>Transparent backgrounds work best.</li>
          <li>Square logos typically work better than rectangular ones.</li>
          <li>The logo will reduce the error correction capability, so test your QR code thoroughly.</li>
        </ul>
      </div>
    </div>
  );
};

export default LogoUploader;
