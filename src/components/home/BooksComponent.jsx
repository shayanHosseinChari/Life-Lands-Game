import React, { createRef } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { postBorder } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { useNavigation } from "@react-navigation/native";

const BooksComponent = ({ books, navigation, title, flatList }) => {
  const width = Dimensions.get("window").width / 4.5;
  const router = useNavigation()
  return (
    <>
      {title && (
        <SpaceStyle bottom={10} top={20}>
          <CustomText>{title}</CustomText>
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
        keyExtractor={(item) => item?._id}
        horizontal={true}
        data={books}
        flatListRef={React.createRef()}
        ref={flatList}
        inverted={true}
        renderItem={({ item }) => (
          <SpaceStyle bottom={20}>
            <TouchableOpacity
              onPress={() => {
                router.navigate("Book Post", { id: item?._id });
              }}
            >
              <SpaceStyle left={5} right={5}>
                <CustomImage
                  image={item?.image}
                  width={4}
                  height={125}
                  styles={{borderRadius: 5}}
                  radius={postBorder}
                />
              </SpaceStyle>
              <SpaceStyle left={5} right={5} top={7}>
                <CustomText style={{ fontSize: 12 }} width={4}>
                  {item?.title}
                </CustomText>
                {/* <CustomText
                  style={{ fontSize: 6, marginTop: -2 }}
                  color={"#686874"}
                  width={5}
                >
                  اثر {item.author}
                </CustomText> */}
              </SpaceStyle>
            </TouchableOpacity>
          </SpaceStyle>
        )}
      />
    </>
  );
};
export default BooksComponent;
