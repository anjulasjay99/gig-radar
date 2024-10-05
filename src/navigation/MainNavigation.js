import { View, Text } from "react-native";
import React from "react";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewEvent from "../screens/NewEvent";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="NewEvent" component={NewEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
