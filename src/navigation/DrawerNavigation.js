import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import YourEvents from "../screens/YourEvents";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShadowVisible: false,
          title: "Near You",
          headerTitleStyle: {
            fontSize: 26,
          },
        }}
      />
      <Drawer.Screen
        name="YourEvents"
        component={YourEvents}
        options={{
          headerShadowVisible: false,
          title: "Your Events",
          headerTitleStyle: {
            fontSize: 26,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
