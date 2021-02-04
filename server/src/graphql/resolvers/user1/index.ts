import { LoginInput } from "./types";
import { ObjectId } from "mongodb";
import { Database, User, User1 } from "./../../../lib/types";
import {
  AuthenticationError,
  IResolvers,
  UserInputError,
  ValidationError,
} from "apollo-server-express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface DecodedToken {
  username: string;
  password: string;
  iat: number;
  exp: number;
}

const getToken = (email: string, password: string) => {
  const token = jwt.sign({ email, password }, "SECRET", {
    expiresIn: "3d",
  });
  return token;
};

export const userResolver: IResolvers = {
  Query: {},
  Mutation: {
    RegisterUser: async (
      _root,
      {
        user: { username, password, email },
      }: {
        user: {
          username: string;
          password: string;
          confirmPassword: string;
          email: string;
        };
      },
      { db }: { db: Database }
    ): Promise<User1> => {
      //check if user already exists

      const userExists = await db.users.findOne({ contact: email });
      if (userExists) throw new ValidationError("This email is used!");

      const token = getToken(email, password);

      const decoded = jwt.verify(token, "SECRET");
      console.log("DECODED:", decoded);

      const res = await db.users.insertOne({
        _id: new ObjectId(),
        token,
        name: username,
        avatar: "ava",
        contact: email,
        walletId: "123",
        income: 109750.56,
        orders: [],
        products: [],
      });

      const result = res.ops[0];

      console.log(result);

      return {
        _id: new ObjectId(),
        username: result.name,
        email,
        token,
      };
    },
    LoginUser: async (
      _root,
      { email, password }: LoginInput,
      { db }: { db: Database }
    ): Promise<User1 | null> => {
      /*  const {errors,valid}=validateLogin(username,password)
      if(!valid) throw new UserInputError('Error', { errors }); */

      const user = await db.users.findOne({ contact: email });
      if (!user) throw new AuthenticationError("this user is not found!");

      let match = false;
      jwt.verify(user.token, "SECRET", (err, dec) => {
        if (err) return;
        if ((<DecodedToken>dec).password === password) {
          match = true;
        }
      });

      if (match) {
        return {
          _id: user._id,
          username: user.name,
          email: user.contact,
          token: user.token,
        };
      }
      return null;
    },
  },
};
