import { Product } from './products.model';

export interface Invoice {
  id: string;
  createdById: string;
  status: 'PENDING' | 'PAID' | 'DELIVERED' | 'CANCELLED';
  origin: 'INSTAGRAM' | 'FACEBOOK' | 'TIKTOK' | 'WHATSAPP' | 'REFERRAL' | 'OTHER';
  paymentMethod: 'CASH' | 'TRANSFER' | 'BREB' | 'NEQUI' | 'BANCOLOMBIA' | 'OTHER';
  customerName: string;
  customerIdDoc: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  neighborhood: string;
  address: string;
  total: number;
  invoiceDate: string;
  deliveryDate: string | null;
  createdAt: string;
  updatedAt: string;
  items: InvoiceItem[];
  createdBy: UserCreated;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product: Product;
}

export interface UserCreated {
  id: string;
  name: string;
  email: string;
}
