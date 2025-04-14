'use client';

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeSettings, QRCodeType, URLData, VCardData, CalendarData, 
          MessageData, FileData, MenuData, LinksData, FormData, 
          QRFormData, QRCodeCustomization } from '../types';
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
    data: { url: '' } as URLData,
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
    let initialData: QRFormData;
    
    switch (type) {
      case 'url':
        initialData = { url: '' } as URLData;
        break;
      case 'vcard':
        initialData = { firstName: '', lastName: '' } as VCardData;
        break;
      case 'calendar':
        initialData = { 
          title: '', 
          startDate: new Date(), 
          endDate: new Date(new Date().getTime() + 60 * 60 * 1000) 
        } as CalendarData;
        break;
      case 'message':
        initialData = { message: '' } as MessageData;
        break;
      case 'file':
        initialData = { fileName: '', fileUrl: '' } as FileData;
        break;
      case 'menu':
        initialData = { restaurantName: '', items: [] } as MenuData;
        break;
      case 'links':
        initialData = { links: [] } as LinksData;
        break;
      case 'form':
        initialData = { formUrl: '' } as FormData;
        break;
      default:
        initialData = { url: '' } as URLData;
    }
    
    setQRSettings({
      ...qrSettings,
      type,
      data: initialData,
    });
  };

  // Handle form data changes
  const handleDataChange = (data: QRFormData) => {
    setQRSettings({
      ...qrSettings,
      data,
    });
    
    // Generate QR value based on type and data
    generateQRValue(qrSettings.type, data);
  };

  // Handle customization changes
  const handleCustomizationChange = (customization: Partial<QRCodeCustomization>) => {
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
  const generateQRValue = (type: QRCodeType, data: QRFormData) => {
    let value = '';
    
    switch (type) {
      case 'url':
        value = (data as URLData).url || '';
        break;
      case 'vcard': {
        const vCardData = data as VCardData;
        // Format vCard data according to the vCard specification
        if (vCardData.firstName || vCardData.lastName) {
          value = `BEGIN:VCARD
VERSION:3.0
N:${vCardData.lastName || ''};${vCardData.firstName || ''}
FN:${vCardData.firstName || ''} ${vCardData.lastName || ''}
${vCardData.organization ? `ORG:${vCardData.organization}\n` : ''}
${vCardData.title ? `TITLE:${vCardData.title}\n` : ''}
${vCardData.email ? `EMAIL:${vCardData.email}\n` : ''}
${vCardData.phone ? `TEL;TYPE=WORK,VOICE:${vCardData.phone}\n` : ''}
${vCardData.mobile ? `TEL;TYPE=CELL,VOICE:${vCardData.mobile}\n` : ''}
${vCardData.fax ? `TEL;TYPE=FAX:${vCardData.fax}\n` : ''}
${vCardData.street || vCardData.city || vCardData.state || vCardData.zip || vCardData.country ? 
  `ADR;TYPE=WORK:;;${vCardData.street || ''};${vCardData.city || ''};${vCardData.state || ''};${vCardData.zip || ''};${vCardData.country || ''}\n` : ''}
${vCardData.website ? `URL:${vCardData.website}\n` : ''}
${vCardData.note ? `NOTE:${vCardData.note}\n` : ''}
END:VCARD`;
        }
        break;
      }
      case 'calendar': {
        const calendarData = data as CalendarData;
        // Format calendar data according to the iCalendar specification
        if (calendarData.title && calendarData.startDate && calendarData.endDate) {
          const formatDate = (date: Date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
          };
          
          value = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//QR Code Generator//EN
BEGIN:VEVENT
SUMMARY:${calendarData.title}
${calendarData.description ? `DESCRIPTION:${calendarData.description}\n` : ''}
${calendarData.location ? `LOCATION:${calendarData.location}\n` : ''}
DTSTART:${formatDate(new Date(calendarData.startDate))}
DTEND:${formatDate(new Date(calendarData.endDate))}
END:VEVENT
END:VCALENDAR`;
        }
        break;
      }
      case 'message':
        value = (data as MessageData).message || '';
        break;
      case 'file':
        value = (data as FileData).fileUrl || '';
        break;
      case 'menu': {
        const menuData = data as MenuData;
        // Format menu data as JSON
        if (menuData.restaurantName && menuData.items && menuData.items.length > 0) {
          value = JSON.stringify(menuData);
        }
        break;
      }
      case 'links': {
        const linksData = data as LinksData;
        // Format links data as JSON
        if (linksData.links && linksData.links.length > 0) {
          value = JSON.stringify(linksData);
        }
        break;
      }
      case 'form':
        value = (data as FormData).formUrl || '';
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
        return <URLForm data={qrSettings.data as URLData} onChange={handleDataChange} />;
      case 'vcard':
        return <VCardForm data={qrSettings.data as VCardData} onChange={handleDataChange} />;
      case 'calendar':
        return <CalendarForm data={qrSettings.data as CalendarData} onChange={handleDataChange} />;
      case 'message':
        return <MessageForm data={qrSettings.data as MessageData} onChange={handleDataChange} />;
      case 'file':
        return <FileForm data={qrSettings.data as FileData} onChange={handleDataChange} />;
      case 'menu':
        return <MenuForm data={qrSettings.data as MenuData} onChange={handleDataChange} />;
      case 'links':
        return <LinksForm data={qrSettings.data as LinksData} onChange={handleDataChange} />;
      case 'form':
        return <FormForm data={qrSettings.data as FormData} onChange={handleDataChange} />;
      default:
        return <URLForm data={qrSettings.data as URLData} onChange={handleDataChange} />;
    }
  };

  // Render customization options
  const renderCustomization = () => {
    return (
      <div className="space-y-6">
        <PatternSelector 
          selected={qrSettings.customization.pattern} 
          onChange={(pattern: string) => handleCustomizationChange({ pattern })} 
        />
        <EyeCustomizer 
          selected={qrSettings.customization.eyeStyle} 
          onChange={(eyeStyle: string) => handleCustomizationChange({ eyeStyle })} 
        />
        <LogoUploader 
          logo={qrSettings.customization.logo} 
          onChange={(logo: string) => handleCustomizationChange({ logo })} 
        />
        <ColorPicker 
          foregroundColor={qrSettings.customization.foregroundColor} 
          backgroundColor={qrSettings.customization.backgroundColor} 
          onChange={(colors: { foregroundColor?: string; backgroundColor?: string }) => handleCustomizationChange(colors)} 
        />
        <FrameSelector 
          selected={qrSettings.customization.frame} 
          onChange={(frame: string) => handleCustomizationChange({ frame })} 
        />
        <TemplateGallery 
          selected={qrSettings.customization.template} 
          onChange={(template: string) => handleCustomizationChange({ template })} 
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