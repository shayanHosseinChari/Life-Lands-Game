import React from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { border, postBorder } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";

const VideosComponent = ({ videos, navigation, flatList, title }) => {
  const width = Dimensions.get("window").width / 2.3;
  return (
    <>
      {title && (
        <SpaceStyle right={10} bottom={5} top={20}>
          <CustomText width={3} style={{ fontSize: 18 }}>
            {title}
          </CustomText>
        </SpaceStyle>
      )}

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
        flatListRef={React.createRef()}
        ref={flatList}
        keyExtractor={(item) => item._id}
        horizontal={true}
        data={videos}
        inverted={true}
        renderItem={({ item }) => (
          <SpaceStyle bottom={20}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Video Post", { id: item._id });
              }}
            >
              <SpaceStyle left={10} right={10}>
                <CustomImage
                  radius={postBorder}
                  image={item.image}
                  isMobileOPT={false}
                  width={2.5}
                  height={110}
                />
                <SpaceStyle top={7}>
                  <View style={{ marginTop: 10 }}>
                    <CustomText width={2.8} style={{ fontSize: 11 }}>
                      {item.title}
                    </CustomText>
                    <CustomText
                      width={2.8}
                      style={{ fontSize: 9 }}
                      color={"#686874"}
                    >
                      {item.category?.categoryId?.title}
                    </CustomText>
                    <CustomText
                      width={2.8}
                      style={{ fontSize: 9 }}
                      color={"#686874"}
                    >
                      {item.category?.playCount} بازدید {item.createdAt}
                    </CustomText>
                  </View>
                </SpaceStyle>
              </SpaceStyle>
            </TouchableOpacity>
          </SpaceStyle>
        )}
      />
    </>
  );
};
export default VideosComponent;
