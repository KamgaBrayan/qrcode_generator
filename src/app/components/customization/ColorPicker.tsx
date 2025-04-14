'use client';

import React from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  foregroundColor: string | undefined;
  backgroundColor: string | undefined;
  onChange: (colors: { foregroundColor?: string; backgroundColor?: string }) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  foregroundColor = '#000000', 
  backgroundColor = '#FFFFFF',
  onChange 
}) => {
  const [activePicker, setActivePicker] = React.useState<'foreground' | 'background' | null>(null);
  
  const handleForegroundChange = (color: string) => {
    onChange({ foregroundColor: color });
  };
  
  const handleBackgroundChange = (color: string) => {
    onChange({ backgroundColor: color });
  };
  
  const togglePicker = (picker: 'foreground' | 'background') => {
    setActivePicker(activePicker === picker ? null : picker);
  };

  // Predefined color palettes
  const foregroundPalette = [
    '#000000', // Black
    '#0047AB', // Cobalt Blue
    '#006400', // Dark Green
    '#8B0000', // Dark Red
    '#4B0082', // Indigo
    '#800080', // Purple
    '#FF4500', // Orange Red
    '#1E90FF', // Dodger Blue
  ];
  
  const backgroundPalette = [
    '#FFFFFF', // White
    '#F0F8FF', // Alice Blue
    '#F5F5DC', // Beige
    '#FFFACD', // Lemon Chiffon
    '#E6E6FA', // Lavender
    '#F0FFF0', // Honeydew
    '#FFF0F5', // Lavender Blush
    '#F0FFFF', // Azure
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Colors</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Customize the colors of your QR code.
      </p>
      
      <div className="space-y-4">
        {/* Foreground Color */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Foreground Color
            </label>
            <div 
              className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
              style={{ backgroundColor: foregroundColor }}
              onClick={() => togglePicker('foreground')}
            ></div>
          </div>
          
          {activePicker === 'foreground' && (
            <div className="mb-4">
              <div className="flex justify-center mb-3">
                <HexColorPicker color={foregroundColor} onChange={handleForegroundChange} />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {foregroundPalette.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-md border ${
                      color === foregroundColor 
                        ? 'border-blue-500 ring-2 ring-blue-300' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleForegroundChange(color)}
                    aria-label={`Select color ${color}`}
                  ></button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <input
              type="text"
              value={foregroundColor}
              onChange={(e) => handleForegroundChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
              placeholder="#000000"
            />
          </div>
        </div>
        
        {/* Background Color */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Background Color
            </label>
            <div 
              className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer"
              style={{ backgroundColor: backgroundColor }}
              onClick={() => togglePicker('background')}
            ></div>
          </div>
          
          {activePicker === 'background' && (
            <div className="mb-4">
              <div className="flex justify-center mb-3">
                <HexColorPicker color={backgroundColor} onChange={handleBackgroundChange} />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {backgroundPalette.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-md border ${
                      color === backgroundColor 
                        ? 'border-blue-500 ring-2 ring-blue-300' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleBackgroundChange(color)}
                    aria-label={`Select color ${color}`}
                  ></button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => handleBackgroundChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Color Tips</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>High contrast between foreground and background colors improves scannability.</li>
          <li>Dark foreground on light background typically works best.</li>
          <li>Avoid using very similar colors for foreground and background.</li>
          <li>Test your QR code with different scanning apps to ensure compatibility.</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPicker;
