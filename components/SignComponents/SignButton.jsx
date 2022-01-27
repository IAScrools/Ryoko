import { Raleway_700Bold } from "@expo-google-fonts/raleway";
import React, {useContext} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native-web";
import { FontAwesome } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const SignButton = (props) => {

  
  return (
    <TouchableOpacity style={styles.signButton} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
      <FontAwesome
        name="angle-right"
        size={0.48 * height}
        style={{ position: "absolute", top: "25%", left: "8%", color: "white" }}
      />
    </TouchableOpacity>
  );
};

export default SignButton;

const styles = StyleSheet.create({
  signButton: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "black",
    borderRadius: 360,
    height: 61,
    width: 180,
    top: 25
  },
  text: {
    color: "white",
    fontSize: 28,
    fontFamily: "Raleway_700Bold",
    top: "-6%",
    left: "22%",
  },
});
