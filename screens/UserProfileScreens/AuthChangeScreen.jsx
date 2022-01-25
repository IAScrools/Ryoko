import React, { useState, useContext } from "react";
import SignComponent from "../../components/SignComponents/SignComponent";
import SignButton from "../../components/SignComponents/SignButton";

import { auth } from "../../config/firebase";
import { useNavigation } from "@react-navigation/core";
import { Alert } from "react-native";
import { IsDarkModeOn } from "../../context/isDarkModeOn";

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Dimensions } from "react-native-web";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";


const { height, width } = Dimensions.get("window");

const AuthChangeScreen = ({route}) => {

  const [authData, setAuthData] = useState("");
  const [authDataConfirm, setAuthDataConfirm] = useState("");

  //TODO
  const darkModeOn = useContext(IsDarkModeOn);  
  
  const navigation = useNavigation();

  const authParam = route.params;

  const fontName = (authParam === 'password' ? "key" : "envelope");
  const secureTextEntry = (authParam === 'password' ? true : false);
  const placeHolder = (authParam === 'password' ? "password" : "example@gmail.com");

  const handleAuthChange = () => {
    if (authParam === 'password') { 
      auth.
      currentUser.updatePassword(authData)
      .then(
        Alert.alert("Message", "Password changed successfully")
      )
      .catch(error => alert(error.message)); 
    } else {
      auth.
      currentUser.updateEmail(authData)
      .then(
        Alert.alert("Message", "Email changed successfully")
      )
      .catch(error => alert(error.message));
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <LinearGradient
        colors={darkModeOn ? ["#000000", "#1f1f1f"] : ["#F7F3E9", "#5EAAA8"]}
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={styles.linearGradient}
    >
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <FontAwesome
                name="arrow-left"
                size={33}
                style={[styles.arrow, darkModeOn ? {color : "grey"} : {color : "black"}]}
            ></FontAwesome>
    </TouchableWithoutFeedback>
        {route.params === 'password' ? 
        <Text style={styles.settingsMainTitle}>
        Change password</Text>: 
        <Text style={styles.settingsMainTitle}>
          Change email </Text>}        
        <View style={styles.changeContainer}>
          {/* <SignComponent
            label="Re-enter your password"
            fontName="key"
            placeHolder="password"
            secureTextEntry={true}
            input={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
          /> */}
          <SignComponent
            label={authParam === 'password' ? "New password" : "New email"}
            fontName={fontName}
            placeHolder={placeHolder}
            secureTextEntry={secureTextEntry}
            input={authData}
            onChangeText={(text) => setAuthData(text)}
          />
           <SignComponent
            label={authParam === 'password' ? "Re-enter new password" : "Re-enter new email"}
            fontName={fontName}
            placeHolder={placeHolder}
            secureTextEntry={secureTextEntry}
            input={authDataConfirm}
            onChangeText={(text) => setAuthDataConfirm(text)}
          />
        </View>
        <View style={styles.footerContainer}>
          <SignButton text="Change" 
          onPress={() => {authDataConfirm === authData ? 
            handleAuthChange() : Alert.alert("Alert", "New data and confirmation data is not the same!")}}/>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default AuthChangeScreen;

const styles = StyleSheet.create({
  settingsMainTitle: {
    alignSelf: "flex-start",
    fontSize: 40,
    top: "8%",
    left: "7%",

    fontFamily: "Raleway_400Regular",
    fontWeight: "bold",
    color: "black"
  },

  arrow: {
    alignSelf: "flex-start",
    top: "7%",
    left: "7%",
  },

  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    height: height,
  },
  changeContainer: {
    flex: 0.9,
    top: "15%",
    justifyContent: "flex-start",
    alignContent: "stretch",
  },
  footerContainer: {
    bottom: "5%",
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
});
