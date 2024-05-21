import { Fragment, useEffect, useState } from "react";
import { CustomText } from "../../components/text/CustomText";
import { Rating, AirbnbRating } from "react-native-ratings";
import SpaceStyle from "../../style/SpaceStyle";
import { Video, AVPlaybackStatus } from "expo-av";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LOAD_FILE } from "../../service/APIs";
import { getFileService } from "../../service/FileService";
import {
  getVideoAPIService,
  insertCommentService,
} from "../../service/PostService";
import { Hr, Row, SpaceBetween } from "../../style/uiUtil";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomButton from "../../components/CustomButton/CustomButton";
import { followService } from "../../service/UserService";
import {
  lightTextColor,
  pinkColor,
  primaryColor,
  yellowColor,
} from "../../appsetting/appsettingColor";

import CommentsComponent from "../../components/posts/share/CommentsComponent";
import VideosListComponent from "../../components/posts/game/VideosListComponent";
import VideoPlayerComponent from "../../components/game/VideoPlayerComponent";
import VideoHeaderInformation from "../../components/game/VideoHeaderInformation";
import VideoUserInformationComponent from "../../components/game/VideoUserInformationComponent";
import { getToken, getValueFor } from "../../appsetting/storeConfig";
import SlidersComponent from "../../components/home/SlidersComponent";
import LoadingDialog from "../../components/share/LoadingDialog";
import PostChannelInfo from "../../components/posts/share/PostChannelInfo";

const VideoPost = (navigation) => {
  const [isLoadingState, setIsLoadingState] = useState(true);
  const { id } = navigation?.route?.params;
  const [video, setVideo] = useState();
  const [videoURL, setVideoURL] = useState();
  const [isFollowed, setIsFollowed] = useState(false);
  const [videoFileData, setVideoFileData] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const [forcePause, setForcePause] = useState();

  useEffect(() => {
    getData();
    getFile();
  }, []);

  const getData = async () => {
    setIsLoadingState(true);
    const {
      data: { data: videoResponse },
    } = await getVideoAPIService(id, { pageId: 1, eachPerPage: 12 });
    setVideo(videoResponse);
    console.log("videoResponsevideoResponsevideoResponsevideoResponse");
    console.log(videoResponse?.video?.channel);
    setIsFollowed(videoResponse?.isFollowed);
    setIsLoadingState(false);
  };

  const getFile = async () => {
    if (getValueFor())
      try {
        const { data } = await getFileService(
          id,
          "video",
          undefined,
          undefined
        );

        setVideoURL(data?.data?.url);
        setVideoFileData(data.data);
      } catch (error) {
        //console.log(error);
      }
    else navigation.navigation.navigate("AlertScreen");
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
      
     <ScrollView>
          <LoadingDialog visibleValue={isDownloading} />

          {videoURL && getToken() && (
            <VideoPlayerComponent videoURL={videoURL} forcePause={forcePause} />
          )}
          {video && (
            <SpaceStyle right={20} left={20} top={10}>
              <SlidersComponent sliders={video?.sliders} />
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
              <Hr />
              <VideoUserInformationComponent
                video={video}
                onFollowHandler={onFollowHandler}
                onNavigate={onNavigate}
                isFollowed={isFollowed}
              />

              {video?.video?.channel?._id && (
                <PostChannelInfo
                  channel={video?.video?.channel}
                  navigation={navigation.navigation}
                />
              )}
              <Hr />
              <SpaceStyle right={20} left={20} top={20}>
                <SpaceBetween>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigation.navigate("Posts Comments", {
                        id,
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
                navigation={navigation.navigation}
                commentsData={video?.commentsData}
                id={id}
              />
              <SpaceStyle top={20}>
                <VideosListComponent
                  title={"ویدیو های مشابه"}
                  navigation={navigation?.navigation}
                  onNavigate={onNavigate}
                  videos={video?.suggestion}
                />
              </SpaceStyle>
            </SpaceStyle>
          )}
        </ScrollView>
    </>
  );
};
export default VideoPost;
