import React, { useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { Button, Text, Div, Icon } from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";

const SelectEventLocation = ({ navigation, route }) => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
  });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setaddress] = useState("");
  const mapRef = useRef(null);

  const handlePress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setMarkerPosition(coordinate);
    setaddress("");
    axios
      .get(
        `https://us1.locationiq.com/v1/reverse?key=pk.644aff503b75ed8ebe85e915bf505631&lat=${coordinate.latitude}&lon==${coordinate.longitude}&format=json`
      )
      .then((res) => {
        const data = res.data;
        setaddress(
          `${data.address.road ? data.address.road : data.address.hamlet}, ${
            data.address.city ? data.address.city : data.address.state_district
          }, ${data.address.country_code.toUpperCase()}`
        );
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("marker", coordinate);
  };

  const onConfirm = () => {
    if (markerPosition && address !== "") {
      route.params.setvenue({
        address,
        lat: markerPosition.latitude,
        long: markerPosition.longitude,
      });

      navigation.goBack();
    }
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
          if (mapRef.current) {
            mapRef.current.fitToCoordinates([cor], {
              edgePadding: { top: 300, bottom: 300, left: 300, right: 300 },
            });
          }
        }
      );
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={handlePress}
        mapPadding={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        {markerPosition && <Marker coordinate={markerPosition} />}
      </MapView>
      {markerPosition && address && (
        <Div style={styles.selectedLocation} shadow="sm">
          <Div row>
            <Icon
              name="location-outline"
              fontFamily="Ionicons"
              fontSize="6xl"
              mr={5}
              color="green500"
            />
            <Text color={primaryTextColor} my={15} px={5} fontSize="lg">
              {address}
            </Text>
          </Div>
          <Button
            mt="sm"
            px="xl"
            py="lg"
            bg={primaryColor}
            color="white"
            underlayColor="purple900"
            rounded="xl"
            w={"100%"}
            onPress={onConfirm}
          >
            <Text color="white" fontSize={16} fontWeight="bold">
              Confirm Location
            </Text>
          </Button>
        </Div>
      )}
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

export default SelectEventLocation;
