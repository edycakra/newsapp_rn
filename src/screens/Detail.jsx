import React from "react";
import Constants from "expo-constants";

import { WebView } from "react-native-webview";

export default function WebScreen({ route }) {
  const { urlWeb } = route.params;
  return (
    <WebView
      style={{ marginTop: Constants.statusBarHeight }}
      source={{ uri: urlWeb }}
    />
  );
}
