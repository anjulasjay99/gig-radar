import { StyleSheet, Dimensions, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 20,
    flex: 1,
  },
});
