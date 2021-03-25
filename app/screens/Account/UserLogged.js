import React, { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Button } from "react-native-elements";

export default function UserLogged(props) {
  const { token } = props;

  let platform = Platform.OS;
  const tokenSaved = token;

  const [formData, setFormData] = useState({
    token: tokenSaved,
    device: platform === "ios" ? "ios" : "android",
  });
    
    const [userInfo, setUserInfo] = useState('')

  console.log(formData);

  const onSubmit = () => {
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
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View>
      <Text></Text>
      <Button
        title="View private area content"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnGo}
        onPress={onSubmit}
      />
    </View>
  );
}

function userInfo() {

    return {
        user: {
            name: '',
            avatar: '',
            favs: [],
            lastShowed: []
        },
        contents: {
            
        }
    }
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 10,
    width: "90%",
  },
  btnGo: {
    backgroundColor: "#00a680",
  },
});
