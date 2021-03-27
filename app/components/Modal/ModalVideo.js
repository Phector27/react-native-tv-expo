import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Modal, IconButton, Title, Colors } from "react-native-paper";
import { WebView } from "react-native-webview";

export default function ModalVideo(props) {
  const { show, setShow, idMovie, urlMovie } = props;

  let widthScreen = Dimensions.get("window").width;

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      <WebView
        style={{ width: widthScreen }}
        source={{ uri: `${urlMovie}` }}
        allowsFullscreenVideo={true}
      />
      <IconButton
        icon="close"
        color={Colors.white}
        onPress={() => setShow(false)}
        style={styles.closeModal}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#000",
    height: "120%",
    alignItems: "center",
  },
  closeModal: {
    backgroundColor: "#1ea1f2",
    width: 50,
    height: 50,
    borderRadius: 100,
    position: "absolute",
    bottom: 100,
  },
});
