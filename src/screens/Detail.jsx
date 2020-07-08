import React from "react";
import { WebView } from "react-native-webview";

export default function WebScreen({ route }) {
  const { urlWeb } = route.params;
  return <WebView source={{ uri: urlWeb }} />;
}
