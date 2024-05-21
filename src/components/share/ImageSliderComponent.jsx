import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  FlatList,
} from "react-native";
import SpaceStyle from "../../style/SpaceStyle";

const { width } = Dimensions.get("window");

const photos = [
  {
    uri: "http://185.105.239.182:4400/upload/file-1668513177156.png",
  },
  {
    uri: "http://185.105.239.182:4400/upload/file-1668513146944.png",
  },
  {
    uri: "http://185.105.239.182:4400/upload/file-1668513177156.png",
  },
  {
    uri: "http://185.105.239.182:4400/upload/file-1668513146944.png",
  },
  // { uri: 'https://cdn.skillflow.io/resources/img/skillflowninja.png' }
];

export default class Slideshow extends React.Component {
  scrollX = new Animated.Value(0);

  render() {
    let position = Animated.divide(this.scrollX, width);

    return (
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: this.scrollX } } },
        ])}
      >
        <View style={{ direction: "rtl" }}>
          {photos.map((source, i) => (
            <Image
              key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
              style={{ width, height: width * 0.2 }}
              source={source}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}
