import { Dimensions, FlatList } from "react-native";
import PaintItemHomePageComponent from "./PaintItemHomePageComponent";
import React from "react";

const PaintsHomePageComponent = ({ lastPaints, navigation, flatList }) => {
  const width = Dimensions.get("window").width / 6.5;

  return (
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
      data={lastPaints}
      flatListRef={React.createRef()}
      ref={flatList}
      inverted={true}
      renderItem={({ item }) => (
        <PaintItemHomePageComponent item={item} navigation={navigation} />
      )}
    />
  );
};
export default PaintsHomePageComponent;
