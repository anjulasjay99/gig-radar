import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const SelectEventLocation = () => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
  });
  const [markerPosition, setMarkerPosition] = useState(null);

  const handlePress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setMarkerPosition(coordinate);
    axios
      .get(
        `https://us1.locationiq.com/v1/reverse?key=pk.644aff503b75ed8ebe85e915bf505631&lat=${coordinate.latitude}&lon==${coordinate.longitude}&format=json`
      )
      .then((res) => {
        console.log(
          res.data.address.city,
          res.data.address.hamlet,
          res.data.address.road,
          res.data.address.state_district
        );
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("marker", coordinate);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      foregroundSubscrition = Location.watchPositionAsync(
        {
          // Tracking options
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        (location) => {
          console.log(location);
          let cor = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setPosition(cor);
        }
      );
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={handlePress}
        mapPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        {markerPosition && <Marker coordinate={markerPosition} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SelectEventLocation;
