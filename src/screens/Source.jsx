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
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Loader from "../components/Loader";
import { SearchBar } from "react-native-elements";

export default function Category({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState(""); //state for searchbar
  const [filter, setFilter] = useState([]); //to help backspace response when searching
  const [page, setPage] = useState(1);

  const { source } = route.params;

  const heightScreen = Dimensions.get("screen").height - 200;
  const widthScreen = Dimensions.get("window").width;

  const fetchNews = (page) => {
    const URL = `https://newsapi.org/v2/everything?sources=${source}&apiKey=9314195eaf9a4dd38cf90bd8512fcc99&page=${page}`;
    setLoading(true);
    axios
      .get(URL)
      .then(({ data }) => {
        let newsArr = news;
        let concatData = newsArr.concat(data.articles);
        setNews(concatData);
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchNews(page);
  }, [page]);

  //infinite scroll: loading when reaching the end of list
  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={{ color: "#000" }} />;
  };

  //infinite scroll: load function when reaching the end of list
  const handleLoadMore = () => {
    if (!loading) {
      let num = page;
      setPage((num += 1));
      fetchNews(num);
    }
  };

  //infinite scroll: creating separator to show that the handleLoadMore works
  const renderSeparator = () => {
    return (
      <View style={{ height: 2, width: "100%", backgroundColor: "#yellow" }} />
    );
  };

  //search function
  const handleSearch = (input) => {
    const textData = input.toUpperCase();
    const newData = news.filter((item) => {
      const itemData = item.title.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilter(newData);
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
            data={filter.length ? filter : news}
            keyExtractor={(item, index) => String(index)}
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
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.4}
            onEndReached={handleLoadMore}
            // ItemSeparatorComponent={renderSeparator}
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
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "#20232a",
  },
  title: {
    color: "#ffff99",
    fontSize: 18,
    fontWeight: "bold",
  },
});
