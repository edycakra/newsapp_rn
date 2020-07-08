import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import Loader from "../components/Loader";

export default function Category({ route }) {
  const { detail } = route.params;
  const heightScreen = Dimensions.get("screen").height - 200;
  const widthScreen = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {!detail.urlToImage ? (
        <View>
          <Loader />
        </View>
      ) : (
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <Image
            style={{ width: widthScreen, height: 0.4 * heightScreen }}
            source={{ uri: detail.urlToImage }}
          ></Image>
          <View style={styles.item}>
            <Text style={styles.title}>{detail.title}</Text>
            <Text style={{ color: "white" }}>
              {detail.description}
              <Text
                style={{ color: "yellow", fontSize: 10 }}
                onPress={() => Linking.openURL(detail.url)}
              >
                &nbsp;more about this
              </Text>
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#000000",
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#20232a",
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
