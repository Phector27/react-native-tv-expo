import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { Button } from "react-native-elements";
import { map } from "lodash";
import { PASSWORD, API_GET } from "../utils/constants";

const { width } = Dimensions.get("window");

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    token: PASSWORD,
    device: platform === "ios" ? "ios" : "android",
  });
  const [userInfo, setUserInfo] = useState("");
  const [contentInfo, setContentInfo] = useState([]);

  useEffect(() => {
    getData(search);
  }, [search]);

  let platform = Platform.OS;
  let contents;
  let element;

  const getData = async (search) => {
    const axios = require("axios");
    const qs = require("qs");
    let data = qs.stringify({
      token: `${PASSWORD}`,
      device: `${formData.device}`,
    });
    let config = {
      method: "post",
      url: `${API_GET}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    await axios(config)
      .then(async (response) => {
        await setUserInfo(response.data.user);
        contents = response.data.contents;
        let elementsInfo = [];
        for (let index = 0; index < contents.length; index++) {
          element = contents[index];
          elementsInfo.push(element);
        }
        await setContentInfo(elementsInfo);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const searchFor = (search) => {
    const copyData = [...contentInfo];
    const filterMovies = copyData.filter((elm) =>
      elm.title.toLowerCase().includes(search.toLowerCase())
    );
    setContentInfo(filterMovies);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Searchbar
        placeholder="Search movie..."
        placeholderTextColor="white"
        onChangeText={searchFor}
        style={styles.searchBar}
        iconColor="white"
      />
      <ScrollView>
        <View style={styles.container}>
          {map(contentInfo, (movie, index) => (
            <SearchMovie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
        <View style={styles.viewBtn}>
          <Button
            title="Reload all movies ♻️"
            onPress={getData}
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SearchMovie(props) {
  const { movie, navigation } = props;
  const { id, cover } = movie;

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("movie", { id })}
    >
      <View style={styles.movie}>
        <Image style={styles.imageSearch} source={{ uri: `${cover}` }} />
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.section}>{movie.section}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 40,
    backgroundColor: "#15212b",
  },
  searchBar: {
    backgroundColor: "#15212b",
    borderRadius: 0,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#15212b",
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#15212b",
    paddingTop: 20,
  },
  imageSearch: {
    width: "80%",
    height: "80%",
    borderRadius: 20,
  },
  movieTitle: {
    fontWeight: "bold",
    color: "#c1c1c1",
    textAlign: "center",
    marginTop: 5,
  },
  section: {
    color: "#c1c1c1",
    textAlign: "center",
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
    color: "#000",
    marginTop: 25,
    marginBottom: 300,
  },
  btnStyle: {
    backgroundColor: "#c1c1c1",
    color: "black",
    borderRadius: 50,
  },
  btnContainer: {
    width: "50%",
  },
});
