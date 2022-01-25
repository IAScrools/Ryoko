import { db, storage } from "../config/firebase";

export const getUserData = async (username) => {

    const userData = await db.collection('stats').doc(username).get();
    return userData;

};

export const sendUserData = async (username, data) => {

    await db.collection("userData").doc(username).collection('data').add(data).then(() => {
      })
      .catch((err) => alert(err.message));
}
