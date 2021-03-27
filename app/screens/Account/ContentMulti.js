import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { IconButton } from "react-native-paper";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.7);

export default function ContentMulti(props) {
  const { data, userInfo } = props;

  return (
    <Carousel
      layout={"default"}
      data={data}
      renderItem={(item) => <RenderItem data={item} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
}

function secondsToString(seconds) {
  let hour = Math.floor(seconds / 3600);
  hour = hour < 10 ? "0" + hour : hour;
  let minute = Math.floor((seconds / 60) % 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = seconds % 60;
  second = second < 10 ? "0" + second : second;
  return hour + ":" + minute + ":" + second;
}

function RenderItem(props) {
  const { data } = props;
  const { title, cover, duration, section, url } = data.item;

  return (
    <TouchableWithoutFeedback onPress={() => console.log("hola")}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: `${cover}` }} />
        <MovieView url={url} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sectionSpan}>{section}</Text>
        <Text style={styles.section}>
          <Text style={styles.sectionSpan}>Duration: </Text>
          {secondsToString(duration)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function MovieView(props) {
  const { url } = props;

  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#00a680"
        size={30}
        style={styles.play}
        onPress={() => Linking.openURL(`${url}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    width: "70%",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",

    fontSize: 20,
  },
  section: {
    marginHorizontal: 10,
    textAlign: "center",
  },
  sectionSpan: {
    fontWeight: "bold",
    textAlign: "center",
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
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
