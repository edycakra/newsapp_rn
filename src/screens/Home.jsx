import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { CATEGORY } from "../utils/category"; //array of available categories in newsapi

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.app}>NEWS APP</Text>
        <Text>Choose Category</Text>
      </View>
      <FlatList
        data={CATEGORY}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.push("Category", { category: item })}
          >
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
    paddingVertical: 20,
    paddingHorizontal: 60,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    color: "#ffff99",
    fontSize: 20,
    fontWeight: "bold",
  },
  app: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
  },
});
