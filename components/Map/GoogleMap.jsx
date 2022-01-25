import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { MapStyleLight, MapStyleDark } from "./mapStyles";
import * as Location from "expo-location";
import { CustomMarker } from "./CustomMarker";
import { getLocations } from "../../api/LocationApi";
import { Callout } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../context/authContext";
import { useNavigation } from "@react-navigation/core";
import { IsDarkModeOn } from "../../context/isDarkModeOn";
import MapViewDirections from "react-native-maps-directions";
import { useIsFocused } from "@react-navigation/native";
import { useLocation } from "../../context/locationContext";

const GoogleMap = ({ route }, props) => {
  const { showRoute, originLocation, destinationLocation } = useLocation();

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markers, setMarkers] = useState([]);

  const isFocused = useIsFocused();

  const { signOut } = useAuth();

  const navigation = useNavigation();
  const darkMode = useContext(IsDarkModeOn);

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        signOut();
        navigation.navigate("Sign In");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    };
    getPermission();
    console.log("Pożeram Ci kase skurwysynie haha");
    getLocations()
      .then((data) => setMarkers(data))
      .catch((err) => alert(err.message));
  }, [/*isFocused*/]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{ ...location }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        userLocationUpdateInterval={100}
        loadingEnabled={true}
        customMapStyle={darkMode ? MapStyleDark : MapStyleLight}
      >
        {markers.map((marker) => (
          <Marker
            description={marker.description}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            key={marker.id}
          >
            <CustomMarker />
              <Callout
                onPress={() => {
                  navigation.navigate("Location Info", {
                    id: marker.id,
                    title: marker.title,
                    description: marker.description,
                    imageUrl: marker.imageUrl,
                    creatorNickname: marker.creatorNickname,
                    creatorAvatar: marker.creatorAvatar,
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  });
                }}
                tooltip
              >
                <View>
                  <LinearGradient
                    colors={["#A3D2CA", "#5EAAA8"]}
                    style={styles.callout}
                  >
                    <Text style={styles.name}>{marker.title}</Text>
                    <Text
                      style={{
                        justifyContent: "center",
                        position: "absolute",
                        left: "10%",
                      }}
                    >
                      <Image
                        style={styles.image}
                        source={{ uri: marker.imageUrl }}
                        resizeMode="cover"
                      />
                    </Text>
                  </LinearGradient>
                </View>
              </Callout>
            </Marker>
        ))}
        {showRoute && (
          <MapViewDirections
            lineDashPattern={[1]}
            apikey={"AIzaSyB0tUBCVgT7YToHmhTJqVsYvMNecIoAo78"}
            origin={{ ...originLocation }}
            destination={{ ...destinationLocation }}
            strokeWidth={4}
            strokeColor={darkMode ? "lightblue" :"brown"}
          ></MapViewDirections>
        )}
      </MapView>
    </View>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 500,
    marginBottom: 0,
  },
  callout: {
    // left: "25%",
    flexDirection: "column",
    alignSelf: "flex-start",
    borderRadius: 16,
    width: 200,
    height: 140,
  },
  name: {
    fontSize: 16,
    fontFamily: "Raleway_700Bold",
    textAlign: "center",
    flexDirection: "row",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "grey",

    // top: 10
  },
  // Character image
  image: {
    width: 160,
    height: 130,
    borderColor: "white",
    borderWidth: 2,
    // left: 25
    paddingBottom: 20,
  },
});
