import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { Image } from "react-native-elements";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import { secondsToHours } from "../../utils/secondsToHours";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.7);

export default function ContentMulti(props) {
  const { data, userInfo, navigation } = props;

  return (
    <Carousel
      layout={"default"}
      data={data}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
}

function RenderItem(props) {
  const { data, navigation } = props;
  const { title, cover, duration, section, url, id } = data.item;

  const onNavigation = () => {
    navigation.navigate("movie", { id });
  };
  return (
    <TouchableWithoutFeedback>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: `${cover}` }}
          onPress={onNavigation}
        />
        <MovieView url={url} id={id} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sectionSpan}>{section}</Text>
        <Text style={styles.section}>
          <Text style={styles.sectionSpan}>Duration: </Text>
          {secondsToHours(duration)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function MovieView(props) {
  const { url, id } = props;

  const navigation = useNavigation();

  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="eye"
        color="#00a680"
        size={30}
        style={styles.play}
        onPress={() => navigation.navigate("movie", { id })}
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
    marginBottom: 50,
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
