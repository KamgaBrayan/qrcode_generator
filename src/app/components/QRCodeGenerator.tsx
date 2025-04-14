'use client';

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeSettings, QRCodeType } from '../types';
import TypeSelector from '../components/TypeSelector';
import URLForm from '../components/forms/URLForm';
import VCardForm from '../components/forms/VCardForm';
import CalendarForm from '../components/forms/CalendarForm';
import MessageForm from '../components/forms/MessageForm';
import FileForm from '../components/forms/FileForm';
import MenuForm from '../components/forms/MenuForm';
import LinksForm from '../components/forms/LinksForm';
import FormForm from '../components/forms/FormForm';
import PatternSelector from '../components/customization/PatternSelector';
import EyeCustomizer from '../components/customization/EyeCustomizer';
import LogoUploader from '../components/customization/LogoUploader';
import ColorPicker from '../components/customization/ColorPicker';
import FrameSelector from '../components/customization/FrameSelector';
import TemplateGallery from '../components/customization/TemplateGallery';
import DownloadOptions from '../components/download/DownloadOptions';

const QRCodeGenerator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [qrSettings, setQRSettings] = useState<QRCodeSettings>({
    type: 'url',
    data: { url: '' },
    customization: {
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
    },
    isDynamic: false,
  });
  const [qrValue, setQRValue] = useState<string>('');
  const qrRef = useRef<HTMLDivElement | null>(null);

  // Handle type selection
  const handleTypeSelect = (type: QRCodeType) => {
    let initialData;
    
    switch (type) {
      case 'url':
        initialData = { url: '' };
        break;
      case 'vcard':
        initialData = { firstName: '', lastName: '' };
        break;
      case 'calendar':
        initialData = { 
          title: '', 
          startDate: new Date(), 
          endDate: new Date(new Date().getTime() + 60 * 60 * 1000) 
        };
        break;
      case 'message':
        initialData = { message: '' };
        break;
      case 'file':
        initialData = { fileName: '', fileUrl: '' };
        break;
      case 'menu':
        initialData = { restaurantName: '', items: [] };
        break;
      case 'links':
        initialData = { links: [] };
        break;
      case 'form':
        initialData = { formUrl: '' };
        break;
      default:
        initialData = { url: '' };
    }
    
    setQRSettings({
      ...qrSettings,
      type,
      data: initialData,
    });
  };

  // Handle form data changes
  const handleDataChange = (data: any) => {
    setQRSettings({
      ...qrSettings,
      data,
    });
    
    // Generate QR value based on type and data
    generateQRValue(qrSettings.type, data);
  };

  // Handle customization changes
  const handleCustomizationChange = (customization: any) => {
    setQRSettings({
      ...qrSettings,
      customization: {
        ...qrSettings.customization,
        ...customization,
      },
    });
  };

  // Toggle dynamic QR code
  const handleDynamicToggle = () => {
    setQRSettings({
      ...qrSettings,
      isDynamic: !qrSettings.isDynamic,
    });
  };

  // Generate QR value based on type and data
  const generateQRValue = (type: QRCodeType, data: any) => {
    let value = '';
    
    switch (type) {
      case 'url':
        value = data.url || '';
        break;
      case 'vcard':
        // Format vCard data according to the vCard specification
        if (data.firstName || data.lastName) {
          value = `BEGIN:VCARD
VERSION:3.0
N:${data.lastName || ''};${data.firstName || ''}
FN:${data.firstName || ''} ${data.lastName || ''}
${data.organization ? `ORG:${data.organization}\n` : ''}
${data.title ? `TITLE:${data.title}\n` : ''}
${data.email ? `EMAIL:${data.email}\n` : ''}
${data.phone ? `TEL;TYPE=WORK,VOICE:${data.phone}\n` : ''}
${data.mobile ? `TEL;TYPE=CELL,VOICE:${data.mobile}\n` : ''}
${data.fax ? `TEL;TYPE=FAX:${data.fax}\n` : ''}
${data.street || data.city || data.state || data.zip || data.country ? 
  `ADR;TYPE=WORK:;;${data.street || ''};${data.city || ''};${data.state || ''};${data.zip || ''};${data.country || ''}\n` : ''}
${data.website ? `URL:${data.website}\n` : ''}
${data.note ? `NOTE:${data.note}\n` : ''}
END:VCARD`;
        }
        break;
      case 'calendar':
        // Format calendar data according to the iCalendar specification
        if (data.title && data.startDate && data.endDate) {
          const formatDate = (date: Date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
          };
          
          value = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//QR Code Generator//EN
BEGIN:VEVENT
SUMMARY:${data.title}
${data.description ? `DESCRIPTION:${data.description}\n` : ''}
${data.location ? `LOCATION:${data.location}\n` : ''}
DTSTART:${formatDate(new Date(data.startDate))}
DTEND:${formatDate(new Date(data.endDate))}
END:VEVENT
END:VCALENDAR`;
        }
        break;
      case 'message':
        value = data.message || '';
        break;
      case 'file':
        value = data.fileUrl || '';
        break;
      case 'menu':
        // Format menu data as JSON
        if (data.restaurantName && data.items && data.items.length > 0) {
          value = JSON.stringify(data);
        }
        break;
      case 'links':
        // Format links data as JSON
        if (data.links && data.links.length > 0) {
          value = JSON.stringify(data);
        }
        break;
      case 'form':
        value = data.formUrl || '';
        break;
      default:
        value = '';
    }
    
    setQRValue(value);
  };

  // Render form based on selected type
  const renderForm = () => {
    switch (qrSettings.type) {
      case 'url':
        return <URLForm data={qrSettings.data as any} onChange={handleDataChange} />;
      case 'vcard':
        return <VCardForm data={qrSettings.data as any} onChange={handleDataChange} />;
      case 'calendar':
        return <CalendarForm data={qrSettings.data as any} onChange={handleDataChange} />;
      case 'message':
        return <MessageForm data={qrSettings.data as any} onChange={handleDataChange} />;
      case 'file':
        return <FileForm data={qrSettings.data as any} onChange={handleDataChange} />;
      case 'menu':
        return <MenuForm data={qrSettings.data as any} onChange={handleDataChange} />;
      case 'links':
        return <LinksForm data={qrSettings.data as any} onChange={handleDataChange} />;
      case 'form':
        return <FormForm data={qrSettings.data as any} onChange={handleDataChange} />;
      default:
        return <URLForm data={qrSettings.data as any} onChange={handleDataChange} />;
    }
  };

  // Render customization options
  const renderCustomization = () => {
    return (
      <div className="space-y-6">
        <PatternSelector 
          selected={qrSettings.customization.pattern} 
          onChange={(pattern) => handleCustomizationChange({ pattern })} 
        />
        <EyeCustomizer 
          selected={qrSettings.customization.eyeStyle} 
          onChange={(eyeStyle) => handleCustomizationChange({ eyeStyle })} 
        />
        <LogoUploader 
          logo={qrSettings.customization.logo} 
          onChange={(logo) => handleCustomizationChange({ logo })} 
        />
        <ColorPicker 
          foregroundColor={qrSettings.customization.foregroundColor} 
          backgroundColor={qrSettings.customization.backgroundColor} 
          onChange={(colors) => handleCustomizationChange(colors)} 
        />
        <FrameSelector 
          selected={qrSettings.customization.frame} 
          onChange={(frame) => handleCustomizationChange({ frame })} 
        />
        <TemplateGallery 
          selected={qrSettings.customization.template} 
          onChange={(template) => handleCustomizationChange({ template })} 
        />
      </div>
    );
  };

  // Render step content based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Select QR Code Type</h2>
            <TypeSelector selected={qrSettings.type} onSelect={handleTypeSelect} />
            {renderForm()}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="dynamic-toggle"
                checked={qrSettings.isDynamic}
                onChange={handleDynamicToggle}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="dynamic-toggle" className="text-sm font-medium text-gray-700">
                Make this QR code dynamic (editable after creation)
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customize Your QR Code</h2>
            {renderCustomization()}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Download Your QR Code</h2>
            <div className="flex justify-center" ref={qrRef}>
              <QRCodeCanvas
                value={qrValue || 'https://example.com'}
                size={250}
                bgColor={qrSettings.customization.backgroundColor || '#FFFFFF'}
                fgColor={qrSettings.customization.foregroundColor || '#000000'}
                level="H"
                includeMargin
                imageSettings={
                  qrSettings.customization.logo
                    ? {
                        src: qrSettings.customization.logo,
                        x: undefined,
                        y: undefined,
                        height: 50,
                        width: 50,
                        excavate: true,
                      }
                    : undefined
                }
              />
            </div>
            <DownloadOptions qrRef={qrRef} fileName={`qrcode-${qrSettings.type}`} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">QR Code Generator</h1>
          <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`px-4 py-2 rounded-md ${
                  activeStep === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Step {step}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderStepContent()}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className={`px-4 py-2 rounded-md ${
                activeStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            {activeStep < 3 ? (
              <button
                onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
