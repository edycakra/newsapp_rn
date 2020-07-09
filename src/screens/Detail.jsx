import React from "react";
import Constants from "expo-constants";

import { WebView } from "react-native-webview";
import { View } from "react-native";

export default function WebScreen({ route }) {
  const { urlWeb } = route.params;
  return (
    <WebView
      style={{ marginTop: Constants.statusBarHeight }}
      source={{ uri: urlWeb }}
    />
  );
}
