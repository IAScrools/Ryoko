import { db, storage } from "../config/firebase";
import * as firebase from "firebase";
import * as Location from "expo-location";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

export const getComments = async (id) => {
  const comments = await db.collection("comments").where("id", "==", id).get();
  const data = comments.docs.map((doc) => ({ ...doc.data() }));
  return data;
};

export const getLocations = async () => {
  const locations = await db.collection("markers").get();
  const data = locations.docs.map((doc) => ({ ...doc.data() }));
  return data;
};

export const addLocations = async (title, description, uri, currentUser) => {
  if (title === "" || description === "") {
    alert("Title or description is empty!");
    return false;
  }

  if (!uri) {
    alert("Photo must be taken!");
    return false;
  }

  console.log(currentUser);
  const markerId = uuid.v1();
  const location = await Location.getCurrentPositionAsync({});

  await uploadImage(uri, markerId)
    .then(() => console.log("Image uploaded"))
    .catch((err) => alert(err.message));
  const imageRef = await storage.ref().child("images").child(markerId);
  const image = await imageRef.getDownloadURL();

  const marker = {
    id: markerId,
    title: title,
    description: description,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    imageUrl: image,
    creatorNickname: currentUser.displayName,
    creatorAvatar: currentUser.photoURL,
  };

  const locations = await db.collection("markers");

  await locations
    .add(marker)
    .then(() => {
      db.collection("stats")
        .doc(currentUser.displayName)
        .update({ addedPlaces: firebase.firestore.FieldValue.increment(1) });
    })
    .catch((err) => {
      alert(err.message);
      return false;
    });
    return true;
};

export const getRates = (id) => {};

export const sendUserData = async (username, meters) => {
  // this can be written in one line function i think
  await db
    .collection("stats")
    .doc(username)
    .update({
      distance: firebase.firestore.FieldValue.increment(meters),
      totalTime: firebase.firestore.FieldValue.increment(5),
    });
};

export const incrementVisited = async (username) => {
  await db
    .collection("stats")
    .doc(username)
    .update({
      visitedPlaces: firebase.firestore.FieldValue.increment(1),
    });
};

const uploadImage = async (uri, imageName) => {
  console.log(uri);

  const image = await fetch(uri);
  const blob = await image.blob();

  const images = storage.ref().child("images/" + imageName);
  return images.put(blob);
};
