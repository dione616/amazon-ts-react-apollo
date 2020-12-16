import merge from "lodash.merge";
import { productResolvers } from "./products";

export const resolvers = merge(productResolvers);
