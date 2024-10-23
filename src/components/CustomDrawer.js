import { View, Image, StyleSheet, StatusBar } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Div, Text } from "react-native-magnus";
import { primaryColor } from "../theme/variables";
import { useSelector } from "react-redux";

const CustomDrawer = (props) => {
  const user = useSelector((state) => state.user);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContainer}
      >
        <Div
          col
          bg={primaryColor}
          justifyContent="center"
          alignItems="center"
          py={20}
          pt={StatusBar.currentHeight + 20}
        >
          <Image
            style={styles.image}
            source={require("../../assets/profile.png")}
          />
          <Text color="white" fontSize="2xl" fontWeight="bold">
            {user.name}
          </Text>
          <Text color="#cbd5e0">{user.email}</Text>
        </Div>
        <View style={{ padding: 20 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  drawerContainer: {
    backgroundColor: "white",
    marginTop: 0,
    paddingTop: 0,
  },
});

export default CustomDrawer;
