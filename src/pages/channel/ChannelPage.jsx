import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import CustomImage from "../../components/CustomImage/CustomImage";
import CategoryItem from "../../components/home/CategoryItem";
import CustomText from "../../components/text/CustomText";
import CustomCard from "../../components/CustomCard/CustomCard";
import SpaceStyle from "../../style/SpaceStyle";
import { getChannelService } from "../../service/channel";
import { Row, SpaceBetween } from "../../style/uiUtil";
import VideosComponent from "../../components/home/VideosComponent";
import PageWrapper from "../../components/loading/PageWrapper";
import HeaderComponent from "../../components/layout/HeaderComponent";

const ChannelPage = ({ route, navigation }) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const [channel, setChannel] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setIsLoadingState(true);
    const {
      data: { data: channelData },
    } = await getChannelService(route?.params?.id);
    setChannel(channelData);
    setIsLoadingState(false);
  };
  return (
    <>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/comments.png")}
        lightIcon={require("../../../assets/icons/Light/commentslight.png")}
        navigation={navigation}
        title={"کانال"}
      />
      <PageWrapper
        onRefresh={() => {
          getData();
        }}
        isLoadingState={isLoadingState}
      >
        {channel?.channel?._id && (
          <ScrollView>
            <View>
              <CustomImage
                image={channel?.channel?.headerImage}
                width={1}
                height={170}
                radius={0}
                isBackground={true}
              >
                <View
                  style={{
                    width: "90%",
                    height: "90%",
                    marginHorizontal: 20,
                    justifyContent: "flex-end",
                  }}
                >
                  <Image source={require("../../../assets/icons/Star.png")} />
                </View>
              </CustomImage>
              <View
                style={{
                  alignSelf: "flex-end",
                  marginTop: -60,
                  marginRight: 20,
                }}
              >
                <CustomImage
                  image={channel?.channel?.userId?.profileImage}
                  width={120}
                  linkUserId={channel?.channel?.userId?._id}
                  radius={100}
                  aspect={1 / 1}
                  height={120}
                />
                <View style={{ alignSelf: "center", marginTop: 15 }}>
                  <CustomText>{channel?.channel?.title}</CustomText>
                  <CustomText>
                    {channel?.channel?.userId.followersCount} دنبال کننده
                  </CustomText>
                </View>
              </View>
              <SpaceStyle right={30} left={30} top={20}>
                <SpaceBetween>
                  <View>
                    <CustomCard styles={{ width: windowWidth / 5 }}>
                      <View style={{ alignSelf: "center" }}>
                        <Image
                          source={require("../../../assets/icons/Information.png")}
                          style={{ width: 50, height: 50, alignSelf: "center" }}
                        />
                        <CustomText
                          color={"white"}
                          style={{ alignSelf: "center", fontSize: 10 }}
                        >
                          درباره ما
                        </CustomText>
                      </View>
                    </CustomCard>
                  </View>
                  <View>
                    <CustomCard styles={{ width: windowWidth / 5 }}>
                      <View style={{ alignSelf: "center" }}>
                        <Image
                          source={require("../../../assets/icons/Playlist-TV.png")}
                          style={{ width: 50, height: 50, alignSelf: "center" }}
                        />
                        <CustomText
                          color={"white"}
                          style={{ alignSelf: "center", fontSize: 10 }}
                        >
                          لیست پخش
                        </CustomText>
                      </View>
                    </CustomCard>
                  </View>
                  <View>
                    <CustomCard styles={{ width: windowWidth / 5 }}>
                      <View style={{ alignSelf: "center" }}>
                        <Image
                          source={require("../../../assets/icons/zoom.png")}
                          style={{ width: 50, height: 50, alignSelf: "center" }}
                        />
                        <CustomText
                          color={"white"}
                          style={{ alignSelf: "center", fontSize: 10 }}
                        >
                          ویدیو ها
                        </CustomText>
                      </View>
                    </CustomCard>
                  </View>

                  <View>
                    <CustomCard styles={{ width: windowWidth / 5 }}>
                      <View style={{ alignSelf: "center" }}>
                        <Image
                          source={require("../../../assets/icons/HOME1.png")}
                          style={{ width: 50, height: 50, alignSelf: "center" }}
                        />
                        <CustomText
                          style={{ alignSelf: "center", fontSize: 10 }}
                        >
                          خانه
                        </CustomText>
                      </View>
                    </CustomCard>
                  </View>
                </SpaceBetween>
              </SpaceStyle>
              <SpaceStyle bottom={7} top={15} right={20}>
                <CustomText style={{ fontSize: 15 }}>بیشترین پخش</CustomText>
              </SpaceStyle>
              <VideosComponent
                navigation={navigation}
                videos={channel.topPlay}
              />
              <SpaceStyle bottom={7} top={15} right={20}>
                <CustomText style={{ fontSize: 15 }}>بیشترین امتیاز</CustomText>
              </SpaceStyle>
              <VideosComponent
                navigation={navigation}
                videos={channel.topScore}
              />
              <SpaceStyle bottom={7} top={15} right={20}>
                <CustomText style={{ fontSize: 15 }}>جدید ترین</CustomText>
              </SpaceStyle>
              <VideosComponent
                navigation={navigation}
                videos={channel.newest}
              />
            </View>
          </ScrollView>
        )}
      </PageWrapper>
    </>
  );
};
export default ChannelPage;
const style = StyleSheet.create({});
