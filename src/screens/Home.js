import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon, Div, Fab, Text } from "react-native-magnus";
import { styles as commonStyles } from "../theme/commonStyles";
import EventCard from "../components/EventCard";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../configs/firbase";
import { primaryColor } from "../theme/variables";

const Home = ({ navigation }) => {
  const [events, setevents] = useState([]);

  const getEvents = async () => {
    const snap = await getDocs(collection(db, "events"));
    let arr = [];
    snap.forEach((doc) => {
      arr.push(doc.data());
    });
    setevents(arr);
  };

  const onPressCreateNewEvent = () => {
    navigation.navigate("NewEvent");
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      {events.length > 0
        ? events.map((data, i) => {
            return <EventCard key={i} data={data} />;
          })
        : null}
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

// const styles = StyleSheet.create({
//   container: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//     backgroundColor: "white",
//     paddingTop: StatusBar.currentHeight,
//   },
// });
export default Home;
