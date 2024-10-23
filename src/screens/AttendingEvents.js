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
import { useDispatch, useSelector } from "react-redux";
import { checkConnectivity } from "../utils/connectivity";
import { useIsFocused } from "@react-navigation/native";
import { addAttending, clearState, updateAttending } from "../redux/actions";
import NothingToShowHere from "../components/NothingToShowHere";
import EventCardSkeleton from "../components/EventCardSkeleton";

const AttendingEvents = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const attending = useSelector((state) => state.attending);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [events, setevents] = useState([]);
  const [refreshing, setrefreshing] = useState(false);

  const getEvents = async () => {
    setrefreshing(true);
    const net = await checkConnectivity();
    if (net.isConnected) {
      try {
        const snap = await getDocs(collection(db, "events"));

        let arr = [];
        snap.forEach((doc) => {
          if (doc.data().attending.includes(user.uid)) {
            arr.push({ id: doc.id, ...doc.data() });
          }
        });

        attending.forEach((item) => {
          let exists = false;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === item.id) {
              exists = true;
            }
          }

          if (!exists) {
            arr.push({ ...item, isCancelled: true });
          }
        });

        setevents(arr);
        dispatch(updateAttending(arr));
        setrefreshing(false);
      } catch (err) {
        console.error(err);
        setrefreshing(false);
      }
    } else {
      setevents(attending);
      setrefreshing(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    isFocused && getEvents();
  }, [isFocused]);

  return (
    <SafeAreaView style={[commonStyles.container, styles.container]}>
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
                editable={false}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0, paddingTop: 0 },
  scrollView: {
    paddingHorizontal: 20,
  },
});
export default AttendingEvents;
