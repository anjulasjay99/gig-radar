import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { styles as commonStyles } from "../theme/commonStyles";
import {
  Input,
  Text,
  Div,
  Button,
  Icon,
  Textarea,
  Toggle,
  Modal,
  Overlay,
} from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";
import SelectVenue from "../components/SelectLocation";
import SelectLocation from "../components/SelectLocation";
import ImagePickerView from "../components/ImagePicker";
import DatePicker from "react-native-date-picker";
import DateTimePicker from "react-native-ui-datepicker";
import moment from "moment";
import DateTimeInputHandler from "../components/DateTimeInputHandler";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../configs/firbase";
import { useDispatch, useSelector } from "react-redux";

const NewEvent = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  const [coverImage, setcoverImage] = useState("");
  const [eventName, seteventName] = useState("");

  const [date, setDate] = useState("");
  const [pickerDate, setpickerDate] = useState(new Date());

  const [startTime, setstartTime] = useState("");
  const [pickerStartTime, setpickerStartTime] = useState(new Date());

  const [endTime, setendTime] = useState("");
  const [pickerEndTime, setpickerEndTime] = useState(new Date());

  const [location, setlocation] = useState(null);
  const [freeEntry, setfreeEntry] = useState(false);
  const [fee, setfee] = useState(0);
  const [description, setdescription] = useState("");

  const [datePickerOpen, setdatePickerOpen] = useState(false);
  const [startTimePickerOpen, setstartTimePickerOpen] = useState(false);
  const [endTimePickerOpen, setendTimePickerOpen] = useState(false);

  const [isLoading, setisLoading] = useState(false);

  const setNewDate = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    setDate(newDate);
  };

  const setNewStartTime = (date) => {
    try {
      const newDate = date.split(" ")[1];
      setstartTime(newDate);
    } catch (err) {
      console.log(err);
    }
  };

  const setNewEndTime = (date) => {
    try {
      const newDate = date.split(" ")[1];
      setendTime(newDate);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = () => {
    console.log(
      eventName,
      location,
      date,
      startTime,
      endTime,
      description,
      coverImage,
      freeEntry,
      fee
    );
    if (
      eventName !== "" &&
      location &&
      date !== "" &&
      startTime !== "" &&
      endTime !== "" &&
      description !== "" &&
      coverImage !== ""
    ) {
      setisLoading(true);
      uploadImage((url) => {
        addDoc(collection(db, "events"), {
          uid: user.uid,
          name: eventName,
          date,
          startTime,
          endTime,
          venue: location,
          poster: url,
          freeEntry,
          fee: freeEntry ? 0 : fee,
          description,
          attending: [],
          likes: [],
        })
          .then(() => {
            ToastAndroid.show("Event Created!", ToastAndroid.SHORT);
            setisLoading(false);
            navigation.goBack();
          })
          .catch((err) => {
            console.log(err);
            setisLoading(false);
            ToastAndroid.show("Error Submitting Event!", ToastAndroid.SHORT);
          });
      });
    } else {
      ToastAndroid.show("Please provide all the details!", ToastAndroid.SHORT);
    }
  };

  //called to upload selected image to firebase storage
  const uploadImage = async (callback) => {
    if (coverImage) {
      const response = await fetch(coverImage);
      const blob = await response.blob();
      console.log(coverImage.split("/").pop());
      const storage = getStorage();
      const storageRef = ref(storage, `images/${coverImage.split("/").pop()}`);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          ToastAndroid.show("Error Submitting Event!", ToastAndroid.SHORT);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            callback(downloadURL);
          });
        }
      );
    } else {
      callback("");
    }
  };

  useEffect(() => {
    setNewDate(pickerDate);
  }, [pickerDate]);

  useEffect(() => {
    setNewStartTime(pickerStartTime);
  }, [pickerStartTime]);

  useEffect(() => {
    setNewEndTime(pickerEndTime);
  }, [pickerEndTime]);

  return (
    <View
      style={[commonStyles.container, { paddingTop: 0, paddingHorizontal: 0 }]}
    >
      <Overlay visible={isLoading} p="xl">
        <ActivityIndicator color={primaryColor} />
        <Text mt="md" textAlign="center">
          Please wait...
        </Text>
      </Overlay>
      <ScrollView style={commonStyles.scrollView}>
        <Div my={5} mt={20}>
          <ImagePickerView onImageChange={setcoverImage} />
        </Div>
        <Div my={5}>
          <Input
            value={eventName}
            onChangeText={seteventName}
            placeholder="Event Name"
            p={10}
            focusBorderColor={primaryColor}
          />
        </Div>
        <Div my={5}>
          <Modal isVisible={datePickerOpen} p={20}>
            <Div row justifyContent="flex-end" mb={10}>
              <Button
                bg="gray400"
                rounded="circle"
                onPress={() => {
                  setdatePickerOpen(false);
                }}
              >
                <Icon color="black900" name="close" />
              </Button>
            </Div>
            <DateTimePicker
              mode="single"
              locale="en"
              date={pickerDate}
              onChange={(params) => {
                setpickerDate(params.date);
                setdatePickerOpen(false);
              }}
              selectedItemColor="#9f7aea"
            />
          </Modal>
          <DateTimeInputHandler
            mode="date"
            onPress={() => {
              setdatePickerOpen(true);
            }}
            value={date}
            prefix="Date"
            width={"100%"}
          />
        </Div>
        <Div row my={5} justifyContent="space-between">
          <Div w={"49%"}>
            <Modal isVisible={startTimePickerOpen} p={20}>
              <Div row justifyContent="flex-end" mb={10}>
                <Button
                  bg="gray400"
                  rounded="circle"
                  onPress={() => {
                    setstartTimePickerOpen(false);
                  }}
                >
                  <Icon color="black900" name="close" />
                </Button>
              </Div>
              <DateTimePicker
                mode="single"
                locale="en"
                date={pickerStartTime}
                onChange={(params) => {
                  setpickerStartTime(params.date);
                  //setdatePickerOpen(false);
                }}
                timePicker={true}
                initialView="time"
              />
              <Button
                mt="sm"
                px="xl"
                py="lg"
                bg={primaryColor}
                color="white"
                underlayColor="purple900"
                rounded="xl"
                w={"100%"}
                onPress={() => {
                  setstartTimePickerOpen(false);
                }}
              >
                <Text color="white" fontSize={16} fontWeight="bold">
                  Confirm
                </Text>
              </Button>
            </Modal>
            <DateTimeInputHandler
              mode="time"
              onPress={() => {
                setstartTimePickerOpen(true);
              }}
              value={startTime}
              prefix="Start"
              width={"100%"}
            />
          </Div>
          <Div w={"49%"}>
            <Modal isVisible={endTimePickerOpen} p={20}>
              <Div row justifyContent="flex-end" mb={10}>
                <Button
                  bg="gray400"
                  rounded="circle"
                  onPress={() => {
                    setendTimePickerOpen(false);
                  }}
                >
                  <Icon color="black900" name="close" />
                </Button>
              </Div>
              <DateTimePicker
                mode="single"
                locale="en"
                date={pickerEndTime}
                onChange={(params) => {
                  setpickerEndTime(params.date);
                }}
                timePicker={true}
                initialView="time"
              />
              <Button
                mt="sm"
                px="xl"
                py="lg"
                bg={primaryColor}
                color="white"
                underlayColor="purple900"
                rounded="xl"
                w={"100%"}
                onPress={() => {
                  setendTimePickerOpen(false);
                }}
              >
                <Text color="white" fontSize={16} fontWeight="bold">
                  Confirm
                </Text>
              </Button>
            </Modal>
            <DateTimeInputHandler
              mode="time"
              onPress={() => {
                setendTimePickerOpen(true);
              }}
              value={endTime}
              prefix="End"
              width={"100%"}
            />
          </Div>
        </Div>
        <Div my={5}>
          <SelectLocation setLocation={setlocation} navigation={navigation} />
        </Div>
        <Div my={5}>
          <Div row my={5}>
            <Toggle
              on={freeEntry}
              onPress={() => setfreeEntry(!freeEntry)}
              bg="gray200"
              circleBg={primaryColor}
              activeBg={primaryColor}
              h={30}
              w={60}
            />
            <Text ml={10} color={primaryTextColor}>
              Free Entry
            </Text>
          </Div>
          {!freeEntry && (
            <Div my={5}>
              <Input
                placeholder="Ticket Price"
                p={10}
                focusBorderColor={primaryColor}
                prefix={<Text color="gray600">LKR</Text>}
                keyboardType="numeric"
                value={fee}
                onChangeText={setfee}
              />
            </Div>
          )}
        </Div>
        <Div my={5}>
          <Input
            placeholder="Description"
            h={150}
            multiline={true}
            numberOfLines={3}
            focusBorderColor={primaryColor}
            style={{ alignItems: "flex-start", paddingTop: 0 }}
            value={description}
            onChangeText={setdescription}
          />
        </Div>
        <Div my={5} mb={10}>
          <Button
            mt="sm"
            px="xl"
            py="lg"
            bg={primaryColor}
            color="white"
            underlayColor="purple900"
            rounded="xl"
            w={"100%"}
            onPress={onSubmit}
          >
            <Text color="white" fontSize={16} fontWeight="bold">
              Create Event
            </Text>
          </Button>
        </Div>
      </ScrollView>
    </View>
  );
};

export default NewEvent;
