'use client';

import React from 'react';
import { QRCodeType } from '../types';

interface TypeSelectorProps {
  selected: QRCodeType;
  onSelect: (type: QRCodeType) => void;
}

interface QRTypeOption {
  type: QRCodeType;
  label: string;
  icon: string;
  description: string;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ selected, onSelect }) => {
  const qrTypes: QRTypeOption[] = [
    {
      type: 'url',
      label: 'URL',
      icon: '/icons/url.svg',
      description: 'Create a QR code for a website, profile, or video',
    },
    {
      type: 'vcard',
      label: 'vCard',
      icon: '/icons/vcard.svg',
      description: 'Create a QR code for a digital business card',
    },
    {
      type: 'calendar',
      label: 'Calendar',
      icon: '/icons/calendar.svg',
      description: 'Create a QR code for an event or appointment',
    },
    {
      type: 'message',
      label: 'Message',
      icon: '/icons/message.svg',
      description: 'Create a QR code for a text message (up to 300 characters)',
    },
    {
      type: 'file',
      label: 'File',
      icon: '/icons/file.svg',
      description: 'Create a QR code for a file or document',
    },
    {
      type: 'menu',
      label: 'Menu',
      icon: '/icons/menu.svg',
      description: 'Create a QR code for a restaurant menu',
    },
    {
      type: 'links',
      label: 'Multiple Links',
      icon: '/icons/links.svg',
      description: 'Create a QR code for multiple links',
    },
    {
      type: 'form',
      label: 'Form',
      icon: '/icons/form.svg',
      description: 'Create a QR code for a form or survey',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {qrTypes.map((qrType) => (
        <button
          key={qrType.type}
          onClick={() => onSelect(qrType.type)}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
            selected === qrType.type
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/10'
          }`}
        >
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            {/* Fallback to a div with an icon name if the SVG is not available */}
            {qrType.icon ? (
              <div className="w-8 h-8 flex items-center justify-center text-blue-600">
                {qrType.type === 'url' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                )}
                {qrType.type === 'vcard' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
                {qrType.type === 'calendar' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                )}
                {qrType.type === 'message' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                )}
                {qrType.type === 'file' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                )}
                {qrType.type === 'menu' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
                {qrType.type === 'links' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                )}
                {qrType.type === 'form' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                )}
              </div>
            ) : (
              <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                {qrType.label.charAt(0)}
              </div>
            )}
          </div>
          <h3 className="font-medium text-gray-900 dark:text-white">{qrType.label}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
            {qrType.description}
          </p>
        </button>
      ))}
    </div>
  );
};

export default TypeSelector;
