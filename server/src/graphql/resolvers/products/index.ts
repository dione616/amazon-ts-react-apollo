import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { Database, Product } from "../../../lib/types";

export const productResolvers: IResolvers = {
  Query: {
    products: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Product[]> => {
      return await db.products.find({}).toArray();
    },
  },
  Mutation: {
    deleteProduct: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Product> => {
      const deleteResult = await db.products.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteResult.value) {
        throw new Error("Failed to delete product");
      }

      return deleteResult.value;
    },
  },
  Product: {
    id: (product: Product): string => product._id.toString(),
  },
};
