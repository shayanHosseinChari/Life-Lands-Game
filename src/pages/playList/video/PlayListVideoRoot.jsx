import { Fragment, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getValueFor } from "../../../appsetting/storeConfig";
import { getFileService } from "../../../service/FileService";
import {
  getPlayListsVideosService,
  getPublicPlayListsVideosServer,
} from "../../../service/PlayListService";
import SpaceStyle from "../../../style/SpaceStyle";
import VideoPlayerComponent from "../../../components/game/VideoPlayerComponent";
import VideosListComponent from "../../../components/posts/game/VideosListComponent";
import CustomText from "../../../components/text/CustomText";
import { Hr, Row, SpaceAround, SpaceBetween } from "../../../style/uiUtil";
import CommentsComponent from "../../../components/posts/share/CommentsComponent";
import { grayColor, lightTextColor } from "../../../appsetting/appsettingColor";
import VideoUserInformationComponent from "../../../components/game/VideoUserInformationComponent";
import { followService } from "../../../service/UserService";
import LoadingDialog from "../../../components/share/LoadingDialog";
import VideoHeaderInformation from "../../../components/game/VideoHeaderInformation";
import PostActionComponent from "../../../components/share/PostActionComponent";
import PageWrapper from "../../../components/loading/PageWrapper";
import { useTheme } from "@react-navigation/native";
import { border } from "../../../appsetting/styleSetting";
import { Icon } from "../../../appsetting/icons";
import HeaderComponent from "../../../components/layout/HeaderComponent";
import CustomImage from "../../../components/CustomImage/CustomImage";
import VideoPlayListItemComponent from "../../../components/posts/game/VideoPlayListItemComponent";
import { FlatList } from "react-native";

