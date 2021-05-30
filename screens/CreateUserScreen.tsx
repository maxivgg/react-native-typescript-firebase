import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, StatusBar } from "react-native";
import firebase from "../database/firebase";
import { FirebaseResponse } from "../types";

const CreateUserScreen = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
  };

  const [state, setstate] = useState(initialState);

  const handleChangeText = (name: string, value: string) => {
    setstate({ ...state, [name]: value });
  };

  const addNewUser = async () => {
    await firebase.db
      .collection("users")
      .add({
        name: state.name,
        email: state.email,
        phone: state.phone,
      })
      .then((response: FirebaseResponse) => {
        alert(`Your id: ${response.id}`);
        setstate(initialState);
      })
      .catch((error: string) => console.log(error));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          style={styles.inputGroup}
          placeholder="Name user"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View>
        <TextInput
          style={styles.inputGroup}
          placeholder="Email user"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View>
        <TextInput
          style={styles.inputGroup}
          placeholder="Phone user"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button title="Save user" onPress={addNewUser}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 35,
    marginTop: StatusBar.currentHeight || 0,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 25,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateUserScreen;
