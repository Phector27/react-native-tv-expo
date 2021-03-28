import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

export default function ShowFavourite(props) {
  const { isFavourite, favs, id } = props;
  const [favouriteSaved, setfavouriteSaved] = useState(isFavourite);

  const addFavourites = () => {
    setfavouriteSaved(!favouriteSaved);
  };

  return (
    <View style={styles.viewFavourite}>
      <Icon
        type="material-community"
        name={favouriteSaved ? "heart" : "heart-outline"}
        onPress={addFavourites}
        color={favouriteSaved ? "red" : "black"}
        size={20}
        underlayColor="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewFavourite: {
    position: "absolute",
    top: -35,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
    padding: 15,
  },
});
