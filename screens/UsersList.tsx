import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  ListRenderItemInfo,
} from "react-native";
import firebase from "../database/firebase";
import { FirebaseResponse, User } from "../types";
import { ListItem, Avatar } from "react-native-elements";

const UsersList = () => {
  const [users, setusers] = useState([] as User[]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot: any) => {
      const usersFirebase: User[] = [];
      querySnapshot.docs.forEach((doc: FirebaseResponse) => {
        const { name, email, phone } = doc.data();
        usersFirebase.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setusers(usersFirebase);
    });
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<User>) => (
    <ListItem key={item.id} >
      <Avatar
        source={{
          uri: "https://avatars.githubusercontent.com/u/45208874?s=400&u=ecdb30d5b244ecbd2515654392312313fe8a1e5f&v=4",
        }}
        rounded
      />
      <ListItem.Chevron />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1,
    marginVertical: 8,
    border: 10,
    margin: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "#cccccc",
  },
});

export default UsersList;
