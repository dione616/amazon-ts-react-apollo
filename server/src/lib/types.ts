import { Collection, ObjectId } from "mongodb";

//type for MongoDB Product
export interface Product {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  seller: string;
}

//MongoDB Collections types
export interface Database {
  products: Collection<Product>;
}
