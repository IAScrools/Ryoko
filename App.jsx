import React, { useState, useEffect } from "react";
import { Dimensions, Appearance } from "react-native";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { EventListener, EventRegister } from "react-native-event-listeners";
import { LogBox } from "react-native";
import { AuthProvider } from "./context/authContext";
import { IsDarkModeOn } from "./context/isDarkModeOn";
import { Router } from "./components/Router/Router";
import { LocationProvider } from "./context/locationContext";

const App = () => {
  const [darkModeOn, setDarkModeOn] = React.useState(false);

  LogBox.ignoreLogs(["Setting a timer"]);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeDarkTheme",
      (data) => {
        setDarkModeOn(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  let [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <IsDarkModeOn.Provider value={darkModeOn}>
      <AuthProvider>
        <LocationProvider>
          <Router />
        </LocationProvider>
      </AuthProvider>
    </IsDarkModeOn.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
