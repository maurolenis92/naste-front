export interface Product {
  id: string;
  code: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  imageBase64: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
