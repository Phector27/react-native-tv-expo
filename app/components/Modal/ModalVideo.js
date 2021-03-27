import React from "react";
import { StyleSheet } from "react-native";
import { Modal, IconButton, Title, Colors } from "react-native-paper";

export default function ModalVideo(props) {
  const { show, setShow } = props;

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      <Title style={{ color: "white" }}>Hola Modal</Title>
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
