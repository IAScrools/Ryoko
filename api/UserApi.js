import { db, storage } from "../config/firebase";
import * as firebase from "firebase";

export const getUserData = async (username) => {
  const userData = await db.collection("stats").doc(username).get();
  return userData;
};

export const sendUserData = async (username, data, distance) => {
  await db
    .collection("userData")
    .doc(username)
    .collection("data")
    .add(data)
    .then(() => {})
    .catch((err) => alert(err.message));
};