const PlayListVideoRoot = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [isShowPlayList, setIsShowPlayList] = useState(true);
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [url, setUrl] = useState();
  const [forcePause, setForcePause] = useState();
  const [playList, setPlayList] = useState({});
  const [video, setVideo] = useState({});
  const [videoId, setVideoId] = useState("0");
  const [isFollowed, setIsFollowed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoFileData, setVideoFileData] = useState();
  const [nextVideo, setNextVideo] = useState();
  const [preVideo, setPreVideo] = useState();
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [videos, setVideos] = useState([]);
  let [filter, setFilter] = useState({
    pageId: 1,
    eachPerPage: 12,
    searchValue: "",
  });
  useEffect(() => {
    getVideosList();
  }, [filter]);
  useEffect(() => {
    if (!getValueFor()) navigation.navigate("AlertScreen");
    getPlayList();

    if (getValueFor() && videoId != "0") getVideoUrl();
  }, [videoId]);

  const getPlayList = async () => {
    setIsLoadingState(true);
    try {
      const {
        data: { data },
      } = await getPublicPlayListsVideosServer(route.params.id, videoId, {
        pageId: 1,
        eachPerPage: 12,
      });

      setPlayList(data.playList);
      setVideo(data.video);
      setVideoId(data.videoId);
      setIsFollowed(data?.video?.isFollowed);
      setIsLoadingState(false);
      aroundVideos();
    } catch (error) {}
    setIsLoadingState(false);
  };
  const getVideosList = async () => {
    const {
      data: { data: res },
    } = await getPlayListsVideosService(route.params.id, filter);

    let mergeLists = [...videos, ...res?.playList?.videoIds];
    setIsFinishPages(res?.playList?.videoIds?.length === 0);
    setVideos(mergeLists);
  };
  const getVideoUrl = async () => {
    try {
      const { data, status } = await getFileService(
        videoId,
        "video",
        undefined,
        undefined
      );
      setUrl(data?.data?.url);
      setVideoFileData(data.data);
    } catch (error) {}
  };
  const styled = StyleSheet.create({
    centerStyle: {
      alignSelf: "center",
    },
    playlistCard: {
      backgroundColor: colors.card,
      paddingBottom: 15,
      borderRadius: border,
      paddingHorizontal: 20,
      zIndex: 5000,
    },
    headerBackIconStyle: {
      width: 12,
      height: 12,
      marginHorizontal: 20,
      marginTop: 25,
    },
    playListContainer: {
      backgroundColor: colors.darkCard,
      paddingVertical: 20,
      marginTop: -12,
      paddingHorizontal: 10,
      zIndex: 1,
      borderBottomLeftRadius: border,
      borderBottomRightRadius: border,
    },
  });
  const moveVideo = (isNext) => {
    let itemIndex = playList?.videoIds?.findIndex(
      (item) => item._id === videoId
    );
    //console.log(itemIndex);
    if (itemIndex >= playList?.videoIds?.length - 1 && isNext) return;
    if (itemIndex === 0 && !isNext) return;
    setVideoId(playList.videoIds[isNext ? itemIndex + 1 : itemIndex - 1]._id);
  };
  const aroundVideos = () => {
    let itemIndex = playList?.videoIds?.findIndex(
      (item) => item._id === videoId
    );
    //next part
    if (itemIndex >= playList?.videoIds?.length - 1) {
      setPreVideo(playList?.videoIds[itemIndex - 1]);
      setNextVideo(null);
      return;
    }
    //not next part
    if (itemIndex === 0) {
      setNextVideo(playList.videoIds[itemIndex + 1]);
      setPreVideo(null);
      return;
    }
    setNextVideo(playList.videoIds[itemIndex + 1]);
    setPreVideo(playList.videoIds[itemIndex - 1]);
  };
  const onFollowHandler = async () => {
    const {
      data: { isFollow },
    } = await followService(video?.video?.creator?.userId?._id);
    setIsFollowed(isFollow);
  };
  const onNavigate = async () => {
    setForcePause(Date.now());
  };
  return (
    <>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../../assets/icons/youtube.png")}
        lightIcon={require("../../../../assets/icons/Light/youtubelight.png")}
        navigation={navigation}
        title={"فهرست پخش"}
      />
      <PageWrapper
        onRefresh={() => {
          if (!getValueFor()) navigation.navigate("AlertScreen");
          getPlayList();

          if (getValueFor() && videoId != "0") getVideoUrl();
        }}
        isLoadingState={isLoadingState}
      >
        <Fragment>
          <LoadingDialog visibleValue={isDownloading} />
          <ScrollView>
            {url && (
              <VideoPlayerComponent
                forcePause={forcePause}
                onFinish={() => {
                  moveVideo(true);
                }}
                videoURL={url}
              />
            )}
            <SpaceStyle top={20} bottom={10} right={20} left={20}>
              <TouchableOpacity
                onPress={() => setIsShowPlayList(!isShowPlayList)}
              >
                <View style={styled.playlistCard}>
                  <SpaceBetween>
                    <View>
                      <Icon
                        style={{
                          ...styled.headerBackIconStyle,
                          ...{
                            transform: [
                              { rotate: isShowPlayList ? "-90deg" : "90deg" },
                            ],
                          },
                        }}
                        dark={require("../../../../assets/icons/back.png")}
                        light={require("../../../../assets/icons/Light/backlight3.png")}
                      />
                    </View>
                    <SpaceStyle top={15}>
                      <CustomText>{playList.title}</CustomText>
                      <CustomText color={grayColor} style={{ fontSize: 10 }}>
                        تعداد ویدیو : {playList.childCount}
                      </CustomText>
                    </SpaceStyle>
                  </SpaceBetween>
                </View>
              </TouchableOpacity>
              {isShowPlayList && playList?.videoIds?.length > 0 && (
                <View style={styled.playListContainer}>
                  <FlatList
                      showsHorizontalScrollIndicator={false}

                    keyExtractor={(item) => item?._id}
                    data={videos}
                    inverted={false}
                    renderItem={({ item }) => (
                      <VideoPlayListItemComponent
                        item={item}
                        navigation={navigation}
                        onClick={(id) => {
                          setVideoId(id);
                        }}
                      />
                    )}
                  />
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
                </View>
              )}
            </SpaceStyle>
            <SpaceStyle right={10} left={10} top={20}>
              {videoFileData && (
                <VideoHeaderInformation
                  post={video.video}
                  setIsDownloading={setIsDownloading}
                  video={video}
                  fileId={videoFileData?.fileId}
                  fileUrl={videoFileData?.url}
                  mimetype={videoFileData?.mimetype}
                />
              )}
            </SpaceStyle>

            <SpaceStyle right={10} left={10} top={20} bottom={20}>
              <VideoUserInformationComponent
                video={video}
                onNavigate={onNavigate}
                onFollowHandler={onFollowHandler}
                isFollowed={isFollowed}
              />
            </SpaceStyle>

            <SpaceStyle right={10} left={10}>
              <CustomText lines={10000}>{video?.video?.description}</CustomText>
            </SpaceStyle>

            <Hr />
            <SpaceStyle right={20} left={20} top={20}>
              <SpaceBetween>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Posts Comments", {
                      id: videoId,
                      department: "video",
                    })
                  }
                >
                  <CustomText color={lightTextColor}>نمایش همه</CustomText>
                </TouchableOpacity>
                <CustomText>نظرات اخیر</CustomText>
              </SpaceBetween>
            </SpaceStyle>
            <CommentsComponent
              navigation={navigation}
              commentsData={video}
              id={videoId}
            />
            <SpaceStyle top={20}>
              <VideosListComponent
                title={"ویدیو های مشابه"}
                navigation={navigation}
                videos={video?.suggestion}
                onNavigate={onNavigate}
              />
            </SpaceStyle>
          </ScrollView>
        </Fragment>
      </PageWrapper>
    </>
  );
};
export default PlayListVideoRoot;
