import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Button, Div, Icon, Image, Tag, Text } from "react-native-magnus";
import { primaryTextColor } from "../theme/variables";
import ImageView from "react-native-image-viewing";
import moment from "moment";

function ViewEvent({ route }) {
  const [event, setevent] = useState(null);
  const [showImageViewer, setshowImageViewer] = useState(false);

  useEffect(() => {
    setevent(route.params.data);
  }, []);

  return (
    <View style={styles.container}>
      {event && (
        <Div>
          <Div h={220} w={"100%"}>
            <Pressable onPress={() => setshowImageViewer(true)}>
              <Image h={220} w={"100%"} source={{ uri: event.poster }} />
            </Pressable>

            <ImageView
              images={[{ uri: event.poster }]}
              imageIndex={0}
              visible={showImageViewer}
              onRequestClose={() => setshowImageViewer(false)}
            />

            <Div style={styles.roundedDiv}></Div>
          </Div>
          <Div px={20}>
            <Tag bg="green500">
              <Icon
                name="people-outline"
                fontFamily="Ionicons"
                fontSize={14}
                mr={5}
                color="white"
              />
              <Text color="white" fontSize={12}>
                {event.attending} attending
              </Text>
            </Tag>
            <Div mt={15}>
              <Text fontSize="5xl" fontWeight="bold" color={primaryTextColor}>
                {event.name}
              </Text>
            </Div>
            <Div row mt={15}>
              <Icon
                name="ticket-outline"
                fontFamily="Ionicons"
                fontSize={16}
                mr={10}
                color="gray700"
                fontWeight="bold"
              />
              <Text fontSize="lg" color="gray700">
                {!event.freeEntry
                  ? `LKR ${event.fee} per person`
                  : "Free Entry"}
              </Text>
            </Div>
            <Div row mt={15}>
              <Icon
                name="calendar-number-outline"
                fontFamily="Ionicons"
                fontSize={16}
                mr={10}
                color="gray700"
                fontWeight="bold"
              />
              <Text fontSize="lg" color="gray700">
                {moment(event.date, "DD/MM/YYYY")
                  .format("DD MMM YYYY")
                  .toLocaleUpperCase()}
              </Text>
              <Div style={styles.separator}></Div>
              <Text fontSize="lg" color="gray700">
                {`${moment(event.startTime, "hh:mm")
                  .format("hh:mm a")
                  .toLocaleUpperCase()} - ${moment(event.endTime, "hh:mm")
                  .format("hh:mm a")
                  .toLocaleUpperCase()}`}
              </Text>
            </Div>
            <Div row mt={15}>
              <Icon
                name="location-outline"
                fontFamily="Ionicons"
                fontSize={16}
                mr={10}
                color="gray700"
              />
              <Text fontSize="lg" color="gray700">
                {event.venue.address}
              </Text>
            </Div>
            <Div mt={15}>
              <Button
                py={5}
                bg="white"
                borderWidth={1}
                borderColor="red500"
                color="red500"
                underlayColor="red100"
                prefix={
                  <Icon
                    fontFamily="FontAwesome5"
                    name="map-marked-alt"
                    mr="md"
                    color="red500"
                  />
                }
              >
                Show On Map
              </Button>
            </Div>
            <Div mt={15}>
              <Text fontSize="xl" fontWeight="bold" color="gray700">
                Description
              </Text>
            </Div>
            <Div mt={15}>
              <Text fontSize="lg" color="gray700">
                {event.description}
              </Text>
            </Div>
          </Div>
        </Div>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  roundedDiv: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  separator: {
    marginHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: "#2d3748",
  },
});

export default ViewEvent;
