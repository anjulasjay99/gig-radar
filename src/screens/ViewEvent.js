import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import {
  Button,
  Div,
  Icon,
  Image,
  Overlay,
  Tag,
  Text,
} from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";
import ImageView from "react-native-image-viewing";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/firbase";

function ViewEvent({ navigation, route }) {
  const [event, setevent] = useState(null);
  const [showImageViewer, setshowImageViewer] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [willAttend, setwillAttend] = useState(false);

  const updateAttending = (isAttending) => {
    let arr = event.attending;

    if (isAttending) {
      arr.push("abcd1234");
    } else {
      const user = arr.indexOf("abcd1234");
      arr.splice(user, 1);
    }

    updateEvent(arr);
  };

  const updateEvent = (attending) => {
    setisLoading(true);
    updateDoc(doc(db, "events", event.id), {
      email: "abcd1234",
      name: event.name,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      venue: event.venue,
      poster: event.poster,
      freeEntry: event.freeEntry,
      fee: event.fee,
      description: event.description,
      attending,
    })
      .then(() => {
        setisLoading(false);
        attending.includes("abcd1234")
          ? setwillAttend(true)
          : setwillAttend(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
        ToastAndroid.show("Error!", ToastAndroid.SHORT);
      });
  };

  const viewMap = () => {
    navigation.navigate("ShowOnMap", { location: event.venue });
  };

  useEffect(() => {
    setevent(route.params.data);
  }, []);

  useEffect(() => {
    if (event && event.attending.includes("abcd1234")) {
      setwillAttend(true);
    }
  }, [event]);

  return (
    <View style={styles.container}>
      <Overlay visible={isLoading} p="xl">
        <ActivityIndicator color={primaryColor} />
        <Text mt="md" textAlign="center">
          Please wait...
        </Text>
      </Overlay>
      <Div style={styles.backBtn}>
        <Button
          bg="white"
          underlayColor="gray100"
          rounded="circle"
          onPress={() => navigation.goBack()}
        >
          <Icon
            fontFamily="Ionicons"
            name="arrow-back"
            color="black"
            fontSize={20}
          />
        </Button>
      </Div>
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
                {event.attending.length} attending
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
                onPress={viewMap}
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
              <ScrollView>
                <Text fontSize="lg" color="gray700">
                  {event.description}
                </Text>
              </ScrollView>
            </Div>
          </Div>
        </Div>
      )}
      <Div row style={styles.bottomContainer}>
        {willAttend ? (
          <Button
            px="xl"
            py="lg"
            bg={"red500"}
            color="white"
            underlayColor="red100"
            rounded="xl"
            w={"100%"}
            onPress={() => updateAttending(false)}
          >
            <Text color="white" fontSize={16} fontWeight="bold">
              I Won't Be There
            </Text>
          </Button>
        ) : (
          <Button
            px="xl"
            py="lg"
            bg={primaryColor}
            color="white"
            underlayColor="purple900"
            rounded="xl"
            w={"100%"}
            onPress={() => updateAttending(true)}
          >
            <Text color="white" fontSize={16} fontWeight="bold">
              I Will Be There
            </Text>
          </Button>
        )}
      </Div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingBottom: 100,
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
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backBtn: {
    position: "absolute",
    top: StatusBar.currentHeight + 10,
    left: 20,
    zIndex: 99,
  },
});

export default ViewEvent;
