'use client';

import React from 'react';

interface TemplateGalleryProps {
  selected: string | undefined;
  onChange: (template: string) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ selected, onChange }) => {
  // QR code templates
  const templates = [
    { id: 'none', name: 'None', description: 'No template' },
    { id: 'business', name: 'Business', description: 'Professional business style' },
    { id: 'modern', name: 'Modern', description: 'Clean modern design' },
    { id: 'colorful', name: 'Colorful', description: 'Vibrant colorful style' },
    { id: 'minimal', name: 'Minimal', description: 'Simple minimalist design' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated elegant style' },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Templates</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Choose a pre-designed template for your QR code.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`flex flex-col items-center p-3 border-2 rounded-lg transition-all ${
              selected === template.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/10'
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              {/* Template preview */}
              <div className={`w-12 h-12 ${getTemplateClass(template.id)}`}></div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              {template.description}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Template Tips</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>Templates combine multiple customization options for a cohesive look.</li>
          <li>Choose a template that matches the purpose and context of your QR code.</li>
          <li>You can still make individual customizations after selecting a template.</li>
          <li>Some templates may work better for certain types of QR codes than others.</li>
        </ul>
      </div>
    </div>
  );
};

// Helper function to get the CSS class for each template
const getTemplateClass = (templateId: string): string => {
  switch (templateId) {
    case 'business':
      return 'bg-gray-100 dark:bg-gray-700 border-2 border-blue-800 dark:border-blue-500 rounded-md flex items-center justify-center';
    case 'modern':
      return 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-md flex items-center justify-center';
    case 'colorful':
      return 'bg-gradient-to-br from-pink-400 to-blue-500 dark:from-purple-600 dark:to-blue-700 rounded-lg flex items-center justify-center';
    case 'minimal':
      return 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center';
    case 'elegant':
      return 'bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-200 rounded-sm flex items-center justify-center';
    case 'none':
    default:
      return 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 flex items-center justify-center';
  }
};

export default TemplateGallery;
