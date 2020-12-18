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
export interface DeleteProductData {
  deleteProduct: Product;
}
export interface DeleteProductVariables {
  id: string;
}
