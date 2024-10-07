import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SelectEventLocation from "./src/screens/SelectEventLocation";
import Home from "./src/screens/Home";
import { ThemeProvider } from "react-native-magnus";
import MainNavigation from "./src/navigation/MainNavigation";
import DrawerNavigation from "./src/navigation/DrawerNavigation";
export default function App() {
  return (
    <ThemeProvider>
      <MainNavigation />
      <StatusBar style="auto" />
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
