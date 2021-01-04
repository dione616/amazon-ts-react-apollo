import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

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

  input LogInInput {
    code: String!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    deleteProduct(id: ID!): Product!
  }
`;
