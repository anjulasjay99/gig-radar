import { View, Text } from "react-native";
import React from "react";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewEvent from "../screens/NewEvent";
import SelectEventLocation from "../screens/SelectEventLocation";
import DrawerNavigation from "./DrawerNavigation";
import ViewEvent from "../screens/ViewEvent";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewEvent"
          component={NewEvent}
          options={{
            headerShadowVisible: false,
            title: "New Event",
            headerTitleStyle: {
              fontSize: 26,
            },
          }}
        />
        <Stack.Screen
          name="SelectEventLocation"
          component={SelectEventLocation}
          options={{
            headerShadowVisible: false,
            title: "Select Location",
            headerTitleStyle: {
              fontSize: 26,
            },
          }}
        />
        <Stack.Screen
          name="ViewEvent"
          component={ViewEvent}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
