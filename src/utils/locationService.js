import axios from "axios";
import * as Location from "expo-location";

export const getLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return null; // Return null or handle the case of denied permission
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High, // High accuracy for precise location
    });

    let coordinates = {
      lat: location.coords.latitude,
      long: location.coords.longitude,
    };

    return coordinates; // Return the coordinates
  } catch (error) {
    console.error("Error getting location: ", error);
    return null; // Return null in case of error
  }
};

export const getAddress = async (location) => {
  if (location) {
    try {
      const res = await axios.get(
        `https://us1.locationiq.com/v1/reverse?key=pk.644aff503b75ed8ebe85e915bf505631&lat=${location.lat}&lon==${location.long}&format=json`
      );
      return `${
        res.data.address.road ? res.data.address.road : res.data.address.hamlet
      }, ${
        res.data.address.city
          ? res.data.address.city
          : res.data.address.state_district
      }, ${res.data.address.country_code.toUpperCase()}`;
    } catch (err) {
      return null;
    }
  }
  return null;
};
