import React, { useState } from "react";
import { StyleSheet, View, Text, Platform, ScrollView } from "react-native";
import { Button, Avatar, Divider } from "react-native-elements";
import ContentMulti from "../Account/ContentMulti";

export default function UserLogged(props) {
  const { token } = props;
  let platform = Platform.OS;
  let tokenSaved = token;
  const [formData, setFormData] = useState({
    token: tokenSaved,
    device: platform === "ios" ? "ios" : "android",
  });
  const [userInfo, setUserInfo] = useState("");
  const [contentInfo, setContentInfo] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  let contents;
  let element;

  const onSubmit = async () => {
    const axios = require("axios");
    const qs = require("qs");
    let data = qs.stringify({
      token: `${formData.tokenSaved}`,
      device: `${formData.device}`,
    });
    let config = {
      method: "post",
      url: "https://dev.perseo.tv/ws/GetView.php",
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

  return (
    <ScrollView>
      <Text style={styles.titleLogIn}>Welcome to your private area:</Text>
      <View style={styles.viewUserInfo}>
        <Avatar
          source={{ uri: `${userInfo.avatar}` }}
          rounded
          title="P"
          size="large"
          avatarStyle={styles.logo}
        />
        <Text style={styles.nameUser}>
          {userInfo.name}
          {"\n"}
        </Text>
      </View>
      <Divider style={styles.divider} />

      <View>
        <Text style={styles.favsTitle}>
          {userInfo.avatar && "Content for you:"}
        </Text>
      </View>
      <View>
        <ContentMulti data={contentInfo} userInfo={userInfo} />
      </View>
      <Button
        title={userInfo.avatar ? null : "Please, press to see your content"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnGo}
        onPress={onSubmit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnCenter: {
    alignItems: "center",
  },
  btnContainer: {
    marginTop: 10,
  },
  btnGo: {
    backgroundColor: "#00a680",
  },
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 15,
  },
  favsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  nameUser: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
  },
  titleLogIn: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#454545",
  },
  divider: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  coverImg: {
    height: 200,
    width: "auto",
    borderRadius: 20,
    marginTop: 30,
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
    marginRight: 110,
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  infoMoviesContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
