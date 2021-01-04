import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String!
    image: String!
    price: Float!
    rating: Float!
    seller: String!
  }

  type Query {
    authUrl: String!
    products: [Product!]!
  }

  type Mutation {
    logIn: String!
    logOut: String!
    deleteProduct(id: ID!): Product!
  }
`;
