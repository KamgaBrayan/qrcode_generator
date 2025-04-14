'use client';

import React from 'react';

interface PatternSelectorProps {
  selected: string | undefined;
  onChange: (pattern: string) => void;
}

const PatternSelector: React.FC<PatternSelectorProps> = ({ selected, onChange }) => {
  // QR code patterns
  const patterns = [
    { id: 'default', name: 'Default', description: 'Standard QR code pattern' },
    { id: 'dots', name: 'Dots', description: 'Rounded dots pattern' },
    { id: 'rounded', name: 'Rounded', description: 'Rounded corners pattern' },
    { id: 'classy', name: 'Classy', description: 'Elegant pattern with thin lines' },
    { id: 'square', name: 'Square', description: 'Bold square pattern' },
    { id: 'extra-rounded', name: 'Extra Rounded', description: 'Highly rounded pattern' },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">QR Code Pattern</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Choose a pattern style for your QR code.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => onChange(pattern.id)}
            className={`flex flex-col items-center p-3 border-2 rounded-lg transition-all ${
              selected === pattern.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/10'
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              {/* Pattern preview - in a real app, these would be actual pattern previews */}
              <div className={`w-12 h-12 bg-black dark:bg-white ${getPatternClass(pattern.id)}`}></div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{pattern.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              {pattern.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to get the CSS class for each pattern
const getPatternClass = (patternId: string): string => {
  switch (patternId) {
    case 'dots':
      return 'rounded-full';
    case 'rounded':
      return 'rounded-lg';
    case 'classy':
      return 'border border-gray-300 dark:border-gray-600 bg-transparent';
    case 'square':
      return 'border-4 border-black dark:border-white';
    case 'extra-rounded':
      return 'rounded-2xl';
    case 'default':
    default:
      return '';
  }
};

export default PatternSelector;
