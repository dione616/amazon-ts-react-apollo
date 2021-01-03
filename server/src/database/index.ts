import { MongoClient } from "mongodb";
import { Database, Order, Product, User } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0.n5ags.mongodb.net/<dbname>?retryWrites=true&w=majority`;
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("storeapp");

  return {
    products: db.collection<Product>("products"),
    orders: db.collection<Order>("orders"),
    users: db.collection<User>("users2"),
  };
};
