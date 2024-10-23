import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/actions";
import { useIsFocused } from "@react-navigation/native";

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const confirmLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Yes",
          onPress: () => logout(),
        },
        {
          text: "No",
          onPress: () => navigation.goBack(),
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const logout = () => {
    dispatch(clearState());
  };

  useEffect(() => {
    isFocused && confirmLogout();
  }, [isFocused]);

  return <View></View>;
};

export default Logout;
