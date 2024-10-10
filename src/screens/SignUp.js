import {
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Div, Text, Input, Icon, Button, Overlay } from "react-native-magnus";
import { primaryColor, primaryTextColor } from "../theme/variables";
import { db, firebaseAuth } from "../../configs/firbase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const SignUp = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const [showPassword, setshowPassword] = useState(false);
  const auth = firebaseAuth;

  const onPressSignUp = async () => {
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      name !== ""
    ) {
      if (password === confirmPassword) {
        setisLoading(true);

        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("uid", res.user.uid);

          addDoc(collection(db, "users"), {
            name,
            email,
            uid: res.user.uid,
          })
            .then(() => {
              setisLoading(false);
              ToastAndroid.show("Account Created!", ToastAndroid.SHORT);
              navigation.goBack();
            })
            .catch((err) => {
              console.log(err);
              setisLoading(false);
              ToastAndroid.show(
                "Error creating the account!",
                ToastAndroid.SHORT
              );
            });
        } catch (err) {
          console.log(err);
          setisLoading(false);
          ToastAndroid.show("Error creating the account!", ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Please provide all the details!", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Overlay visible={isLoading} p="xl">
        <ActivityIndicator color={primaryColor} />
        <Text mt="md" textAlign="center">
          Please wait...
        </Text>
      </Overlay>
      <Div my={5}>
        <Text color={primaryTextColor} fontSize="3xl" fontWeight="bold">
          Gig Radar
        </Text>
      </Div>
      <Div my={5}>
        <Text color={primaryTextColor} fontSize="xl" fontWeight="medium">
          Create your account
        </Text>
      </Div>

      <Div my={5}>
        <Input
          placeholder="Your Name"
          p={10}
          w={"100%"}
          focusBorderColor={primaryColor}
          prefix={
            <Icon
              name="user"
              fontFamily="SimpleLineIcons"
              fontSize={18}
              color={primaryColor}
              bg="white"
            />
          }
          value={name}
          onChangeText={setname}
        />
      </Div>
      <Div my={5}>
        <Input
          placeholder="Your Email"
          p={10}
          w={"100%"}
          focusBorderColor={primaryColor}
          prefix={
            <Icon
              name="alternate-email"
              fontFamily="MaterialIcons"
              fontSize={18}
              color={primaryColor}
              bg="white"
            />
          }
          value={email}
          onChangeText={setemail}
          keyboardType="email-address"
        />
      </Div>
      <Div my={5}>
        <Input
          placeholder="Your Password"
          p={10}
          w={"100%"}
          focusBorderColor={primaryColor}
          prefix={
            <Icon
              name="key-outline"
              fontFamily="Ionicons"
              fontSize={18}
              color={primaryColor}
              bg="white"
            />
          }
          suffix={
            showPassword ? (
              <Pressable onPress={() => setshowPassword(false)}>
                <Icon
                  name="eye-off-outline"
                  fontFamily="Ionicons"
                  fontSize={18}
                  color={primaryColor}
                  bg="white"
                  o
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => setshowPassword(true)}>
                <Icon
                  name="eye-outline"
                  fontFamily="Ionicons"
                  fontSize={18}
                  color={primaryColor}
                  bg="white"
                />
              </Pressable>
            )
          }
          value={password}
          onChangeText={setpassword}
          secureTextEntry={!showPassword}
        />
      </Div>

      <Div my={5}>
        <Input
          placeholder="Confirm Your Password"
          p={10}
          w={"100%"}
          focusBorderColor={primaryColor}
          prefix={
            <Icon
              name="key-outline"
              fontFamily="Ionicons"
              fontSize={18}
              color={primaryColor}
              bg="white"
            />
          }
          suffix={
            showConfirmPassword ? (
              <Pressable onPress={() => setshowConfirmPassword(false)}>
                <Icon
                  name="eye-off-outline"
                  fontFamily="Ionicons"
                  fontSize={18}
                  color={primaryColor}
                  bg="white"
                  o
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => setshowConfirmPassword(true)}>
                <Icon
                  name="eye-outline"
                  fontFamily="Ionicons"
                  fontSize={18}
                  color={primaryColor}
                  bg="white"
                />
              </Pressable>
            )
          }
          value={confirmPassword}
          onChangeText={setconfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
      </Div>

      <Div my={5} w={"100%"}>
        <Button
          px="xl"
          py="lg"
          bg={primaryColor}
          color="white"
          underlayColor="purple900"
          rounded="xl"
          w={"100%"}
          onPress={onPressSignUp}
        >
          <Text color="white" fontSize={16} fontWeight="bold">
            Sign Up
          </Text>
        </Button>
      </Div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
});

export default SignUp;
