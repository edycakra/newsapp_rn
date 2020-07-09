import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { SearchBar } from "react-native-elements";

export default function Category({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [sourceList, setSourceList] = useState([]);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(""); //state for searchbar
  const [filter, setFilter] = useState([]); //to help backspace response when searching

  const { category } = route.params;
  const URL = `https://newsapi.org/v2/sources?category=${category}&language=en&apiKey=9314195eaf9a4dd38cf90bd8512fcc99`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(URL)
      .then(({ data }) => {
        let sourceArr = data.sources;
        setSourceList(sourceArr);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //function to filter search by query input
  const handleSearch = (input) => {
    const newData = sourceList.filter((item) => {
      const textData = input.toUpperCase();
      const itemData = item.name.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilter(newData);
    setQuery(input);
  };

  return (
    <View style={styles.container}>
      {loading || sourceList.length == 0 ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <View style={styles.container}>
          <SearchBar
            placeholder="Search Source..."
            onChangeText={handleSearch}
            lightTheme
            round
            value={query}
          />
          <FlatList
            data={filter.length ? filter : sourceList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push("Source", { category, source: item.id })
                }
              >
                <View style={styles.item}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={{ color: "white" }}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
