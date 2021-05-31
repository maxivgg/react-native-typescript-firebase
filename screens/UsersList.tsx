import React, { useState, useEffect } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../database/firebase";
import { FirebaseResponse, User } from "../types";
import { FAB } from "react-native-elements";

const UserList = (props: any) => {
  const [users, setUsers] = useState([] as User[]);

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
      setUsers(usersFirebase);
    });
  }, []);

  return (
    <React.Fragment>
      <FAB
        onPress={() => props.navigation.navigate("CreateUserScreen")}
        title="Add user"
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          zIndex: 99,
        }}
      />

      <ScrollView>
        {users.map((user) => {
          return (
            <ListItem
              key={user.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate("UserDetailScreen", {
                  userId: user.id,
                });
              }}
            >
              <ListItem.Chevron />
              <Avatar
                size="medium"
                source={{
                  uri: "https://avatars.githubusercontent.com/u/45208874?s=400&u=ecdb30d5b244ecbd2515654392312313fe8a1e5f&v=4",
                }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </React.Fragment>
  );
};

export default UserList;
