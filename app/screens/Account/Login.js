import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Image, Linking, Webview } from "react-native";
import { Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/Account/LoginForm";

export default function Login() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <Image
          source={require("../../../assets/img/perseo-tv.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.textImg}>Perseo TV</Text>
        <Divider style={styles.divider} />
        <View style={styles.viewContainer}>
                  <LoginForm toastRef={toastRef}/>
          <CreateAccount />
        </View>
      </ScrollView>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

function CreateAccount() {

  const url = 'https://perseo.tv/'

  const registerBtn = () => {
    Linking.openURL(url)
  }
 
  return (
    <Text style={styles.textRegister}>
      Don't have an account yet? {"  "}
      <Text style={styles.btnRegister} onPress={registerBtn}>
        Register NOW!
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  textImg: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 10,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divider: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
});
