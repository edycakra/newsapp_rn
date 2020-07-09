import React, { useState } from "react";
import Constants from "expo-constants";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";

import { SOURCES } from "../utils/sources"; //importing available sources in newsapi

export default function Category({ navigation, route }) {
  const { category } = route.params;
  const [sourceList, setSourceList] = useState(SOURCES);
  const [query, setQuery] = useState(""); //state for searchbar

  //function to filter search by query input
  const handleSearch = (input) => {
    const newData = SOURCES.filter((item) => {
      const textData = input.toUpperCase();
      const itemData = item.name.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSourceList(newData);
    setQuery(input);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Source..."
        onChangeText={handleSearch}
        lightTheme
        round
        value={query}
      />
      <FlatList
        data={sourceList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push("Source", { category, source: item })
            }
          >
            <View style={styles.item}>
              <Text style={styles.title}>
                {item.emoji} {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: "#000000",
    paddingVertical: 30,
    width: Dimensions.get("window").width,
    marginVertical: 2,
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
