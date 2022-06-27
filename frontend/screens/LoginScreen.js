import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sendCred = async (props) => {
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem("token", data.token);
          props.navigation.replace("home");
        } catch (e) {
          console.log("error hai", e);
        }
      });
  };
  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Text
          style={{
            fontSize: 35,
            marginLeft: 18,
            marginTop: 10,
            color: "#3b3b3b",
          }}
        >
          Welcome to
        </Text>
        <Text style={{ fontSize: 30, marginLeft: 18, color: "blue" }}>
          Agatsa
        </Text>
        <View
          style={{
            borderBottomColor: "blue",
            borderBottomWidth: 4,
            borderRadius: 10,
            marginLeft: 20,
            marginRight: 150,
            marginTop: 4,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 18,
            marginTop: 20,
          }}
        >
          Login With email
        </Text>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: "blue" } }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="password"
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: "blue" } }}
        />
        <Button
          mode="contained"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          onPress={() => sendCred(props)}
        >
          Login
        </Button>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 18,
              marginTop: 20,
            }}
            onPress={() => props.navigation.navigate("signup")}
          >
            dont have an account ?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({});
export default LoginScreen;
