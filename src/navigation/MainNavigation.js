import { View, Text } from "react-native";
import React from "react";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewEvent from "../screens/NewEvent";
import SelectEventLocation from "../screens/SelectEventLocation";
import DrawerNavigation from "./DrawerNavigation";
import ViewEvent from "../screens/ViewEvent";
import EditEvent from "../screens/EditEvent";
import ShowOnMap from "../screens/ShowOnMap";
import { useSelector } from "react-redux";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const user = useSelector((state) => state.user);
  return (
    <NavigationContainer>
      {user ? (
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
          <Stack.Screen
            name="EditEvent"
            component={EditEvent}
            options={{
              headerShadowVisible: false,
              title: "Edit Event",
              headerTitleStyle: {
                fontSize: 26,
              },
            }}
          />
          <Stack.Screen
            name="ShowOnMap"
            component={ShowOnMap}
            options={{
              headerShadowVisible: false,
              title: "Map View",
              headerTitleStyle: {
                fontSize: 26,
              },
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShadowVisible: false,
              title: "",
              headerTitleStyle: {
                fontSize: 26,
              },
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;
