// import React from "react";
// import { Touchable } from "react-native";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   Dimensions,
//   TouchableWithoutFeedback,
// } from "react-native";
// import Carousel from "react-native-snap-carousel";

// const { width } = Dimensions.get("window");
// const ITEM_WIDTH = Math.round(width * 0.7);

// export default function ContentChildren(props) {
//   const { data, userInfo } = props;

//   return (
//     <Carousel
//       layout={"default"}
//       data={data}
//       renderItem={(item) => <RenderItem data={item} />}
//       sliderWidth={width}
//       itemWidth={ITEM_WIDTH}
//     />
//   );
// }

// function secondsToString(seconds) {
//   let hour = Math.floor(seconds / 3600);
//   hour = hour < 10 ? "0" + hour : hour;
//   let minute = Math.floor((seconds / 60) % 60);
//   minute = minute < 10 ? "0" + minute : minute;
//   let second = seconds % 60;
//   second = second < 10 ? "0" + second : second;
//   return hour + ":" + minute + ":" + second;
// }

// function RenderItem(props) {
//   const { data } = props;
//   const { title, cover, duration, section, url } = data.item;

//   let infantilMovies = []

//   for (let index = 0; index < data.item.length; index++) {
//     element = data.item[index];

//     element.section === 'Infantil '&& infantilMovies.push(element);
//   }
//   console.log(infantilMovies);


//   return (
//     <TouchableWithoutFeedback onPress={() => console.log("hola")}>
//       <View style={styles.card}>
//         <Image style={styles.image} source={{ uri: `${cover}` }} />
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.sectionSpan}>{section}</Text>
//         <Text style={styles.section}>
//           <Text style={styles.sectionSpan}>Duration: </Text>
//           {secondsToString(duration)}
//         </Text>
//         </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 10,
//     width: "70%",
//   },
//   image: {
//     width: "100%",
//     height: 300,
//     borderRadius: 20,
//     marginTop: 20,
//   },
//   title: {
//     marginTop: 10,
//     fontWeight: "bold",
//     textAlign: "center",

//     fontSize: 20,
//   },
//   section: {
//     marginHorizontal: 10,
//     textAlign: "center",
//   },
//   sectionSpan: {
//     fontWeight: "bold",
//     textAlign: "center",
//   },
// });
