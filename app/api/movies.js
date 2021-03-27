import { Platform } from "react-native";

let platform = Platform.OS;


export function getMovieByIdApi(idMovie) {
  const axios = require("axios");
  const qs = require("qs");
  let data = qs.stringify({
    token: "e77989ed21758e78331b20e477fc5582",
    device: platform === "ios" ? "ios" : "android",
    id: `${idMovie}`,
  });
  let config = {
    method: "post",
    url: "https://dev.perseo.tv/ws/Play.php",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
    let totalData;

  axios(config)
      .then((response) => {
          totalData = response.data
          return totalData
    })
    .catch((error) => {
      console.log(error);
    });
}
