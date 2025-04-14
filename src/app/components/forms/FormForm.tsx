'use client';

import React, { useState } from 'react';
import { FormData } from '../../types';

interface FormFormProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

const FormForm: React.FC<FormFormProps> = ({ data, onChange }) => {
  const [formData, setFormData] = useState<FormData>(data);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    
    // Validate URL if formUrl field is changed
    if (name === 'formUrl' && value) {
      validateUrl(value);
    }
    
    // Only update parent if there's no error
    if (!(name === 'formUrl' && error)) {
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
    } catch (e) {
      setError('Please enter a valid URL (e.g., https://forms.google.com/...)');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Form QR Code</h4>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Create a QR code that links to an online form or survey. When scanned, users will be directed to complete your form.
        </p>
      </div>

      <div>
        <label htmlFor="formTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Form Title
        </label>
        <input
          id="formTitle"
          name="formTitle"
          type="text"
          value={formData.formTitle || ''}
          onChange={handleInputChange}
          placeholder="e.g., Customer Feedback Survey"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          A descriptive title for your form (for your reference only, not included in the QR code).
        </p>
      </div>

      <div>
        <label htmlFor="formUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Form URL *
        </label>
        <input
          id="formUrl"
          name="formUrl"
          type="text"
          value={formData.formUrl}
          onChange={handleInputChange}
          placeholder="https://forms.google.com/..."
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          The direct URL to your form. This should be the public link that respondents can access.
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Popular Form Services</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li><strong>Google Forms</strong>: Create a form at <span className="text-blue-600 dark:text-blue-400">forms.google.com</span> and use the "Send" button to get the public link.</li>
          <li><strong>Microsoft Forms</strong>: Create a form at <span className="text-blue-600 dark:text-blue-400">forms.office.com</span> and use the "Share" button to get the link.</li>
          <li><strong>SurveyMonkey</strong>: Create a survey and use the "Collect Responses" option to get the web link.</li>
          <li><strong>Typeform</strong>: Create a form and use the "Share" button to get the public link.</li>
          <li><strong>JotForm</strong>: Create a form and use the "Publish" tab to get the form URL.</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Tips for Form QR Codes</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>Keep your form short and focused to increase completion rates.</li>
          <li>Test your form on mobile devices to ensure it's easy to complete on smaller screens.</li>
          <li>Consider adding a brief introduction explaining the purpose of the form.</li>
          <li>If possible, show a progress indicator so users know how much of the form is left.</li>
          <li>Make sure your form is accessible to all users, including those with disabilities.</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        * Required fields
      </p>
    </div>
  );
};

export default FormForm;
