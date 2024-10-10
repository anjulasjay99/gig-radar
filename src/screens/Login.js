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
import { useDispatch } from "react-redux";

import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { addUser } from "../redux/actions";

const Login = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const auth = firebaseAuth;

  const [showPassword, setshowPassword] = useState(false);
  const dispatch = useDispatch();

  const login = async () => {
    if (email !== "" && password !== "") {
      setisLoading(true);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);

        const colRef = collection(db, "users");

        const q = query(colRef, where("uid", "==", res.user.uid), limit(1));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          console.log("Document data:", doc.data());
          dispatch(addUser(doc.data()));
        } else {
          console.log("No document found!");
          ToastAndroid.show(
            "Could not log in. Please try again later!",
            ToastAndroid.SHORT
          );
        }

        setisLoading(false);
      } catch (err) {
        console.log(err);
        setisLoading(false);
        ToastAndroid.show("Invalid credentials!", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show(
        "Please provide both email and password!",
        ToastAndroid.SHORT
      );
    }
  };

  const onPressSignUp = () => {
    navigation.navigate("SignUp");
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
          Log in to your account
        </Text>
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

      <Div my={5} w={"100%"}>
        <Button
          px="xl"
          py="lg"
          bg={primaryColor}
          color="white"
          underlayColor="purple900"
          rounded="xl"
          w={"100%"}
          onPress={login}
        >
          <Text color="white" fontSize={16} fontWeight="bold">
            Log In
          </Text>
        </Button>
      </Div>

      <Div row my={5} w={"100%"} justifyContent="center">
        <Text color={primaryTextColor} fontSize={14} fontWeight="medium">
          Don't have an account?
        </Text>
        <Button
          bg={"white"}
          color={primaryColor}
          underlayColor="purple100"
          rounded="xl"
          onPress={onPressSignUp}
        >
          <Text color={primaryColor} fontSize={14} fontWeight="medium">
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

export default Login;
