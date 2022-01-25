import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import GoogleMap from "../../components/Map/GoogleMap";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { IsDarkModeOn } from "../../context/isDarkModeOn";
import { useAuth } from "../../context/authContext";
import { useLocation } from "../../context/locationContext";
import RoutePanel from "../../components/Map/RoutePanel";
import Modal from "react-native-modal";
import ModalWithButtons from "../../components/Main/ModalWithButtons";

const { height, width } = Dimensions.get("window");

const UserProfileScreen = (props) => {
  const { showRoute, setShowRoute } = useLocation();

  const [switchValue, setSwitchValue] = useState(false);
  const [modal, setModal] = useState(false);

  const navigation = useNavigation();
  const darkMode = useContext(IsDarkModeOn);
  const { currentUser } = useAuth();

  return (
    <View style={styles.container}>
      {/* <ModalWithButtons
        isVisible={modal}
        title="Attention! 😵"
        description="Are you sure you want to cancel this tour?"
        confirm={() => {
          setShowRoute(false);
          setModal(false);
        }}
        cancel={() => {
          setModal(false);
        }}
      /> */}
      <Modal isVisible={modal}>
        <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.modal}>
          <Text
            style={{
              fontFamily: "Raleway_700Bold",
              fontSize: 30,
              textAlign: "center",
              padding: 3,
            }}
          > Attention! 😵</Text>
          <Text
            style={{
              fontFamily: "Raleway_400Regular",
              fontSize: 18,
              textAlign: "center",
              paddingHorizontal: 16,
              paddingVertical: 5,
            }}
          >
            Are you sure you want to cancel this tour? </Text>
          <View style={styles.modalButtonWrapper}>
            <TouchableOpacity
              onPress={() => {
                setShowRoute(false);
                setModal(false);
              }}
            >
              <View style={styles.modalButton}>
                <FontAwesome5 name="check" size={70} color="green" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModal(false);
              }}
            >
              <View style={styles.modalButton}>
                <FontAwesome5 name="times" size={70} color="#cc0000" />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.modalButtonWrapper,
              padding: 0,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Raleway_400Regular",
                fontSize: 20,
                marginHorizontal: 60,
                top: -12,
              }}
            >
              Yes
            </Text>
            <Text
              style={{
                fontFamily: "Raleway_400Regular",
                fontSize: 20,
                marginHorizontal: 65,
                top: -12,
              }}
            >
              No
            </Text>
          </View>
        </LinearGradient>
      </Modal>
      <GoogleMap darkMode={darkMode} />
      {!showRoute ? (
        <LinearGradient
          colors={darkMode ? ["#181818", "#181818"] : ["#FFFFFF", "#FFFFFF"]}
          style={styles.footer}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Activity");
            }}
            style={{ left: "38%" }}
          >
            <View style={styles.footerBtn}>
              <Image
                source={require("../../assets/images/pulse.png")}
                style={{ height: 50, width: 50 }}
                tintColor={darkMode ? "#B3B3B3" : "black"}
              />
              <Text
                style={darkMode ? { color: "#B3B3B3" } : { color: "black" }}
              >
                Activity
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Add Location")}
          >
            <LinearGradient
              colors={["#A3D2CA", "#5EAAA8"]}
              style={styles.addBtn}
            >
              <FontAwesome5
                name="plus"
                size={55}
                style={{ left: "26%" }}
              ></FontAwesome5>
            </LinearGradient>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            style={{ left: "-30%" }}
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={styles.footerBtn}>
              <Image
                source={require("../../assets/images/cog.png")}
                style={{ height: 50, width: 50 }}
                tintColor={darkMode ? "#B3B3B3" : "black"}
              ></Image>
              <Text
                style={darkMode ? { color: "#B3B3B3" } : { color: "black" }}
              >
                Settings
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <>
          <LinearGradient
            colors={["#000000", "#000000"]}
            style={styles.cancelRoute}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setModal(true);
              }}
            >
              <FontAwesome name="remove" size={46} color="white" />
            </TouchableWithoutFeedback>
          </LinearGradient>
          <RoutePanel />
        </>
      )}
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    width: width * 1.06,
    height: "12%",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 1,
    shadowRadius: 12,

    elevation: 24,
  },
  footerBtn: {
    top: "10%",
    tintColor: "white",
    fontFamily: "Raleway_400Regular",
  },
  addBtn: {
    height: 100,
    width: 100,
    borderRadius: 360,
    top: "-6%",
    textAlign: "center",
    justifyContent: "center",
    elevation: 16,
  },
  modal: {
    // flex: 0.42,
    justifyContent: "center",
    alignItems: "center",
    // width: 350,
    height: 300,
    borderRadius: 40,
    backgroundColor: "white",
  },
  modalButtonWrapper: {
    flexDirection: "row",
    padding: 14,
  },
  modalButton: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    marginHorizontal: 30,
    elevation: 17,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  // modalView: {
  //   width: 340,
  //   height: 450,
  //   borderRadius: 45,
  //   backgroundColor: "black",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  title: {
    fontFamily: "Raleway_700Bold",
    fontSize: 48,
    paddingTop: 5,
    paddingBottom: 35,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 360,
  },
  description: {
    fontFamily: "Raleway_400Regular",
    fontSize: 17,
    padding: 25,
  },
  cancelRoute: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
    position: "absolute",
    top: 40,
    left: 340,
  },
});
