import { FlatList, Image, TouchableOpacity, View } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import ChannelsComponent from "../ChannelsComponent";
import { Row, SpaceBetween } from "../../../style/uiUtil";
import CustomText from "../../text/CustomText";
import CustomImage from "../../CustomImage/CustomImage";
import { useNavigation, useTheme } from "@react-navigation/native";
import NavigateActionComponent from "../NavigateActionComponent";
import CustomButton from "../../CustomButton/CustomButton";
import { channelFollowService } from "../../../service/ChannelFollowService";
import { useState } from "react";
import ChannelsListComponent from "../../channel/ChannelsListComponent";

const ChannelHomeRoot = ({ channels }) => {
  const navigation = useNavigation();
  const [channelsData, setChannnelData] = useState(channels);
  const [loadingState, setLoadingState] = useState({
    _id: undefined,
    loading: false,
  });
  const { colors } = useTheme();

  const onFollowHandler = async (channel) => {
    setLoadingState({
      _id: channel?._id,
      loading: true,
    });
    const { data } = await channelFollowService({
      channelId: channel?._id,
    });
    setLoadingState({
      _id: undefined,
      loading: false,
    });
    if (data.state) {
      let copy = [...channelsData];
      let index = copy.findIndex((item) => item?._id == channel?._id);
      copy[index].isFollowed = !copy[index].isFollowed;
      setChannnelData(copy);
    }
  };
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("Channels Page")}>
        <SpaceStyle right={20} left={20} bottom={15} top={20}>
          <View>
            <SpaceBetween>
              <View style={{ alignSelf: "center", marginTop: 10 }}>
                <NavigateActionComponent>صفحه اصلی</NavigateActionComponent>
              </View>
              <Row>
                <CustomText style={{ marginRight: 10, marginBottom: 8 }}>
                  کانال
                </CustomText>
                <Image
                  source={require("../../../../assets/icons/tv.png")}
                  style={{ width: 30, height: 30 }}
                />
              </Row>
            </SpaceBetween>
          </View>
        </SpaceStyle>
      </TouchableOpacity>

      <FlatList
          showsHorizontalScrollIndicator={false}

        keyExtractor={(item) => item._id}
        style={{ marginBottom: 50 }}
        data={channels}
        renderItem={({ item, index }) => (
          <SpaceStyle
            right={10}
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
                    color={item.isFollowed ? colors.red : colors.primary}
                    onClick={() => {
                      if (!loadingState.loading) onFollowHandler(item);
                    }}
                    styles={{ marginLeft: 10, marginTop: 5 }}
                  >
                    {loadingState._id == item?._id && loadingState.loading ? (
                      <>صبرکنید...</>
                    ) : (
                      <>{item.isFollowed ? "دنبال نکردن" : "دنبال کردن"}</>
                    )}
                  </CustomText>
                </View>
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
              </SpaceBetween>
            </TouchableOpacity>
            <FlatList
                showsHorizontalScrollIndicator={false}

              keyExtractor={(item) => item._id}
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
        )}
      />
    </>
  );
};
export default ChannelHomeRoot;
