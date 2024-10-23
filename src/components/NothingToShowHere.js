import { View } from "react-native";
import React from "react";
import { Div, Icon, Text } from "react-native-magnus";

const NothingToShowHere = () => {
  return (
    <Div col h={200} justifyContent="center">
      <Div row justifyContent="center">
        <Icon
          bg="white"
          p={0}
          name="heart-broken"
          color="gray500"
          fontSize="6xl"
          fontFamily="FontAwesome5"
        />
      </Div>
      <Text textAlign="center" color="gray500" fontSize="3xl" fontWeight="bold">
        Nothing to show here.
      </Text>
    </Div>
  );
};

export default NothingToShowHere;
