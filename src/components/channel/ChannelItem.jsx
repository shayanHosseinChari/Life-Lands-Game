import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { pinkColor, primaryColor } from "../../appsetting/appsettingColor";
import { border } from "../../appsetting/styleSetting";
import VideoItemComponent from "../../pages/tv/VideoItemComponent";
import SpaceStyle from "../../style/SpaceStyle";
import { Hr, Row, SpaceBetween } from "../../style/uiUtil";
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";

const ChannelItem = ({ item, navigation, justVoice }) => {
  const width = Dimensions.get("screen").width;
  const style = StyleSheet.create({
    center: {
      alignSelf: "center",
      marginRight: 5,
    },
  });
  return (
    <View>
      <SpaceStyle right={20} bottom={5} left={20}>
        <View>
          <SpaceBetween>
            <View></View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Single Channel", {
                  channelId: item.channelId,
                  id: item?._id,
                });
              }}
            >
              <View>
                <Row>
                  <CustomText style={style.center}>{item.title}</CustomText>
                  <CustomImage
                    image={item.image}
                    width={8}
                    radius={100}
                    aspect={1 / 1}
                  />
                </Row>
              </View>
            </TouchableOpacity>
          </SpaceBetween>
        </View>
      </SpaceStyle>
      <SpaceStyle>
        <FlatList
          style={{ width }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          inverted={true}
          horizontal
          data={justVoice ? item.voices : item.videos}
          renderItem={({ item: element, index }) => (
            <View>
              {justVoice ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Voice Play List", {
                      voiceId: element._id,
                      voice: element,
                    });
                  }}
                >
                  <CustomImage
                    image={element.image}
                    width={10}
                    height={50}
                    aspect={1 / 1}
                    right={index === 0 ? 20 : 12}
                  />
                </TouchableOpacity>
              ) : (
                <VideoItemComponent item={element} navigation={navigation} />
              )}
            </View>
          )}
        />
        <Hr />
      </SpaceStyle>
    </View>
  );
};
export default ChannelItem;
