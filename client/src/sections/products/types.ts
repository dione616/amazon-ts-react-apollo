export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  image: string;
  rating: number;
}
export interface ProductsData {
  products: Product[];
}
