import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon, Div, Fab, Text, Skeleton } from "react-native-magnus";
import { styles as commonStyles } from "../theme/commonStyles";
import EventCard from "../components/EventCard";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../configs/firbase";
import { primaryColor, primaryTextColor } from "../theme/variables";
import { isEventWithinRange } from "../utils/calculateDistance";
import { getAddress, getLocation } from "../utils/locationService";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/actions";
import NothingToShowHere from "../components/NothingToShowHere";
import EventCardSkeleton from "../components/EventCardSkeleton";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [location, setlocation] = useState(null);
  const [events, setevents] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [address, setaddress] = useState(null);

  const getEvents = async () => {
    setrefreshing(true);
    const snap = await getDocs(collection(db, "events"));

    const userLocation = await getLocation();

    setlocation(userLocation);

    let arr = [];
    snap.forEach((doc) => {
      if (
        userLocation &&
        isEventWithinRange(
          userLocation.lat,
          userLocation.long,
          doc.data().venue.lat,
          doc.data().venue.long,
          50
        )
      ) {
        arr.push({ id: doc.id, ...doc.data() });
      }
    });
    setevents(arr);
    setrefreshing(false);
  };

  const onPressCreateNewEvent = () => {
    navigation.navigate("NewEvent");
  };

  useEffect(() => {
    //dispatch(clearState());
    getEvents();
  }, []);

  useEffect(() => {
    (async () => {
      const userAddr = await getAddress(location);
      setaddress(userAddr);
    })();
  }, [location]);

  return (
    <SafeAreaView style={[commonStyles.container, styles.container]}>
      {address ? (
        <Div row px={20} mt={10} mb={10}>
          <Icon
            name="location-outline"
            fontFamily="Ionicons"
            fontSize="2xl"
            mr={5}
            color="green500"
          />
          <Text fontSize="md" color={primaryTextColor}>
            {address}
          </Text>
        </Div>
      ) : (
        <Div col px={20} mt={10} mb={10}>
          <Skeleton.Box />
        </Div>
      )}
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
            return <EventCard key={i} data={data} navigation={navigation} />;
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
export default Home;
