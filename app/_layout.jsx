import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./index";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={MainScreen} options={{ title: "EZ Convert" }} />
    </Stack.Navigator>
  );
}
