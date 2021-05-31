import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase from "../database/firebase";
import { Button } from 'react-native-elements';

type TProps = {
  route: { params: { userId: string } };
  navigation: { navigate: (arg0: string) => void };
};

const UserDetailScreen = (props: TProps) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value: string, prop: string) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id: string) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true);
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    if (Platform.OS === "web") {
      const confirm = window.confirm("Are you sure?");
      if (confirm) deleteUser();
    } else {
      Alert.alert(
        "Removing the User",
        "Are you sure?",
        [
          { text: "Yes", onPress: () => deleteUser() },
          { text: "No", onPress: () => console.log("canceled") },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  const updateUser = async () => {
    setLoading(true);
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          placeholder="Email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.phone}
          onChangeText={(value) => handleTextChange(value, "phone")}
        />
      </View>
      <View style={styles.buttons}>
        <Button loading={loading} title="Update" onPress={() => updateUser()} />
      </View>
      <View>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          type="clear"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  buttons: {
    marginBottom: 15,
  },
});

export default UserDetailScreen;
