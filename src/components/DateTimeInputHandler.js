import { View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Div, Icon, Text } from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";
import moment from "moment";

const DateTimeInputHandler = ({ onPress, mode, value, prefix, width }) => {
  const [dateValue, setdateValue] = useState("");

  useEffect(() => {
    setdateValue(value);
  }, [value]);

  return (
    <Pressable onPress={onPress} style={{ width }}>
      <Div
        row
        justifyContent="space-between"
        bg="white"
        borderColor="gray400"
        px={10}
        py={15}
        borderWidth={1}
        rounded={7}
      >
        <Div row>
          <Text color="gray600" mr={5}>
            {prefix}
          </Text>
          <Text>{dateValue}</Text>
        </Div>
        {mode === "date" ? (
          <Icon
            name="calendar-number-outline"
            color={primaryColor}
            fontFamily="Ionicons"
            fontSize={20}
          />
        ) : (
          <Icon
            name="time-outline"
            color={primaryColor}
            fontFamily="Ionicons"
            fontSize={20}
          />
        )}
      </Div>
    </Pressable>
  );
};

export default DateTimeInputHandler;
