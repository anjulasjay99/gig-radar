import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Div, Image, Text, Icon, Button, Tag } from "react-native-magnus";
import moment from "moment";
import { primaryColor } from "../theme/variables";
import ImageView from "react-native-image-viewing";

const EventCard = ({ data, editable, navigation, onDelete }) => {
  const [email, setemail] = useState("abcd1234");
  const [showImageViewer, setshowImageViewer] = useState(false);

  const onPressReadMe = () => {
    navigation.navigate("ViewEvent", { data });
  };

  const onPressEdit = () => {
    navigation.navigate("EditEvent", { data });
  };

  return (
    <Div
      p={5}
      my={10}
      shadow="xs"
      bg="white"
      rounded="xl"
      style={styles.container}
    >
      <Div>
        <Pressable onPress={() => setshowImageViewer(true)}>
          <Image
            h={150}
            style={styles.poster}
            rounded="xl"
            source={{ uri: data.poster }}
          />
        </Pressable>

        <ImageView
          images={[{ uri: data.poster }]}
          imageIndex={0}
          visible={showImageViewer}
          onRequestClose={() => setshowImageViewer(false)}
        />

        <Div
          style={styles.dateWrapper}
          bg="white"
          rounded="xl"
          col
          alignItems="center"
          justifyContent="center"
          py={5}
          px={12}
        >
          <Text color="gray900" fontSize="xl" fontWeight="bold">
            {moment(data.date, "DD/MM/YYYY").format("DD")}
          </Text>
          <Text
            color="gray900"
            fontSize="xs"
            fontWeight="medium"
            textTransform="uppercase"
          >
            {moment(data.date, "DD/MM/YYYY").format("MMM")}
          </Text>
        </Div>
      </Div>

      <Div
        row
        mt={10}
        px={10}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={26} fontWeight="bold" color="gray900">
          {data.name}
        </Text>
        <Button bg="white" p={0} mt={5}>
          <Icon
            fontFamily="Ionicons"
            name="heart-outline"
            color="gray900"
            fontSize={26}
          />
        </Button>
      </Div>

      <Div row mt={8} px={10}>
        <Icon
          name="location-outline"
          fontFamily="Ionicons"
          fontSize={16}
          mr={5}
          color="gray500"
        />
        <Text color="gray500" fontSize={12}>
          {data.venue.address}
        </Text>
      </Div>

      <Div
        row
        px={10}
        mt={15}
        alignItems="center"
        justifyContent="space-between"
      >
        <Tag bg="green500">
          <Icon
            name="people-outline"
            fontFamily="Ionicons"
            fontSize={14}
            mr={5}
            color="white"
          />
          <Text color="white" fontSize={12}>
            {data.attending} attending
          </Text>
        </Tag>
        <Div row>
          <Icon
            name="ticket-outline"
            fontFamily="Ionicons"
            fontSize={16}
            mr={5}
            color="gray900"
            fontWeight="bold"
          />
          {data.freeEntry ? (
            <Div row>
              <Text color="gray900" fontSize={18} fontWeight="bold">
                Free Entry
              </Text>
            </Div>
          ) : (
            <Div row>
              <Text color="gray900" fontSize={18} fontWeight="bold">
                LKR {data.fee}{" "}
              </Text>
              <Text color="gray500" fontSize={12}>
                /person
              </Text>
            </Div>
          )}
        </Div>
      </Div>

      <Div row mt={15}>
        <Button
          mt="sm"
          px="xl"
          py="lg"
          bg={primaryColor}
          color="white"
          underlayColor="purple900"
          rounded="xl"
          w={"100%"}
          onPress={onPressReadMe}
        >
          <Text color="white" fontSize={16} fontWeight="bold">
            Read More
          </Text>
        </Button>
      </Div>

      {editable && (
        <Div row justifyContent="space-between" mt={0}>
          <Button
            mt="sm"
            px="xl"
            py="lg"
            borderWidth={1}
            borderColor={primaryColor}
            bg="white"
            color="white"
            underlayColor="purple100"
            rounded="xl"
            w={"49%"}
            prefix={
              <Icon
                name="edit"
                fontSize={16}
                fontFamily="AntDesign"
                mr="md"
                color={primaryColor}
              />
            }
            onPress={onPressEdit}
          >
            <Text color={primaryColor} fontSize={16} fontWeight="bold">
              Edit
            </Text>
          </Button>
          <Button
            mt="sm"
            px="xl"
            py="lg"
            bg={"red500"}
            borderWidth={1}
            borderColor={"red500"}
            color="white"
            underlayColor="red600"
            rounded="xl"
            w={"49%"}
            prefix={
              <Icon
                name="delete"
                fontSize={16}
                fontFamily="AntDesign"
                mr="md"
                color={"white"}
              />
            }
            onPress={() => onDelete(data.id)}
          >
            <Text color="white" fontSize={16} fontWeight="bold">
              Delete
            </Text>
          </Button>
        </Div>
      )}
    </Div>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    objectFit: "cover",
  },
  dateWrapper: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default EventCard;
