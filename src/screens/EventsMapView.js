import React, { useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { Button, Text, Div, Icon, Overlay } from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firbase";
import { getLocation } from "../utils/locationService";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const EventsMapView = ({ navigation, route }) => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
  });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setaddress] = useState("");
  const mapRef = useRef(null);
  const [events, setevents] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const markersRef = useRef([]);

  const getEvents = async () => {
    setisLoading(true);

    const userLocation = await getLocation();
    let cor = {
      latitude: userLocation.lat,
      longitude: userLocation.long,
    };
    mapRef.current.animateCamera({
      center: cor,
      zoom: 10, // Zoom level (0 is the farthest, higher values zoom in)
    });
    const snap = await getDocs(collection(db, "events"));

    let arr = [];
    snap.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
    setevents(arr);
    setisLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  /* useEffect(() => {
    if (markersRef.current) {
      markersRef.current.map((marker) => {
        marker.showCallout();
      });
    }
  }, [events, markersRef.current]); */
  return (
    <View style={styles.container}>
      <Overlay visible={isLoading} p="xl">
        <ActivityIndicator color={primaryColor} />
        <Text mt="md" textAlign="center">
          Please wait...
        </Text>
      </Overlay>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        {events.length > 0 &&
          events.map((data, i) => {
            return (
              <Marker
                ref={(el) => (markersRef.current[i] = el)}
                key={i}
                coordinate={{
                  latitude: data.venue.lat,
                  longitude: data.venue.long,
                }}
                onCalloutPress={() => {
                  navigation.navigate("ViewEvent", { data });
                }}
              >
                <Callout>
                  <Text color="blue500">{data.name}</Text>
                </Callout>
              </Marker>
            );
          })}
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

export default EventsMapView;
