import React, { useEffect, useState } from "react";
import Constants from "expo-constants";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import Loader from "../components/Loader";
import { SearchBar } from "react-native-elements";

export default function Category({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState(""); //state for searchbar

  const { category, source } = route.params;
  const URL = `http://newsapi.org/v2/top-headlines?country=${source.alpha2}&category=${category}&apiKey=9314195eaf9a4dd38cf90bd8512fcc99`;

  const heightScreen = Dimensions.get("screen").height - 200;
  const widthScreen = Dimensions.get("window").width;

  useEffect(() => {
    setLoading(true);
    axios
      .get(URL)
      .then(({ data }) => {
        let newsArr = data.articles;
        setNews(newsArr);
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (input) => {
    const newData = news.filter((item) => {
      const textData = input.toUpperCase();
      const itemData = item.title.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setNews(newData);
    setQuery(input);
  };

  return (
    <View style={styles.container}>
      {loading || news.length == 0 ? (
        <View>
          <Loader />
        </View>
      ) : (
        <View style={styles.container}>
          <SearchBar
            placeholder="Search Article..."
            onChangeText={handleSearch}
            lightTheme
            round
            value={query}
          />
          <FlatList
            data={news}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.push("Detail", { urlWeb: item.url })}
              >
                <View style={styles.item}>
                  <Image
                    style={{ width: widthScreen, height: 0.4 * heightScreen }}
                    source={{ uri: item.urlToImage }}
                  ></Image>
                  <Text style={styles.title}>{item.title}</Text>
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
    //   alignItems: "center",
    //   justifyContent: "center",
  },
  item: {
    backgroundColor: "#000000",
    paddingVertical: 5,
    paddingHorizontal: 5,
    // marginVertical: 2,
    borderWidth: 2,
    borderColor: "#20232a",
  },
  title: {
    color: "#ffff99",
    fontSize: 18,
    fontWeight: "bold",
  },
});
