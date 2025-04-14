// QR Code Types
export type QRCodeType = 
  | 'url' 
  | 'vcard' 
  | 'calendar' 
  | 'message' 
  | 'file' 
  | 'menu' 
  | 'links' 
  | 'form';

// QR Code Data
export interface QRCodeData {
  type: QRCodeType;
  content: string;
}

// URL QR Code
export interface URLData {
  url: string;
}

// vCard QR Code
export interface VCardData {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  website?: string;
  note?: string;
}

// Calendar QR Code
export interface CalendarData {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  allDay?: boolean;
}

// Message QR Code
export interface MessageData {
  message: string;
}

// File QR Code
export interface FileData {
  fileName: string;
  fileUrl: string;
}

// Menu QR Code
export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  category?: string;
}

export interface MenuData {
  restaurantName: string;
  items: MenuItem[];
}

// Links QR Code
export interface LinkItem {
  title: string;
  url: string;
}

export interface LinksData {
  title?: string;
  links: LinkItem[];
}

// Form QR Code
export interface FormData {
  formUrl: string;
  formTitle?: string;
}

// QR Code Customization
export interface QRCodeCustomization {
  foregroundColor: string;
  backgroundColor: string;
  pattern?: string;
  eyeStyle?: string;
  logo?: string;
  frame?: string;
  template?: string;
}

// Combined QR Code Settings
export interface QRCodeSettings {
  type: QRCodeType;
  data: URLData | VCardData | CalendarData | MessageData | FileData | MenuData | LinksData | FormData;
  customization: QRCodeCustomization;
  isDynamic: boolean;
}

// Type union utilitaire pour les données de formulaire
export type QRFormData = URLData | VCardData | CalendarData | MessageData | FileData | MenuData | LinksData | FormData;

// Props pour les composants de formulaire
export interface FormComponentProps<T extends QRFormData> {
  data: T;
  onChange: (data: T) => void;
}