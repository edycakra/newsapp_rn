import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { SOURCES } from "../utils/sources";
import { countries } from "country-data";

export default function Category({ navigation, route }) {
  const { category } = route.params;

  return (
    <View>
      <FlatList
        data={SOURCES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push("Source", { category, source: item })
            }
          >
            <View style={styles.item}>
              <Text style={styles.title}>
                {`${countries[`${item.toUpperCase()}`].emoji} ${
                  countries[`${item.toUpperCase()}`].name
                }`}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#000000",
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginVertical: 2,
  },
  title: {
    color: "#ffff99",
    fontSize: 20,
    fontWeight: "bold",
  },
});
