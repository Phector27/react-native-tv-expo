import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import UserLogged from "../screens/Account/UserLogged";
import Movie from "../screens/Account/Movie";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{
          title: "Account",
          headerTitleAlign: { alignSelf: "center" },
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          title: "Sign In 🔐",
          headerTitleAlign: { alignSelf: "center" },
        }}
      />
      <Stack.Screen
        name="user-logged"
        component={UserLogged}
        options={{
          title: "Private Area 🔓",
          headerTitleAlign: { alignSelf: "center" },
          
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: "",
          headerTitleAlign: { alignSelf: "center" },
          headerTintColor: "#fff",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
