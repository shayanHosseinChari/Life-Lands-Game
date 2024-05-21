import { LinearGradient } from "expo-linear-gradient";
import { Fragment, useEffect, useState } from "react";

import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Icon } from "../../../appsetting/icons";
import { border, postBorder } from "../../../appsetting/styleSetting";
import CustomImage from "../../../components/CustomImage/CustomImage";
import CustomText from "../../../components/text/CustomText";
import { getPlayListsVoicesService } from "../../../service/PlayListService";
import SpaceStyle from "../../../style/SpaceStyle";
import { Hr, Row, SpaceBetween } from "../../../style/uiUtil";
import HeaderComponent from "../../../components/layout/HeaderComponent";

const PlayListsVoicesRoot = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [voices, setVoices] = useState([]);

  const style = StyleSheet.create({
    icon: {
      width: 20,
      height: 20,
    },
    topMenu: {
      height: 30,
    },
    headerContainer: { backgroundColor: colors.card, maxHeight: 120 },
  });
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
  });
  const [playlist, setPlaylist] = useState({});
  const playlistId = route.params.id;
  useEffect(() => {
    getData();
  }, [filter]);
  const getData = async () => {
    const {
      data: { data: res },
    } = await getPlayListsVoicesService(playlistId, filter);

    let mergeLists = [...voices, ...res?.playList?.voiceIds];
    setIsFinishPages(res?.playList?.voiceIds?.length === 0);
    setVoices(mergeLists);

    setPlaylist(res.playList);
  };
  return (
    <Fragment>
      {/* <LinearGradient
        style={{ zIndex: -2, elevation: -2, paddingTop: 20 }}
        colors={["#192240", "#1b2d43"]}
      ></LinearGradient> */}
      <View style={style.headerContainer}>
        <View style={style.topMenu}>
          <SpaceBetween>
            <TouchableOpacity
              style={{ width: 60, height: 60 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                style={{
                  ...{ transform: [{ rotate: "180deg" }] },
                  width: 20,
                  height: 20,
                  marginTop: 10,
                  marginLeft: 10,
                }}
                dark={require("../../../../assets/icons/back.png")}
                light={require("../../../../assets/icons/Light/backlight3.png")}
              />
            </TouchableOpacity>

            <SpaceStyle top={40} left={10}></SpaceStyle>
          </SpaceBetween>
        </View>
        <Row>
          <SpaceStyle top={10}>
            <CustomText color={colors.white} style={{ fontSize: 13 }}>
              {playlist?.title}
            </CustomText>
            <SpaceStyle top={10}>
              <Row>
                <SpaceStyle top={3} right={7}>
                  <CustomText color={colors.lightTextColor}>
                    {playlist?.creator?.userId?.userName}
                  </CustomText>
                </SpaceStyle>
                <CustomImage
                  image={playlist?.creator?.userId?.profileImage}
                  linkUserId={playlist?.creator?.userId?._id}
                  aspect={1 / 1}
                  radius={50}
                  width={18}
                />
              </Row>
            </SpaceStyle>
            <CustomText color={colors.lightTextColor}>
              تعداد قسمت ها : {playlist?.childCount}
            </CustomText>
          </SpaceStyle>
          <SpaceStyle>
            <CustomImage
              styles={{
                alignSelf: "flex-start",
                margin: 10,
              }}
              image={playlist?.coverImage}
              aspect={1 / 1}
              width={4}
              radius={border}
            />
          </SpaceStyle>
        </Row>
      </View>

      <SpaceStyle top={10}>
        <ScrollView>
          <SpaceStyle top={20}>
            <SpaceStyle right={20} bottom={10}>
              <CustomText>تعداد قسمت ها : {playlist?.childCount}</CustomText>
            </SpaceStyle>
            <FlatList
                showsHorizontalScrollIndicator={false}

              data={voices}
              keyExtractor={(item) => item?._id}
              renderItem={({ item, index }) => (
                <View>
                  <CustomText>{index + 1}</CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      console.log({
                        id: playlist?._id,
                        voiceId: item._id,
                      });
                      navigation.navigate("Voice Play List", {
                        id: playlist?._id,
                        voiceId: item._id,
                      });
                    }}
                  >
                    <SpaceStyle right={20} left={20}>
                      <SpaceBetween>
                        <View
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* <Icon
                            style={style.icon}
                            dark={require("../../../../assets/icons/Download1.png")}
                            light={require("../../../../assets/icons/Light/download-button.png")}
                          /> */}
                        </View>
                        <View>
                          <Row>
                            <SpaceStyle right={10} top={5}>
                              <CustomText style={{ fontSize: 13 }}>
                                {item.title}
                              </CustomText>
                              <SpaceStyle top={15}>
                                <CustomText color={colors.lightTextColor}>
                                  {playlist.title}
                                </CustomText>
                                <CustomText color={colors.lightTextColor}>
                                  {item.createdAt}
                                </CustomText>
                              </SpaceStyle>
                            </SpaceStyle>
                            <CustomImage
                              aspect={1 / 1}
                              image={item?.image}
                              width={5}
                              radius={border}
                            />
                          </Row>
                        </View>
                      </SpaceBetween>
                    </SpaceStyle>
                  </TouchableOpacity>
                  <Hr color={colors.hr} />
                </View>
              )}
            />
            <SpaceStyle bottom={130}>
              {isFinishPages ? (
                <View>
                  <CustomText style={{ alignSelf: "center" }}>
                    تموم شد :(
                  </CustomText>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setFilter({
                        ...filter,
                        ...{ pageId: filter.pageId + 1 },
                      });
                    }}
                  >
                    <CustomText style={{ alignSelf: "center" }}>
                      بیشتر نشونم بده...
                    </CustomText>
                  </TouchableOpacity>
                </View>
              )}
            </SpaceStyle>
          </SpaceStyle>
        </ScrollView>
      </SpaceStyle>
    </Fragment>
  );
};
export default PlayListsVoicesRoot;
