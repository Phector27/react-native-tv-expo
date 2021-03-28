import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { IconButton } from "react-native-paper";
import ModalVideo from "../../components/Modal/ModalVideo";
import { secondsToHours } from "../../utils/secondsToHours";

export default function Movie(props) {
  const { route } = props;
  const { id } = route.params;
  const [dataMovie, setDataMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

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
        alert('Error: ', error, 'Please, contact with an admin App.');
      });
  };

  return (
    <>
      <ScrollView style={styles.view}>
        <MovieImage cover={dataMovie && dataMovie.cover} />
        <MovieTrailer setShowVideo={setShowVideo} />
        <MovieTitle dataMovie={dataMovie} />
        <MovieRating
          votes={dataMovie && dataMovie.votes}
          totalVotes={dataMovie && dataMovie.totalVotes}
        />
      </ScrollView>
      <ModalVideo
        show={showVideo}
        setShow={setShowVideo}
        idMovie={id}
        urlMovie={dataMovie && dataMovie.url} //
      />
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

function MovieTitle(props) {
  const { dataMovie } = props;

  let durationMovie = secondsToHours(dataMovie && dataMovie.duration);

  return (
    <View style={styles.viewDetails}>
      <Text style={styles.titleMovie}>
        {dataMovie && dataMovie.title}
        <Text style={styles.ratingAge}> ({dataMovie && dataMovie.rating})</Text>
        <Text style={styles.duration}> {durationMovie} ⌛</Text>
      </Text>
      <View style={styles.viewGenre}>
        <Text style={styles.textView}>{dataMovie && dataMovie.section}</Text>
      </View>
    </View>
  );
}

function MovieRating(props) {
  const { votes, totalVotes } = props;

  return (
    <View style={styles.viewRating}>
      <Text style={styles.textView}>
        <Text style={styles.spanText}>Total votes:</Text> {totalVotes}
      </Text>
      <Text style={styles.textView}>
        <Text style={styles.spanText}>Positive votes: </Text>
        {votes}
      </Text>
      <Text style={styles.textView}>
        <Text style={styles.spanText}>Average: </Text>
        {(votes * 100) / totalVotes / 20 <= 5
          ? `${((votes * 100) / totalVotes / 20).toFixed()}/5 ⭐`
          : "Wrong data average.\nMore Total votes than positive or 0 Total votes"}
      </Text>
      <Text style={styles.synopsisView}>
        <Text style={styles.spanText}>Synopsis: </Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
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
    height: 400,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
  viewDetails: {
    marginHorizontal: 30,
  },
  titleMovie: {
    color: "#c2c2c2",
    fontSize: 20,
    fontWeight: "bold",
  },
  viewGenre: {
    flexDirection: "row",
  },
  textView: {
    color: "#c2c2c2",
    marginTop: 2,
  },
  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  spanText: {
    fontWeight: "bold",
    fontStyle: "normal",
  },
  duration: {
    color: "#c2c2c2",
    fontSize: 12,
    fontWeight: "100",
  },
  ratingAge: {
    color: "#c2c2c2",
    fontSize: 10,
    fontWeight: "100",
  },
  synopsisView: {
    color: "#c2c2c2",
    marginTop: 10,
    fontStyle: "italic",
  },
});
