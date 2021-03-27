import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { IconButton, Title } from "react-native-paper";
import ModalVideo from "../../components/Modal/ModalVideo";
// import { getMovieByIdApi } from "../../api/movies";

export default function Movie(props) {
  const { route } = props;
  const { id } = route.params;
  const [dataMovie, setDataMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  // console.log(dataMovie && dataMovie)
  {
    dataMovie && console.log(dataMovie && dataMovie.cover);
  }

  useEffect(() => {
    getMovieByIdApi(id);
  }, []);

  const getMovieByIdApi = async (idMovie) => {
    let platform = Platform.OS;
    const axios = require("axios");
    const qs = require("qs");
    let data = qs.stringify({
      token: "e77989ed21758e78331b20e477fc5582",
      device: platform === "ios" ? "ios" : "android",
      id: `${idMovie}`,
    });
    let config = {
      method: "post",
      url: "https://dev.perseo.tv/ws/Play.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    await axios(config)
      .then(async (response) => {
        await setDataMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ScrollView style={styles.view}>
        <MovieImage cover={dataMovie && dataMovie.cover} />
        <MovieTrailer setShowVideo={setShowVideo} />
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} />
    </>
  );
}

function MovieImage(props) {
  const { cover, id, dataMovie } = props;

  return (
    <View style={styles.viewInfoMovie}>
      <Image style={styles.cover} source={{ uri: `${cover}` }} />
    </View>
  );
}

function MovieTrailer(props) {
  const { setShowVideo } = props;

  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#00a680"
        size={40}
        style={styles.play}
        onPress={() => setShowVideo(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#15212b",
  },
  viewInfoMovie: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  cover: {
    width: "100%",
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  play: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#00a680",
    marginTop: -35,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});
