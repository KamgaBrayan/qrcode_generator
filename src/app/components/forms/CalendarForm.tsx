'use client';

import React, { useState } from 'react';
import { CalendarData } from '../../types';

interface CalendarFormProps {
  data: CalendarData;
  onChange: (data: CalendarData) => void;
}

const CalendarForm: React.FC<CalendarFormProps> = ({ data, onChange }) => {
  const [formData, setFormData] = useState<CalendarData>(data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: new Date(value),
    };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: checked,
    };
    setFormData(updatedData);
    onChange(updatedData);
  };

  // Format date for input field
  const formatDateForInput = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Calendar Event QR Code</h4>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Create a QR code that allows people to add an event to their calendar.
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Event Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <input
          id="allDay"
          name="allDay"
          type="checkbox"
          checked={formData.allDay || false}
          onChange={handleCheckboxChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="allDay" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          All-day event
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date & Time *
          </label>
          <input
            id="startDate"
            name="startDate"
            type={formData.allDay ? "date" : "datetime-local"}
            value={formatDateForInput(formData.startDate)}
            onChange={handleDateChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date & Time *
          </label>
          <input
            id="endDate"
            name="endDate"
            type={formData.allDay ? "date" : "datetime-local"}
            value={formatDateForInput(formData.endDate)}
            onChange={handleDateChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        * Required fields
      </p>
    </div>
  );
};

export default CalendarForm;
