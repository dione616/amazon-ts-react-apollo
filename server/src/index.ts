require("dotenv").config();
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/index";
import { connectDatabase } from "./database";

const port = process.env.PORT;

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(port, () => {
    console.log(`[app] is running on port ${port}`);
  });
};

mount(express());
