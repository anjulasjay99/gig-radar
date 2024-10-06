import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import { Button, Text, Icon } from "react-native-magnus";
import { primaryColor } from "../theme/variables";

function ImagePickerView({ img, onImageChange }) {
  const [image, setimage] = useState(null);
  const [showImageViewer, setshowImageViewer] = useState(false);

  //called when user wants to select an image
  pickImageHandler = () => {
    Alert.alert(
      "Select Image",
      "Choose an option...",
      [
        {
          text: "Open Camera",
          onPress: () => openCamera(),
        },
        {
          text: "Open Gallery",
          onPress: () => openLibrary(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  //called to grant access to gallery and select an image
  const openLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      ToastAndroid.show(
        "You've refused to allow this app to access your photos!",
        ToastAndroid.LONG
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setimage(result.assets[0].uri);
      onImageChange(result.assets[0].uri);
    }
  };

  //called to grant camera access and take a photo
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      ToastAndroid.show(
        "You've refused to allow this app to access your camera!",
        ToastAndroid.LONG
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setimage(result.assets[0].uri);
      onImageChange(result.assets[0].uri);
    }
  };

  //Used for deleting the selected image
  deleteImage = () => {
    setimage(null);
    onImageChange(null);
  };

  useEffect(() => {
    setimage(img);
    console.log("rrr", img);
  }, []);

  return (
    <View style={styles.container}>
      {image && (
        <Pressable onPress={() => setshowImageViewer(true)}>
          <Image source={{ uri: image }} style={styles.image} />
        </Pressable>
      )}
      {image && (
        <ImageView
          images={[{ uri: image }]}
          imageIndex={0}
          visible={showImageViewer}
          onRequestClose={() => setshowImageViewer(false)}
        />
      )}
      {image && (
        <Button
          my={5}
          px="xl"
          py="lg"
          borderWidth={1}
          borderColor="red600"
          bg="white"
          color="red600"
          underlayColor="red100"
          rounded="xl"
          w={"100%"}
          onPress={deleteImage}
        >
          <Icon
            name="delete"
            fontFamily="AntDesign"
            fontSize={16}
            mr={5}
            color="red600"
          />
          <Text color="red600" fontSize={16} fontWeight="bold">
            Delete Image
          </Text>
        </Button>
      )}
      <Button
        px="xl"
        py="lg"
        borderWidth={1}
        borderColor={primaryColor}
        bg="white"
        color={primaryColor}
        underlayColor="purple100"
        rounded="xl"
        w={"100%"}
        onPress={pickImageHandler}
      >
        <Icon
          name="camera-outline"
          fontFamily="Ionicons"
          fontSize={16}
          mr={5}
          color={primaryColor}
        />
        <Text color={primaryColor} fontSize={16} fontWeight="bold">
          Upload a Cover Image
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", height: 200, borderRadius: 16 },
});

export default ImagePickerView;
