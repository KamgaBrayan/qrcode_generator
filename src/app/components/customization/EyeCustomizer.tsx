'use client';

import React from 'react';

interface EyeCustomizerProps {
  selected: string | undefined;
  onChange: (eyeStyle: string) => void;
}

const EyeCustomizer: React.FC<EyeCustomizerProps> = ({ selected, onChange }) => {
  // QR code eye styles
  const eyeStyles = [
    { id: 'square', name: 'Square', description: 'Standard square eyes' },
    { id: 'rounded', name: 'Rounded', description: 'Rounded corner eyes' },
    { id: 'circle', name: 'Circle', description: 'Circular eyes' },
    { id: 'leaf', name: 'Leaf', description: 'Leaf-shaped eyes' },
    { id: 'diamond', name: 'Diamond', description: 'Diamond-shaped eyes' },
    { id: 'frame', name: 'Frame', description: 'Frame-style eyes' },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Eye Style</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Customize the corner eyes of your QR code.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {eyeStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`flex flex-col items-center p-3 border-2 rounded-lg transition-all ${
              selected === style.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/10'
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              {/* Eye style preview - in a real app, these would be actual eye style previews */}
              <div className="relative w-12 h-12">
                <div className={`absolute top-0 left-0 w-4 h-4 border-2 border-black dark:border-white ${getEyeClass(style.id)}`}></div>
                <div className={`absolute top-0 right-0 w-4 h-4 border-2 border-black dark:border-white ${getEyeClass(style.id)}`}></div>
                <div className={`absolute bottom-0 left-0 w-4 h-4 border-2 border-black dark:border-white ${getEyeClass(style.id)}`}></div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{style.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              {style.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to get the CSS class for each eye style
const getEyeClass = (eyeStyleId: string): string => {
  switch (eyeStyleId) {
    case 'rounded':
      return 'rounded-lg';
    case 'circle':
      return 'rounded-full';
    case 'leaf':
      return 'rounded-tl-full';
    case 'diamond':
      return 'rotate-45';
    case 'frame':
      return 'border-4 bg-transparent';
    case 'square':
    default:
      return '';
  }
};

export default EyeCustomizer;
