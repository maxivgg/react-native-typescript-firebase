import React, { useState } from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import firebase from "../database/firebase";
import { Button } from 'react-native-elements';

type TProps = { navigation: { navigate: (arg0: string) => void } };

const AddUserScreen = (props: TProps) => {
  const initalState = {
    name: "",
    email: "",
    phone: "",
  };
  const [state, setState] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const handleChangeText = (value: string, name: string) => {
    setState({ ...state, [name]: value });
  };
  const saveNewUser = async () => {
    setLoading(true);
    if (state.name === "") {
      alert("Please provide a name");
    } else {
      try {
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          phone: state.phone,
        });
        props.navigation.navigate("UsersList");
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="phone"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={state.phone}
        />
      </View>
      <View>
        <Button loading={loading} title="Save User" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default AddUserScreen;
