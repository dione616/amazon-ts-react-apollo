import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type User1 {
    _id: ID!
    username: String!
    email: String!
    created: String!
    token: String!
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

  input LogInInput {
    code: String!
  }

  input UserInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    authUrl: String!
    products: [Product!]!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    deleteProduct(id: ID!): Product!
    LoginUser(email: String!, password: String!): User1!
    RegisterUser(user: UserInput!): User1!
  }
`;
