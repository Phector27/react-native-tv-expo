import React, { useState } from "react";
import { StyleSheet, View, Text, Platform, Image } from "react-native";
import { Button, Avatar, Divider } from "react-native-elements";
import { map } from "lodash";

export default function UserLogged(props) {
  const { token } = props;

  let platform = Platform.OS;
  const tokenSaved = token;

  const [formData, setFormData] = useState({
    token: tokenSaved,
    device: platform === "ios" ? "ios" : "android",
  });

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  var axios = require("axios");
  var qs = require("qs");
  var data = qs.stringify({
    token: `${formData.token}`,
    device: `${formData.device}`,
  });
  var config = {
    method: "post",
    url: "https://dev.perseo.tv/ws/GetView.php",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      setUserName(response.data.user.name);
      setUserAvatar(response.data.user.avatar);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <View>
      <Text style={styles.titleLogIn}>Welcome to your private area </Text>
      <View style={styles.viewUserInfo}>
        <Avatar
          source={{ uri: `${userAvatar}` }}
          size="large"
          avatarStyle={styles.logo}
        />
        <Text style={styles.nameUser}>{userName}</Text>
      </View>
      <Divider style={styles.divider} />
      <View>
        <Text style={styles.favsTitle}>Favs ♡</Text>
      </View>
      {/* <View>
        {favs &&
          map(favs, (id, index) => (
            <Text key={index}>{id}</Text>
          ))}
      </View> */}
      <View style={styles.btnCenter}>
        <Button
          title="View private area content"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnGo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnCenter: {
    alignItems: "center",
  },
  btnContainer: {
    marginTop: 10,
    width: "50%",
  },
  btnGo: {
    backgroundColor: "#00a680",
    width: "60%",
  },
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
  },
  logo: {
    marginRight: 20,
  },
  favsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 40,
  },
  nameUser: {
    fontWeight: "bold",
    fontSize: 18,
  },
  titleLogIn: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#454545",
  },
  divider: {
    margin: 30,
  },
});
