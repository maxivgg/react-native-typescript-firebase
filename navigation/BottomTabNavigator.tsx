import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import TabOneScreen from "../screens/UsersList";
import TabTwoScreen from "../screens/CreateUserScreen";
import TabTreeScreen from "../screens/UserDetailScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = "#2f95dc";

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: colorScheme }}
    >
      <BottomTab.Screen
        name="Users List"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ colorScheme }: any) => (
            <TabBarIcon name="ios-code" color={colorScheme} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Create new user"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ colorScheme }: any) => (
            <TabBarIcon name="ios-code" color={colorScheme} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Edit new user"
        component={TabTreeNavigator}
        options={{
          tabBarIcon: ({ colorScheme }: any) => (
            <TabBarIcon name="ios-code" color={colorScheme} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Users List" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Create new user" }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabTreeStack = createStackNavigator();

function TabTreeNavigator() {
  return (
    <TabTreeStack.Navigator>
      <TabTreeStack.Screen
        name="TabTreeScreen"
        component={TabTreeScreen}
        options={{ headerTitle: "Edit user" }}
      />
    </TabTreeStack.Navigator>
  );
}
