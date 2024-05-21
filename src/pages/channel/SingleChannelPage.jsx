import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import SingleChannelHeaderComponent from "../../components/channel/single/SingleChannelHeaderComponent";
import {
  getChannelsVideosPlaylistsChannelsService,
  getMobileSingleChannelService,
  getSingleChannelService,
} from "../../service/channel";
import SingleChannelPlayListsTab from "../../components/channel/single/SingleChannelPlayListsTab";
import SingleChannelVideosTab from "../../components/channel/single/SingleChannelVideosTab";
import HeaderComponent from "../../components/layout/HeaderComponent";
import PlayListsVideoComponent from "../../components/playList/video/PlayListsVideoComponent";
import VideosListComponent from "../../components/posts/game/VideosListComponent";
import { View, FlatList, Dimensions } from "react-native";
import PlayListItem from "../../components/playList/voice/PlayListItem";
import CustomImage from "../../components/CustomImage/CustomImage";
import SpaceStyle from "../../style/SpaceStyle";
import CustomText from "../../components/text/CustomText";
import { TouchableOpacity } from "react-native";
import SingleChannelVoicesTab from "../../components/channel/single/SingleChannelVoicesTab";
import { StatusBar } from "expo-status-bar";
const Tab = createMaterialTopTabNavigator();
const SingleChannelPage = ({ route, navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const { colors } = useTheme();
  const id = route.params.channelId;
  const [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 20,
    type: "playlist",
    channelId: route.params.id,
    departmentTag: "playlist",
  });
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataResponse, setDataResponse] = useState({});
  const [videos, setVideos] = useState([]);
  const [voices, setVoices] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  let paging = (
    <>
      {isFinishPages ? (
        <>
          <CustomText style={{ alignSelf: "center" }}>تموم شد :(</CustomText>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setFilter({ ...filter, ...{ pageId: filter.pageId + 1 } });
          }}
        >
          <CustomText style={{ alignSelf: "center" }}>
            {" "}
            بیشتر نشونم بده...
          </CustomText>
        </TouchableOpacity>
      )}
    </>
  );
  useEffect(() => {
    getData();
  }, [filter]);
  const getData = async () => {
    if (filter.pageId === 1 && dataResponse[filter.departmentTag]?.length > 0)
      return;

    setIsLoading(true);
    const {
      data: { data: res },
    } = await getMobileSingleChannelService(filter);
    let type = filter.departmentTag;

    setIsFinishPages(res[type]?.length === 0);

    switch (type) {
      case "videos":
        if (filter.pageId == 1) {
          setVideos(res?.videos);
          setIsFinishPages(false);
        } else {
          let mergeLists = res.videos.concat(videos);
          setIsFinishPages(res?.videos?.length === 0);
          setVideos(mergeLists);
        }
        break;
      case "voices":
        if (filter.pageId == 1) {
          setVoices(res?.voices);
          setIsFinishPages(false);
        } else {
          let mergeLists = res.voices.concat(voices);
          setIsFinishPages(res?.voices?.length === 0);
          setVoices(mergeLists);
        }
        break;
      case "playlist":
        if (filter.pageId == 1) {
          setPlaylist(res?.playlist);
          setIsFinishPages(false);
        } else {
          let mergeLists = res.playlist.concat(playlist);
          setIsFinishPages(res?.playlist?.length === 0);
          setPlaylist(mergeLists);
        }
        break;
    }

    setDataResponse(res);
    setIsLoading(false);
  };
  const changeTabHanlder = (name) => {
    setIsFinishPages(false);
    setIsLoading(false);
    switch (name) {
      case "ویدیو":
        setFilter({
          ...filter,
          ...{
            eachPerPage: 20,
            pageId: 1,
            type: "video",
            departmentTag: "videos",
          },
        });
        break;
      case "صدا":
        setFilter({
          ...filter,
          ...{
            eachPerPage: 20,
            pageId: 1,
            type: "voice",
            departmentTag: "voices",
          },
        });
        break;
      case "لیست پخش":
        setFilter({
          ...filter,
          ...{
            eachPerPage: 20,
            pageId: 1,
            type: "playlist",
            departmentTag: "playlist",
          },
        });
        break;
    }
  };
  return (
    <Fragment>
      <StatusBar hidden={false} backgroundColor="transparent"/>
      <SingleChannelHeaderComponent channel={dataResponse.channel} />
      <Tab.Navigator
        screenListeners={(props) => {
          if (isLoading) return;
          changeTabHanlder(props?.route?.name);
        }}
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 2,
          },
          tabBarStyle: {
            backgroundColor: colors.background,
            marginTop: 18
          },
          tabBarLabelStyle: {
            fontFamily: "vaszir",
            color: colors.titleColor,
          },
          tabBarIndicatorStyle: {
            height: 2,
            backgroundColor: colors.primary,
            opacity: 0.5,
          },
        }}
      >
        <Tab.Screen
          name="لیست پخش"
          key={"playlist"}
          children={() => (
            <SingleChannelPlayListsTab
              navigation={navigation}
              paging={paging}
              playlist={playlist}
            />
          )}
        />
        {dataResponse?.channel?.channelType !== "voice" && (
          <Tab.Screen
            name="ویدیو"
            key={"video"}
            children={() => (
              <SingleChannelVideosTab
                navigation={navigation}
                videos={videos}
                paging={paging}
              />
            )}
          />
        )}
        {dataResponse?.channel?.channelType !== "video" && (
          <Tab.Screen
            name="صدا"
            key={"voice"}
            children={() => (
              <SingleChannelVoicesTab
                navigation={navigation}
                voices={voices}
                paging={paging}
              />
            )}
          />
        )}
         <Tab.Screen
            name="نظرات"
            key={"comment"}
            children={() => (
              <SingleChannelVoicesTab
                navigation={navigation}
                voices={voices}
                paging={paging}
              />
            )}
          />
      </Tab.Navigator>
    </Fragment>
  );
};
export default SingleChannelPage;
