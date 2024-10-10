import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon, Div, Fab, Text, Overlay } from "react-native-magnus";
import { styles as commonStyles } from "../theme/commonStyles";
import EventCard from "../components/EventCard";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../configs/firbase";
import { primaryColor, primaryTextColor } from "../theme/variables";
import { deleteDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import NothingToShowHere from "../components/NothingToShowHere";
import EventCardSkeleton from "../components/EventCardSkeleton";

const YourEvents = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const [events, setevents] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const getEvents = async () => {
    setrefreshing(true);
    const snap = await getDocs(collection(db, "events"));

    let arr = [];
    snap.forEach((doc) => {
      if (doc.data().uid === user.uid) {
        arr.push({ id: doc.id, ...doc.data() });
      }
    });
    setevents(arr);
    setrefreshing(false);
  };

  const onPressDelete = (id) => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Yes",
          onPress: () => deleteEvent(id),
        },
        {
          text: "No",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const deleteEvent = (id) => {
    setisLoading(true);
    deleteDoc(doc(db, "events", id))
      .then(() => {
        setisLoading(false);
        getEvents();
      })
      .catch((err) => {
        setisLoading(false);
        console.log(err);
        ToastAndroid.show("Error Deleting Event!", ToastAndroid.SHORT);
      });
  };

  const onPressCreateNewEvent = () => {
    navigation.navigate("NewEvent");
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getEvents();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={[commonStyles.container, styles.container]}>
      <Overlay visible={isLoading} p="xl">
        <ActivityIndicator color={primaryColor} />
        <Text mt="md" textAlign="center">
          Please wait...
        </Text>
      </Overlay>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getEvents()}
          />
        }
      >
        {events.length > 0 ? (
          events.map((data, i) => {
            return (
              <EventCard
                key={i}
                data={data}
                navigation={navigation}
                editable={true}
                onDelete={onPressDelete}
              />
            );
          })
        ) : refreshing ? (
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        ) : (
          <NothingToShowHere />
        )}
      </ScrollView>
      <Fab bg={primaryColor}>
        <Button
          p="none"
          bg="transparent"
          justifyContent="flex-end"
          onPress={onPressCreateNewEvent}
        >
          <Div rounded="sm" bg="white" p="sm">
            <Text fontSize="md">Create New Event</Text>
          </Div>
          <Icon
            name="calendar"
            color={primaryColor}
            h={50}
            w={50}
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
      </Fab>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0, paddingTop: 0 },
  scrollView: {
    paddingHorizontal: 20,
  },
});
export default YourEvents;
