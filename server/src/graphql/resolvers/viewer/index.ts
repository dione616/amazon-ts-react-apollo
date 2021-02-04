import { IResolvers } from "apollo-server-express";
import crypto from "crypto";
import { Database, User, Viewer } from "../../../lib/types";
import { Google } from "../../../lib/api";
import { LogInArgs } from "./types";
import { ObjectId } from "mongodb";

const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);

  /* if (!user) {
    throw new Error("Google login error");
  } */

  // Name/Photo/Email Lists
  const userNamesList: any = user.names && user.names.length ? user.names : "";
  const userPhotosList = user.photos && user.photos.length ? user.photos : "";
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : "";

  // User Display Name
  const userName = userNamesList[0].displayName;

  // User Id
  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : "";

  // User Avatar
  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : "";

  // User Email
  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : "";

  /* if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google login error");
  } */
  let viewer;
  try {
    const updateRes = await db.users.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: userName,
          avatar: userAvatar,
          contact: userEmail,
          token,
        },
      },
      { returnOriginal: false }
    );

    viewer = updateRes.value;
  } catch (error) {
    console.log("MONGOERROR", error);
  }

  try {
    if (!viewer) {
      const insertResult = await db.users.insertOne({
        _id: userId,
        token,
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        income: 0,
        orders: [],
        products: [],
      });

      viewer = insertResult.ops[0];
    }
  } catch (error) {
    console.log("MONGOERROR 2", error);
  }

  return viewer;
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
      }
    },
  },
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db }: { db: Database }
    ): Promise<Viewer> => {
      const code = input ? input.code : null;
      const token = crypto.randomBytes(16).toString("hex");

      const viewer: User | undefined = code
        ? await logInViaGoogle(code, token, db)
        : undefined;

      if (!viewer) {
        return { didRequest: true };
      }

      const newViewer = {
        _id: viewer._id.toString(),
        token: viewer.token,
        avatar: viewer.avatar,
        walletId: viewer.walletId,
        didRequest: true,
      };
      console.log(newViewer);

      return newViewer;
    },
    logOut: (): Viewer => {
      try {
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to logOut ${error}`);
      }
    },
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    },
  },
};
