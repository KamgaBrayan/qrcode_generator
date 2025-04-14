'use client';

import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';

interface DownloadOptionsProps {
  qrRef: React.RefObject<HTMLDivElement | null>;
  fileName: string;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ qrRef, fileName }) => {
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = React.useState<'png' | 'pdf'>('png');
  const [size, setSize] = React.useState<number>(300);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownload = async () => {
    if (!qrRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // Get the QR code canvas element
      const qrCanvas = qrRef.current.querySelector('canvas');
      
      if (!qrCanvas) {
        console.error('QR code canvas not found');
        return;
      }
      
      // Create a new canvas with the desired size
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('Could not get canvas context');
        return;
      }
      
      // Set canvas size
      canvas.width = size;
      canvas.height = size;
      
      // Fill with white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate scaling and positioning to center the QR code
      const scale = Math.min(size / qrCanvas.width, size / qrCanvas.height) * 0.9;
      const x = (size - qrCanvas.width * scale) / 2;
      const y = (size - qrCanvas.height * scale) / 2;
      
      // Draw the QR code on the new canvas
      ctx.drawImage(qrCanvas, x, y, qrCanvas.width * scale, qrCanvas.height * scale);
      
      // Store reference to the canvas for potential future use
      canvasRef.current = canvas;
      
      // Download based on selected format
      if (selectedFormat === 'png') {
        // Download as PNG
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${fileName}.png`;
        link.click();
      } else if (selectedFormat === 'pdf') {
        // Download as PDF
        const dataUrl = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        // A4 size in mm: 210 x 297
        const pdfWidth = 210;
        const pdfHeight = 297;
        
        // Calculate positioning to center the QR code on the PDF
        const qrSize = Math.min(pdfWidth, pdfHeight) * 0.6; // 60% of the smaller dimension
        const pdfX = (pdfWidth - qrSize) / 2;
        const pdfY = (pdfHeight - qrSize) / 2;
        
        // Add the QR code to the PDF
        pdf.addImage(dataUrl, 'PNG', pdfX, pdfY, qrSize, qrSize);
        
        // Save the PDF
        pdf.save(`${fileName}.pdf`);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Download Options</h4>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Download your QR code in different formats and sizes.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Format
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                checked={selectedFormat === 'png'}
                onChange={() => setSelectedFormat('png')}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">PNG</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                checked={selectedFormat === 'pdf'}
                onChange={() => setSelectedFormat('pdf')}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">PDF</span>
            </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="size-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Size: {size}px
          </label>
          <input
            id="size-slider"
            type="range"
            min="100"
            max="1000"
            step="50"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>100px</span>
            <span>1000px</span>
          </div>
        </div>
        
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`w-full py-3 px-4 rounded-md ${
            isDownloading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isDownloading ? 'Downloading...' : `Download ${selectedFormat.toUpperCase()}`}
        </button>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Download Tips</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1 list-disc pl-4">
          <li>PNG format is best for digital use and web pages.</li>
          <li>PDF format is ideal for printing and professional documents.</li>
          <li>For print materials, choose a larger size for better quality.</li>
          <li>Always test your QR code after downloading to ensure it scans correctly.</li>
          <li>The minimum recommended size for printing is 2 x 2 cm (about 300px).</li>
        </ul>
      </div>
    </div>
  );
};

export default DownloadOptions;
