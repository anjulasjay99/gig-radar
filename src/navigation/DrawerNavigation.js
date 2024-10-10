import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import YourEvents from "../screens/YourEvents";
import AttendingEvents from "../screens/AttendingEvents";
import EventsMapView from "../screens/EventsMapView";
import Logout from "../screens/Logout";
import CustomDrawer from "../components/CustomDrawer";
import { Icon } from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: "#9f7aea",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShadowVisible: false,
          title: "Near You",
          headerTitleStyle: {
            fontSize: 26,
          },
          drawerIcon: ({ focused, size }) => (
            <Icon
              name={focused ? "location" : "location-outline"}
              color={focused ? primaryColor : "gray700"}
              fontFamily="Ionicons"
              fontSize={20}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="EventsMapView"
        component={EventsMapView}
        options={{
          headerShadowVisible: false,
          title: "Map View",
          headerTitleStyle: {
            fontSize: 26,
          },
          drawerIcon: ({ focused, size }) => (
            <Icon
              fontFamily="FontAwesome"
              name={focused ? "map" : "map-o"}
              color={focused ? primaryColor : "gray700"}
              fontSize={20}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AttendingEvents"
        component={AttendingEvents}
        options={{
          headerShadowVisible: false,
          title: "Attending",
          headerTitleStyle: {
            fontSize: 26,
          },
          drawerIcon: ({ focused, size }) => (
            <Icon
              fontFamily="Ionicons"
              name={focused ? "people" : "people-outline"}
              color={focused ? primaryColor : "gray700"}
              fontSize={20}
            />
          ),
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
          drawerIcon: ({ focused, size }) => (
            <Icon
              fontFamily="Ionicons"
              name={focused ? "today" : "today-outline"}
              color={focused ? primaryColor : "gray700"}
              fontSize={20}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              fontFamily="MaterialIcons"
              name={focused ? "logout" : "logout"}
              color={focused ? primaryColor : "gray700"}
              fontSize={20}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
