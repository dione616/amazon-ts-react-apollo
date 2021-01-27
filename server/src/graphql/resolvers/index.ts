import merge from "lodash.merge";
import { productResolvers } from "./products";
import { viewerResolvers } from "./viewer";
import { userResolver } from "./user1";

export const resolvers = merge(userResolver, viewerResolvers, productResolvers);
