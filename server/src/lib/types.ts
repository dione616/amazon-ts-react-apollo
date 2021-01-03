import { Collection, ObjectId } from "mongodb";

export enum ProductQualityType {
  New = "NEW",
  Used = "USED",
}

//type for MongoDB Product
export interface Category {
  _id: ObjectId;
  title: string;
}
export interface Product {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;
  quality: ProductQualityType;
  host: string;
  category: ObjectId;
  address: string;
  country: string;
  city: string;
  seller: ObjectId;
}
export interface User {
  _id: ObjectId;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  orders: ObjectId[];
  products: ObjectId[];
}

//TODO: add date when sent and date when recieve product
export interface Order {
  _id: ObjectId;
  products: ObjectId[];
  user: ObjectId;
}

//MongoDB Collections types
export interface Database {
  orders: Collection<Order>;
  products: Collection<Product>;
  users: Collection<User>;
}
