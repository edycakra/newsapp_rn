import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Loader() {
  return (
    <View>
      <ActivityIndicator size="large" color="#000" style={{ height: "100%" }} />
    </View>
  );
}
