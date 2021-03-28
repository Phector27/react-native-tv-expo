import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Platform, ScrollView } from "react-native";
import { Avatar, Divider, Button } from "react-native-elements";
import { API_GET, PASSWORD } from "../../utils/constants";
import ContentMulti from "../Account/ContentMulti";

export default function UserLogged(props) {
  const { token, navigation } = props;
  const tokenSaved = token;

  const [formData, setFormData] = useState({
    token: tokenSaved,
    device: platform === "ios" ? "ios" : "android",
  });
  const [userInfo, setUserInfo] = useState("");
  const [contentInfo, setContentInfo] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  let platform = Platform.OS;
  let contents;
  let element;

  const getData = async () => {
    const axios = require("axios");
    const qs = require("qs");
    let data = qs.stringify({
      token: `${formData.tokenSaved}`,
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

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.loggedView}>
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
        <ContentMulti
          data={contentInfo}
          userInfo={userInfo}
          navigation={navigation}
        />
      </View>
      <View style={styles.viewBtn}>
        <Button
          title="Search by name 🔎"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("search")}
        />
      </View>
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

    paddingTop: 15,
  },
  favsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  nameUser: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    marginTop: 15,
  },
  titleLogIn: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "#454545",
  },
  divider: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    marginTop: 5,
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
  viewBtn: {
    flex: 1,
    alignItems: "center",
    color: "#000",
    marginTop: 25,
    marginBottom: 50,
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
