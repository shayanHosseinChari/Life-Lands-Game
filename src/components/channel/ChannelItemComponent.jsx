import { TouchableOpacity } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { View } from "react-native";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import { FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import CustomButton from "../CustomButton/CustomButton";
import { channelFollowService } from "../../service/ChannelFollowService";

const ChannelItemComponent = ({
  item,
  index,
  channels,
  navigation,
  setChannnelData,
}) => {
  const { colors } = useTheme();
  const onFollowHandler = async (channel) => {
    const { data } = await channelFollowService({
      channelId: channel?._id,
    });
    if (data.state) {
      let copy = [...channels];
      let index = copy.findIndex((item) => item?._id == channel?._id);
      copy[index].isFollowed = !copy[index].isFollowed;
      setChannnelData(copy);
    }
  };
  return (
    <SpaceStyle
      right={10}
      top={10}
      bottom={index === channels.length - 1 ? 40 : 20}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Single Channel", {
            channelId: item.channelId,
            id: item?._id,
          });
        }}
      >
        <SpaceBetween>
          <View style={{ justifyContent: "center" }}>
            <CustomText
              left={10}
              onClick={() => onFollowHandler(item)}
              color={item.isFollowed ? colors.red : colors.primary}
            >
              {item.isFollowed ? "دنبال نکردن" : "دنبال کردن"}
            </CustomText>
          </View>
          <Row>
            <View style={{ justifyContent: "center" }}>
              <SpaceStyle right={10}>
                <CustomText fontSize={13}>{item?.channelId}</CustomText>
                <CustomText fontSize={8} color={colors.lightTextColor}>
                  {item?.title}
                </CustomText>
              </SpaceStyle>
            </View>
            <CustomImage
              image={item?.image}
              width={6}
              height={70}
              aspect={1 / 1}
              radius={100}
            />
          </Row>
        </SpaceBetween>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(post, e) => e}
        data={item.posts}
        horizontal
        inverted
        renderItem={({ item: post }) => (
          <TouchableOpacity
            onPress={() => {
              if (post?.type === "video") {
                navigation.navigate("Video Post", { id: post._id });
              } else {
                navigation.navigate("Voice Play List", {
                  id: post?.playList,
                  voiceId: post._id,
                });
              }
            }}
          >
            <CustomImage
              left={10}
              image={post.image}
              width={10}
              radius={0}
              height={50}
              top={10}
              aspect={1 / 1}
            />
          </TouchableOpacity>
        )}
      />
    </SpaceStyle>
  );
};
export default ChannelItemComponent;
