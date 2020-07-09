import React from "react";
import { View, Text } from "react-native";

export default function Error() {
  return (
    <View>
      <Text
        style={{
          color: "#000000",
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        **something went wrong**
      </Text>
    </View>
  );
}
