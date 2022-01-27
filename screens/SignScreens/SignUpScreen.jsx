import React, { useState } from "react";
import SignComponent from "../../components/SignComponents/SignComponent";
import SignButton from "../../components/SignComponents/SignButton";
import { auth } from "../../config/firebase";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Image
} from "react-native";
import { Dimensions } from "react-native-web";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Raleway_400Regular } from "@expo-google-fonts/raleway";
import ExternalSignButton from "../../components/SignComponents/ExternalSignButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/authContext";

const { height, width } = Dimensions.get("window");

const SignUpScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();

  const { googleLogIn, signUp } = useAuth();

  return (
    <ScrollView onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#F7F3E9", "#5EAAA8"]}
        useAngle={true}
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={styles.linearGradient}
      >
        {/* <Image source={{uri: }}>

        </Image> */}
        <TouchableWithoutFeedback>
          <FontAwesome
            name="arrow-left"
            size={30}
            style={styles.arrow}
            onPress={() => navigation.navigate("Sign In")}
          ></FontAwesome>
        </TouchableWithoutFeedback>
        <View style={styles.signUpContainter}>
          <SignComponent
            label="Login"
            fontName="user"
            placeHolder="UserLogin"
            secureTextEntry={false}
            onChangeText={(text) => setLogin(text)}
          />
          <SignComponent
            label="Email"
            fontName="envelope"
            placeHolder="example@gmail.com"
            secureTextEntry={false}
            onChangeText={(text) => setEmail(text)}
          />
          <SignComponent
            label="Password"
            fontName="key"
            placeHolder="password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <SignComponent
            label="Confirm password"
            fontName="key"
            placeHolder="password"
            secureTextEntry={true}
            onChangeText={(text) => setPasswordConfirm(text)}
          />
        </View>
        <View style={styles.footerContainer}>
          <SignButton
            text="Sign Up"
            onPress={() => {
              password === passwordConfirm
                ? signUp(email, password, login)
                : Alert.alert("Alert", "Passwords don't match!");
            }}
          />
          <Text style={{ fontFamily: "Raleway_400Regular", fontSize: 19 }}>
            - or sign up with -
          </Text>
        </View>
        <View style={styles.otherOptionsContainer}>
          <ExternalSignButton
            name="google"
            onPress={googleLogIn}
            colors={["#F7F3E9", "#5EAAA8"]}
            text="Sign Up with Google"
          />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  arrow: {
    alignSelf: "flex-start",
    top: "5%",
    left: "6%",
  },
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    height: 700
  },
  signUpContainter: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "stretch",
    top: "7%",
  },
  footerContainer: {
    // flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    top: 35,
  },
  otherOptionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    top: 20,
  },
});
