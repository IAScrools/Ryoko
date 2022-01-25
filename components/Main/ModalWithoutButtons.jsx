import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";


const ModalWithoutButtons = (props) => {
  return (
    <Modal isVisible={props.isVisible} animationIn="bounceIn">
      <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.modal}>
        <Text
          style={{
            fontFamily: "Raleway_700Bold",
            fontSize: 30,
            textAlign: "center",
            padding: 3,
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            fontFamily: "Raleway_400Regular",
            fontSize: 18,
            textAlign: "center",
            paddingHorizontal: 16,
            paddingVertical: 5,
          }}
        >
          {props.description}
        </Text>
        <View
          style={{
            ...styles.modalButtonWrapper,
            padding: 0,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <TouchableOpacity onPress={props.onPress}>
              <LinearGradient style={styles.okBttn} colors={["#A3D2CA", "#5EAAA8"]}>
                  <Text style={styles.okBttnText}>Ok</Text>
              </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default ModalWithoutButtons;

const styles = StyleSheet.create({
  modal: {
    // flex: 0.42,
    justifyContent: "center",
    alignItems: "center",
    // width: 350,
    height: 240,
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
    borderRadius: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  okBttn: {
      padding: 8,
      margin: 20,
    //   width: 160,
    //   height: 80,
      borderRadius: 120
  },
  okBttnText: {
      fontFamily: "Raleway_700Bold",
      fontSize: 24,
    //   padding: 10,
      paddingHorizontal: 60
      
      
  }
});
