import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";

export const CustomMarker = (props) => {
  return (
    <View>
      <FontAwesome size={52} name="map-marker" color="#5EAAA8"></FontAwesome>
      
    </View>
  );
};
