import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import { useLocation } from "../../context/locationContext";
import * as Location from "expo-location";
import TimerComponent from "./TimerComponent";
import { FontAwesome5 } from "@expo/vector-icons";
import { incrementVisited, sendUserData } from "../../api/LocationApi";
import { useAuth } from "../../context/authContext";
import ModalWithoutButtons from "../Main/ModalWithoutButtons";
import { modal } from "react-native-modal";

const RoutePanel = () => {
  const { currentUser } = useAuth();
  const {
    destinationLocation,
    setShowRoute
  } = useLocation();
  const [counter, setCounter] = useState(0);
  const [meters, setMeters] = useState(0);
  const [previousLocation, setPreviousLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [modal, setModal] = useState(false);
  const calculateMeters = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 111139;
  };

  const calculateDistance = async () => {
    if (previousLocation.latitude === 0 && currentLocation.latitude !== 0) {
      setPreviousLocation(currentLocation);
      return;
    }
    const current = await Location.getCurrentPositionAsync()
      .then((data) => {
        setCurrentLocation(data.coords);
      })
      .catch((err) => alert(err.message));
    const { latitude: x1, longitude: y1 } = previousLocation;
    const { latitude: x2, longitude: y2 } = currentLocation;
    console.log(x1 + " <==== x1");
    console.log(y1 + " <==== y1");
    console.log(x2 + " <==== x2");
    console.log(y2 + " <==== y2");
    // const meter = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 111139;
    const meter = calculateMeters(x1, y1, x2, y2);
    setPreviousLocation(currentLocation);
    console.log(meter);
    setMeters(Math.floor(meters + meter));
    console.log(meters);
    sendUserData(currentUser.displayName, Math.floor(meter));
  };

  const checkDestination = async () => {
    const { latitude: x2, longitude: y2 } = destinationLocation;
    await Location.getCurrentPositionAsync()
      .then(async (data) => {
        const { latitude: x1, longitude: y1 } = data.coords;
        if (calculateMeters(x1, y1, x2, y2) < 20) {
          setModal(true);
          incrementVisited(currentUser.displayName);
        }
      })
      .catch((err) => alert(err.msg));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every one second");
      calculateDistance();
      checkDestination();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <View style={styles.wrapper}>
      <ModalWithoutButtons
        isVisible={modal}
        title="Congratulations! 🥳"
        description="You have reached the location!"
        onPress={() => {
          setShowRoute(false);
          setModal(!modal);
        }}
      />
      <View style={{ ...styles.distanceWrapper }}>
        <Text style={{ ...styles.info, fontSize: 18 }}>Distance:</Text>
        <View style={{ ...styles.distanceWrapper, flexDirection: "row" }}>
          <FontAwesome5 name="running" size={38} />
          <Text style={{ ...styles.info, top: -8, marginHorizontal: 10 }}>
            {meters} m
          </Text>
        </View>
      </View>
      <TimerComponent />
    </View>
  );
};

export default RoutePanel;

const styles = StyleSheet.create({
  wrapper: {
    width: "95%",
    height: 120,
    backgroundColor: "white",
    elevation: 18,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  info: {
    fontFamily: "Raleway_400Regular",
    fontSize: 38,
  },
  distanceWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    width: 150,
    // width: 100
  },
});
