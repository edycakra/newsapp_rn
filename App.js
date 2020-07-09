import React from "react";
import { YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//available screens
import Home from "./src/screens/Home";
import Category from "./src/screens/Category";
import Source from "./src/screens/Source";
import Detail from "./src/screens/Detail";

//stacknavigator
const Stack = createStackNavigator();
console.disableYellowBox = true;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Source" component={Source} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
