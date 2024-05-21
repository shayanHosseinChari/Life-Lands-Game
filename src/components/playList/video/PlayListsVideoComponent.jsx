import { useTheme } from "@react-navigation/native";
import React from "react";
import { FlatList, View, Dimensions, TouchableOpacity } from "react-native";
import { postBorder } from "../../../appsetting/styleSetting";
import SpaceStyle from "../../../style/SpaceStyle";
import CustomImage from "../../CustomImage/CustomImage";
import CustomText from "../../text/CustomText";
import { RFPercentage } from "react-native-responsive-fontsize";
const PlayListsVideoComponent = ({
  navigation,
  playLists,
  flatList,
  horizontal = true,
  inverted = true,
}) => {
  console.log(playLists)
  const width = Dimensions.get("window").width;
  const { colors } = useTheme();

  return (
    <FlatList
    showsHorizontalScrollIndicator={false}

      getItemLayout={(data, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      snapToInterval={width}
      flatListRef={React.createRef()}
      ref={flatList}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{
        paddingHorizontal: RFPercentage(2)
      }}
      horizontal={horizontal}
      data={playLists}
      numColumns={!horizontal && 3}
      inverted={inverted}
      renderItem={({ item }) => (
        <View style={{marginRight: 9}}>
          <TouchableOpacity
          
            onPress={() => {
              if (item.department === "voice")
                navigation.navigate("Voice PlayList", { id: item._id });
              else navigation.navigate("Video Play List", { id: item._id });
            }}
          >
            <CustomImage
              image={item.coverImage}
              isBackground={true}
              width={3}
              aspect={4 / 3}
              radius={postBorder}
            >
              <View
                style={{
                  width: "40%",
                  height: "100%",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                <CustomText
                  color={colors?.lightTextColor}
                  style={{ alignSelf: "center", fontSize: 15 }}
                >
                  {item.childCount}
                </CustomText>
                <CustomText
                  color={colors?.lightTextColor}
                  style={{ alignSelf: "center" }}
                >
                  {item.department === "voice" ? "صدا" : "ویدیو"}
                </CustomText>
              </View>
            </CustomImage>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
export default PlayListsVideoComponent;
