import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function ListComponent({ data, onPress }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
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
