import React from "react";
import MainNavigation from "./MainNavigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShadowVisible: false,
          title: "Near Me",
          headerTitleStyle: {
            fontSize: 26,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
