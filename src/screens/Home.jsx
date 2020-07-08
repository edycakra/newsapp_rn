import Constants from "expo-constants";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { CATEGORY } from "../utils/category";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={CATEGORY}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.push("Category")}>
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#000000",
    paddingVertical: 30,
    paddingHorizontal: 60,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    color: "#ffff99",
    fontSize: 20,
    fontWeight: "bold",
  },
});
