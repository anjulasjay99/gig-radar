import { View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Text, Div, Icon, Button } from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const SelectLocation = ({ setLocation, navigation }) => {
  const [venue, setvenue] = useState(null);
  const mapRef = useRef(null);

  const setMapReady = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([
        {
          latitude: venue.lat,
          longitude: venue.long,
        },
      ]);
    }
  };

  const onPressSelectVenue = () => {
    navigation.navigate("SelectEventLocation", { setvenue });
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates([
        {
          latitude: venue.lat,
          longitude: venue.long,
        },
      ]);
    }
    setLocation(venue);
  }, [venue]);

  return venue ? (
    <View>
      <MapView
        style={{ width: "100%", height: 100, borderRadius: 10 }}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onMapReady={setMapReady}
      >
        {venue && (
          <Marker coordinate={{ latitude: venue.lat, longitude: venue.long }} />
        )}
      </MapView>
      <Div row>
        <Icon
          name="location-outline"
          fontFamily="Ionicons"
          fontSize="2xl"
          mr={5}
          color="green500"
        />
        <Text color={primaryTextColor} my={15} px={5} fontSize="lg">
          {venue.address}
        </Text>
      </Div>
      <Button
        mt="sm"
        px="xl"
        py="lg"
        borderWidth={1}
        borderColor="green500"
        bg="white"
        color="green500"
        underlayColor="green100"
        rounded="xl"
        w={"100%"}
        onPress={onPressSelectVenue}
      >
        <Icon
          name="location-outline"
          fontFamily="Ionicons"
          fontSize={16}
          mr={5}
          color="green500"
        />
        <Text color="green500" fontSize={16} fontWeight="bold">
          Change Location
        </Text>
      </Button>
    </View>
  ) : (
    <View>
      <Button
        mt="sm"
        px="xl"
        py="lg"
        borderWidth={1}
        borderColor="green500"
        bg="white"
        color="green500"
        underlayColor="green100"
        rounded="xl"
        w={"100%"}
        onPress={onPressSelectVenue}
      >
        <Icon
          name="location-outline"
          fontFamily="Ionicons"
          fontSize={16}
          mr={5}
          color="green500"
        />
        <Text color="green500" fontSize={16} fontWeight="bold">
          Select Location
        </Text>
      </Button>
    </View>
  );
};

export default SelectLocation;
