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

const AttendingEvents = ({ navigation }) => {
  const [email, setemail] = useState("abcd1234");
  const [events, setevents] = useState([]);
  const [refreshing, setrefreshing] = useState(false);

  const getEvents = async () => {
    setrefreshing(true);
    const snap = await getDocs(collection(db, "events"));

    let arr = [];
    snap.forEach((doc) => {
      if (doc.data().attending.includes(email)) {
        arr.push({ id: doc.id, ...doc.data() });
      }
    });
    setevents(arr);
    setrefreshing(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

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
        {events.length > 0
          ? events.map((data, i) => {
              return (
                <EventCard
                  key={i}
                  data={data}
                  navigation={navigation}
                  editable={false}
                />
              );
            })
          : null}
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
