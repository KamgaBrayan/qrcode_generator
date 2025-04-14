'use client';

import React from 'react';

interface FrameSelectorProps {
  selected: string | undefined;
  onChange: (frame: string) => void;
}

const FrameSelector: React.FC<FrameSelectorProps> = ({ selected, onChange }) => {
  // QR code frames
  const frames = [
    { id: 'none', name: 'None', description: 'No frame' },
    { id: 'simple', name: 'Simple', description: 'Basic border frame' },
    { id: 'rounded', name: 'Rounded', description: 'Rounded corners frame' },
    { id: 'scan-me', name: 'Scan Me', description: 'Frame with "Scan Me" text' },
    { id: 'dotted', name: 'Dotted', description: 'Dotted border frame' },
    { id: 'shadow', name: 'Shadow', description: 'Frame with shadow effect' },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Frame</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Add a frame around your QR code.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {frames.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onChange(frame.id)}
            className={`flex flex-col items-center p-3 border-2 rounded-lg transition-all ${
              selected === frame.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/10'
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              {/* Frame preview */}
              <div className={`w-12 h-12 bg-white dark:bg-gray-800 ${getFrameClass(frame.id)}`}>
                <div className="w-8 h-8 bg-black dark:bg-white m-auto"></div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{frame.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              {frame.description}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Frame Tips</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>Frames can help draw attention to your QR code.</li>
          <li>A &quot;Scan Me&quot; frame can provide a clear call to action.</li>
          <li>Make sure the frame doesn&apos;t interfere with the QR code&apos;s quiet zone (the white space around it).</li>
          <li>Choose a frame that complements your brand or the purpose of the QR code.</li>
        </ul>
      </div>
    </div>
  );
};

// Helper function to get the CSS class for each frame
const getFrameClass = (frameId: string): string => {
  switch (frameId) {
    case 'simple':
      return 'border-2 border-black dark:border-white flex items-center justify-center';
    case 'rounded':
      return 'border-2 border-black dark:border-white rounded-lg flex items-center justify-center';
    case 'scan-me':
      return 'border-2 border-black dark:border-white flex items-center justify-center relative after:content-["Scan"] after:absolute after:bottom-[-20px] after:text-[8px] after:font-bold';
    case 'dotted':
      return 'border-2 border-dashed border-black dark:border-white flex items-center justify-center';
    case 'shadow':
      return 'border border-gray-300 dark:border-gray-600 shadow-lg flex items-center justify-center';
    case 'none':
    default:
      return 'flex items-center justify-center';
  }
};

export default FrameSelector;
