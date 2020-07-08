import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Loader from "../components/Loader";

export default function Category({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState([]);

  const { category } = route.params;
  const URL = `http://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=9314195eaf9a4dd38cf90bd8512fcc99`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(URL)
      .then(({ data }) => {
        let sourceArr = data.articles.map((article) => {
          return article.source.name;
        });
        let uniqueSources = sourceArr.filter((v, i, a) => a.indexOf(v) === i);
        setSources(uniqueSources);
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading || sources.length == 0 ? (
        <View>
          <Loader />
        </View>
      ) : (
        <View>
          <FlatList
            data={sources}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push("Source", { category, source: item })
                }
              >
                <View style={styles.item}>
                  <Text style={styles.title}>{item}</Text>
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
