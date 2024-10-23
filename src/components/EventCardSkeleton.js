import { View, Text } from "react-native";
import React from "react";
import { Div, Skeleton } from "react-native-magnus";

const EventCardSkeleton = () => {
  return (
    <Div flexDir="col" mt="md" p={5} my={10}>
      <Skeleton.Box h={150} w={"100%"} rounded="xl" />
      <Div mt="md" ml="md" flex={1}>
        <Skeleton.Box mt="sm" />
        <Skeleton.Box mt="sm" w="80%" />
        <Skeleton.Box mt="sm" />
      </Div>
    </Div>
  );
};

export default EventCardSkeleton;
