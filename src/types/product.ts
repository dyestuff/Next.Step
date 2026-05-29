export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string | number;
  sizes: number[];
  image: string;
  description: string;
}