import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getComments } from "../../api/LocationApi";

const ShowCommentsScreen = ({ route }) => {
  const { imageUrl, title, id } = route.params;
  const [comments, setComments] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getComments(id)
      .then((data) => setComments(data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={["#F7F3E9", "#5EAAA8"]} style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <FontAwesome style={styles.arrow} name="arrow-left"></FontAwesome>
        </TouchableWithoutFeedback>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.locationImage}
        ></Image>
        <Text style={styles.locationTitle}>{title}</Text>
      </LinearGradient>
      <ScrollView>
        <View style={styles.commentsWrapper}>
          { comments.map((comment) => (
            <View style={styles.commentBox}>
              <FontAwesome
                  name={comment.isPositive ? "thumbs-up" : "thumbs-down"}
                  style={comment.isPositive ? styles.thumbUp : styles.thumbDown}
                ></FontAwesome>
              <View
                colors={["#F7F3E9", "#5EAAA8"]}
                style={styles.commentHeader}
              >
                <Image
                  style={styles.avatar}
                  source={{
                    uri: comment.userAvatar,
                  }}
                ></Image>
                <Text style={styles.nickname}>{comment.user}</Text>
              </View>
              <Image
                style={styles.photo}
                source={{
                  uri: comment.imageURL,
                }}
              ></Image>
              <View style={styles.opinionWrapper}>
                <Text style={styles.opinion}>
                  {comment.comment}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ShowCommentsScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: "3%",
  },
  arrow: {
    fontSize: 34,
    left: -10,
    top: 12,
  },
  locationImage: {
    width: 55,
    height: 55,
    borderRadius: 360,
    borderColor: "white",
    borderWidth: 1.75,
    marginTop: 25,
    marginRight: 10,
    marginLeft: 15,
  },
  locationTitle: {
    fontFamily: "Raleway_700Bold",
    fontSize: 18,
    marginTop: 25,
  },
  commentsWrapper: {
    top: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  commentBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "87%",
    marginVertical: "4%",
    borderRadius: 40,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 10,
  },
  commentHeader: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 13,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 360,
    //   borderWidth: 1,
    //   borderColor: "black",
    left: "-50%",
  },
  nickname: {
    fontFamily: "Raleway_700Bold",
    fontSize: 23,
    top: "-1%",
    left: "-30%",
  },
  thumbUp: {
    fontSize: 35,
    color: "green",
    top: "3%",
    position: "absolute",
    left: 300,
  },
  thumbDown: {
    fontSize: 35,
    color: "red",
    top: "6%",
    left: 300,
    position: "absolute"
  },
  photo: {
    width: "76%",
    height: 160,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "black",
  },
  opinionWrapper: {
    width: "76%",
    borderTopWidth: 1,
    borderColor: "grey",
  },
  opinion: {
    fontFamily: "Raleway_400Regular",
    fontSize: 15,
    padding: 10,
  },
});
