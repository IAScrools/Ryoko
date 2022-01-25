import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocation } from "../../context/locationContext";
import { getUserData } from "../../api/UserApi";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";

export default ActivityScreen = () => {
  const navigation = useNavigation();
  const { getRoute } = useLocation();
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = getUserData(currentUser.displayName)
      .then((data) => {
        setUserData(data.data());
      })
      .catch((err) => alert(err.msg));
  }, []);

  //   const { username } = route.params;

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
            name="arrow-left"
            size={35}
            style={{ left: "-40%", paddingTop: 40, paddingBottom: 5 }}
          />
        </TouchableWithoutFeedback>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: userData.userAvatar,
            }}
          ></Image>
          <TouchableWithoutFeedback>
            <View style={styles.addBtn}>
              <FontAwesome name="plus" size={48}></FontAwesome>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.userInfoWrapper}></View>
        <Text style={styles.title}>{currentUser.displayName}</Text>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoBox}>
            <FontAwesome5
              style={{ ...styles.icon, color: "green" }}
              name="running"
            ></FontAwesome5>
            <Text style={styles.infoText}>Distance: {userData.distance} m</Text>
          </View>
          <View style={styles.userInfoBox}>
            <FontAwesome5
              style={{ ...styles.icon, color: "darkorange" }}
              name="clock"
            ></FontAwesome5>
            <Text style={styles.infoText}>
              Total time: {userData.totalTime} s
            </Text>
          </View>
          <View style={styles.userInfoBox}>
            <FontAwesome5
              style={{ ...styles.icon, color: "black" }}
              name="search-location"
            ></FontAwesome5>
            <Text style={styles.infoText}>
              Location visited: {userData.visitedPlaces}
            </Text>
          </View>
          <View style={styles.userInfoBox}>
            <FontAwesome5
              style={{ ...styles.icon, color: "brown" }}
              name="map-pin"
            ></FontAwesome5>
            <Text style={styles.infoText}>
              Location added: {userData.addedPlaces}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  title: {
    fontFamily: "Raleway_700Bold",
    fontSize: 48,
    paddingTop: 5,
    paddingBottom: 35,
    paddingHorizontal: 30,
    textAlign: "center",
  },
  image: {
    width: 240,
    height: 240,
    borderRadius: 360,
    borderWidth: 7,
    borderColor: "white",
  },
  addBtn: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
    position: "absolute",
    top: 180,
    left: 150,
  },
  userInfoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  userInfoBox: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 17,
    borderRadius: 50,
    width: "90%",
    height: 80,
    margin: 12,
  },
  icon: {
    fontSize: 40,
    padding: 20,
    position: "absolute",
    left: "2%",
  },
  infoText: {
    fontFamily: "Raleway_400Regular",
    fontSize: 25,
    padding: 20,
    position: "absolute",
  },
});
