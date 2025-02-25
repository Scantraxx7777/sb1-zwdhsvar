export interface Template {
  id: string;
  name: string;
  description: string;
  price: number;
  previewUrl: string;
  thumbnailUrl: string;
  category: string;
  features: string[];
  isFree: boolean;
  downloadUrl: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  purchasedTemplates: string[];
}

export interface CartItem {
  templateId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  templateIds: string[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}