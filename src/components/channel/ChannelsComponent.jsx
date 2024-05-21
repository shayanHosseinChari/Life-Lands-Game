import { FlatList } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomButton from "../CustomButton/CustomButton";
import CustomText from "../text/CustomText";
import CustomImage from "../CustomImage/CustomImage";
import { channelFollowService } from "../../service/ChannelFollowService";
import { View } from "react-native";

const ChannelsComponent = ({ channels, setChannels }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const onFollowHandler = async (channel) => {
    const { data } = await channelFollowService({
      channelId: channel?._id,
    });
    if (data.state) {
      let copy = [...channels];
      let index = copy.findIndex((item) => item?._id == channel?._id);
      copy[index].isFollowed = !copy[index].isFollowed;
      setChannels(copy);
    }
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      data={channels}
      renderItem={({ item, index }) => (
        <SpaceStyle right={10} bottom={index === channels.length - 1 ? 40 : 20}>
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Single Channel", {
                  channelId: item.channelId,
                  id: item?._id,
                });
              }}
            >
              <Row>
                <View style={{ justifyContent: "center" }}>
                  <SpaceStyle right={10}>
                    <CustomText fontSize={13}>{item?.channelId}</CustomText>
                    <CustomText fontSize={8} color={colors.lightTextColor}>
                      {item?.channelId}
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
            </TouchableOpacity>
          </SpaceBetween>
        </SpaceStyle>
      )}
    />
  );
};
export default ChannelsComponent;
