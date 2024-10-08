import React, { useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { Button, Text, Div, Icon } from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";

const ShowOnMap = ({ navigation, route }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [location, setlocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateCamera({
        center: { latitude: location.lat, longitude: location.long },
        zoom: 15, // Zoom level (0 is the farthest, higher values zoom in)
      });

      setMarkerPosition({
        latitude: location.lat,
        longitude: location.long,
      });
    }
  }, [location, mapRef.current]);

  useEffect(() => {
    setlocation(route.params.location);
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        {markerPosition && <Marker coordinate={markerPosition} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  selectedLocation: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default ShowOnMap;
