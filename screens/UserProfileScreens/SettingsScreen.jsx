import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import React, { useState, useEffect, ReactPropTypes, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import SettingsComponent from "../../components/SettingsComponents/SettingsComponent";
import { Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../config/firebase";
import { Alert } from "react-native";
import { IsDarkModeOn } from '../../context/isDarkModeOn';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { EventRegister } from "react-native-event-listeners";

const { height, width } = Dimensions.get("window");

const SettingsScreen = (props) => {
  const navigation = useNavigation();
  // const [theme, setTheme] = useState(Appearance.getColorScheme())

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const darkModeOn = useContext(IsDarkModeOn);  

  const darkModeOnOff = () => {
    setIsSwitchOn(!isSwitchOn);
    EventRegister.emit("changeDarkTheme", (!isSwitchOn));
  }


  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <LinearGradient
        colors={["#F7F3E9", "#5EAAA8"]}
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={styles.linearGradient}
      >
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <FontAwesome
          name="arrow-left"
          size={33}
          style={styles.arrow}
        ></FontAwesome>
      </TouchableWithoutFeedback>
      <Text style={styles.settingsMainTitle}>
        Settings</Text>
      <View style={styles.settingsComponentsStyle}>
        <SettingsComponent
          iconName={"user"}
          subtitleTextContent={"Account"}
          onPressIconOne={() => {
            navigation.navigate("Auth Change", "email");
          }}
          onPressIconTwo={() => {
            navigation.navigate("Auth Change", "password");
          }}
          optionTextContentOne={"Change email"}
          optionTextContentTwo={"Change password"}
        />

        {/* <SettingsComponent iconName={"volume-up"} subtitleTextContent={"Sounds and vibration"} 

        isSwitchOne={true} isSwitchTwo={true}
        onPressIconOne={null} onPressIconTwo={null}
        optionTextContentOne={"App sounds"} optionTextContentTwo={"App vibration"} /> */}

        <SettingsComponent
          iconName={"question"}
          subtitleTextContent={"Miscellaneous"}
          isSwitchOnOne={isSwitchOn}
          isSwitchOne={true}
          onToggleSwitchOne={darkModeOnOff}
          onPressIconTwo={logOut}
          optionTextContentOne={"Dark Mode"}
          optionTextContentTwo={"Logout"}
        />
      </View>
    </LinearGradient>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    height: height,
  },

  arrow: {
    alignSelf: "flex-start",
    top: "7%",
    left: "7%",
  },

  settingsMainTitle: {
    alignSelf: "flex-start",
    fontSize: 48,
    top: "7%",
    left: "7%",

    fontFamily: "Raleway_400Regular",
    fontWeight: "bold",
    color: "black"
  },

  settingsComponentsStyle: {
    justifyContent: "center",
    alignSelf: "flex-start",
    top: "9%",
    left: "7%",
  },
});
