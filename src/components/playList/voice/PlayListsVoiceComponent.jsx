import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  lightBlueColor,
  primaryColor,
} from "../../../appsetting/appsettingColor";
import { border } from "../../../appsetting/styleSetting";
import SpaceStyle from "../../../style/SpaceStyle";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";
import PlayListItem from "./PlayListItem";

const PlayListsVoiceComponent = ({ playLists, navigation, flatList }) => {
  const width = Dimensions.get("screen").width;
  return (
    <SpaceStyle right={10}>
      <FlatList
          showsHorizontalScrollIndicator={false}

        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        keyExtractor={(item) => item?._id}
        horizontal={true}
        data={playLists}
        flatListRef={React.createRef()}
        ref={flatList}
        inverted={true}
        renderItem={({ item }) => (
          <PlayListItem item={item} navigation={navigation} />
        )}
      />
    </SpaceStyle>
  );
};
export default PlayListsVoiceComponent;
