import merge from "lodash.merge";
import { productResolvers } from "./products";
import { viewerResolvers } from "./viewer";

export const resolvers = merge(viewerResolvers, productResolvers);
