import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/pixlr-bg-result(1).png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Check your Perseo-TV profile 👧</Text>
      <Text style={styles.description}>
        How will you describe your best TV platform? Search and visualize best
        channels in a simple way. Vote which one you liked the most and comment
        on your experience 🚀
      </Text>
      <View style={styles.viewBtn}>
        <Button
          title="Go to profile"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "#15212b",
    paddingTop: 150,
  },
  image: {
    height: 300,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
    color: "#c1c1c1",
    marginRight: 30,
    marginLeft: 30,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    marginRight: 30,
    marginLeft: 30,
    color: "#c1c1c1",
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    width: "70%",
  },
});
