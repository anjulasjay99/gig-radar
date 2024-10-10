import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SelectEventLocation from "./src/screens/SelectEventLocation";
import Home from "./src/screens/Home";
import { ThemeProvider } from "react-native-magnus";
import MainNavigation from "./src/navigation/MainNavigation";
import DrawerNavigation from "./src/navigation/DrawerNavigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <MainNavigation />
        <StatusBar style="auto" />
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
