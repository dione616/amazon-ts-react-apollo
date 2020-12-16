import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { products } from "./products";

const Product = new GraphQLObjectType({
  name: "Porduct",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    image: {
      type: GraphQLNonNull(GraphQLString),
    },
    price: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    rating: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    seller: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    products: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Product))),
      resolve: () => products,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteProduct: {
      type: GraphQLNonNull(Product),
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (_root, { id }) => {
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === id) {
            return products.splice(i, 1)[0];
          }
        }

        throw new Error("Failed to delete product");
      },
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });
