import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocation } from "../../context/locationContext";

export default LocationInfoScreen = ({ route }) => {
  const navigation = useNavigation();
  const {getRoute} = useLocation();

  const { imageUrl, title, description, creatorNickname, creatorAvatar, latitude, longitude, id } =
    route.params;

  return (
    <ScrollView>
      <LinearGradient
        colors={["#F7F3E9", "#5EAAA8"]}
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={styles.linearGradient}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome
            name="remove"
            size={35}
            style={{ left: "40%", paddingTop: 40, paddingBottom: 5 }}
          />
        </TouchableWithoutFeedback>
        <View style={styles.userWrapper}>
          <Image
            style={styles.avatar}
            source={{
              uri: creatorAvatar ? creatorAvatar : "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png"
            }}
          ></Image>
          <Text style={styles.nickname}>{creatorNickname}</Text>
        </View>
        <View></View>
        <Text style={styles.title}>{title}</Text>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          ></Image>
        </View>
        <View
          style={{
            width: "75%",
            borderBottomColor: "#242526",
            borderBottomWidth: 1.2,
          }}
        >
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.thumbsWrapper}>
          <FontAwesome
            style={styles.thumbs}
            size={40}
            name="thumbs-up"
          ></FontAwesome>
          <FontAwesome
            style={styles.thumbs}
            size={40}
            name="thumbs-down"
          ></FontAwesome>
        </View>
        <View style={styles.thumbsWrapper}>
          <Text
            style={{
              fontSize: 20,
              marginRight: "8%",
              textAlign: "center",
            }}
          >
            100
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: "6%",
              textAlign: "center",
            }}
          >
            1
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Show Comments Screen", {
                imageUrl: imageUrl,
                title: title,
                id: id
              });
            }}
            style={{ paddingHorizontal: 43, paddingTop: 12 }}
          >
            <View style={styles.button}>
              <FontAwesome name="list" style={styles.buttonFont}></FontAwesome>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              getRoute({latitude: latitude, longitude: longitude})
              navigation.navigate('User Profile');
            }}
            style={{ paddingHorizontal: 43, paddingTop: 12 }}
          >
            <View style={styles.button}>
              <FontAwesome
                name="paper-plane"
                style={styles.buttonFont}
              ></FontAwesome>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.labelWrapper}>
          <Text style={{ ...styles.buttonLabel, left: -70 }}>
            Show comments
          </Text>
          <Text style={{ ...styles.buttonLabel, left: 6 }}>Go!</Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  thumbsWrapper: {
    flexDirection: "row",
    paddingTop: 10,
  },
  thumbs: {
    marginHorizontal: 20,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120,
  },
  title: {
    fontFamily: "Raleway_700Bold",
    fontSize: 48,
    paddingTop: 5,
    paddingBottom: 35,
    paddingHorizontal: 30,
    textAlign: "center"
  },
  image: {
    width: 190,
    height: 190,
    borderRadius: 360,
    borderWidth: 3,
    borderColor: "white",
  },
  description: {
    fontFamily: "Raleway_400Regular",
    fontSize: 22,
    padding: 22,
  },
  userWrapper: { flexDirection: "row" },
  avatar: { width: 43, height: 43, borderRadius: 360 },
  nickname: {
    fontFamily: "Raleway_700Bold",
    fontSize: 19,
    textAlign: "center",
    paddingHorizontal: 15,
    top: 5,
  },

  buttonWrapper: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: "black",
    borderRadius: 360,
  },
  buttonFont: {
    color: "white",
    fontSize: 45,
    top: "30%",
    left: "26%",
  },
  labelWrapper: {
    flexDirection: "row",
    padding: 25,
  },
  buttonLabel: {
    fontFamily: "Raleway_400Regular",
    fontSize: 22,
    top: -16,
  },
});
