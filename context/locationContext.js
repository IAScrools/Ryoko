import { getCurrentPositionAsync } from "expo-location";
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import { db } from "../config/firebase";
import { sendUserData } from "../api/UserApi";
import { useAuth } from "./authContext";

const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }) => {
  const [originLocation, setOriginLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [showRoute, setShowRoute] = useState(false);
  const [currentAppDistance, setCurrentAppDistance ] = useState(0);
  const {currentUser } = useAuth();

  const getRoute = async (destination) => {
    await Location.getCurrentPositionAsync({}).then((data) => {
      const { latitude, longitude } = data.coords;
      setOriginLocation({ latitude: latitude, longitude: longitude });
      setDestinationLocation({ ...destination });
      setShowRoute(true);
    });
  };

  const calculateMeters = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 111139;
  };
  useEffect(() => {
    setDestinationLocation(destinationLocation);
    setShowRoute(showRoute);
  }, [showRoute]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every one second");
      if(currentUser == null) {
        return;
      }
      const current = Location.getCurrentPositionAsync()
        .then((data) => {
          const currentDate = new Date();
          const date = currentDate.toUTCString();

          console.log(date);
          const { latitude: x, longitude: y } = data.coords;
          const info = {
            latitude: x,
            longitude: y,
            timestamp: date,
          };
          sendUserData(currentUser.displayName, info);
        })
        .catch((err) => alert(err.message));
    }, 5000);
    return () => clearInterval(interval);
  });

  const values = {
    originLocation,
    destinationLocation,
    showRoute,
    setShowRoute,
    getRoute,
    currentAppDistance,
    setCurrentAppDistance
  };

  return (
    <LocationContext.Provider value={values}>
      {children}
    </LocationContext.Provider>
  );
};
