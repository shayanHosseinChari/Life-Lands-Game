import { Video } from "expo-av";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { LOAD_FILE } from "../../service/APIs";
import * as ScreenOrientation from "expo-screen-orientation";
import { Icon } from "../../appsetting/icons";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { CenterStyled, Row } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";

const VideoPlayerComponent = ({
  videoURL,
  onFinish,
  videoBase64,
  uri,
  isFullScreen = false,
  forcePause,
}) => {
  const video = React.createRef(null);
  const { colors } = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isVideoMute, setIsVideoMute] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoStatus, setVideoStatus] = useState();

  let url = (videoURL?.includes("http") ? "" : LOAD_FILE) + videoURL;
  const _onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      if (onFinish) {
        onFinish();
      }
    }
  };
  useEffect(() => {
    if (forcePause) {
      video?.current?.pauseAsync();
    }
  }, [forcePause]);

  return (
    <View>
      <View>
        {!isLoaded && (
          <CenterStyled>
            <CustomText bottom={-80}>در حال دریافت . صبر کنید...</CustomText>
          </CenterStyled>
        )}
        <View
          style={{
            zIndex: 1000,
            marginBottom: -50,
            marginLeft: 5,
            height: 35,
          }}
        >
          <Row>
            <View>
              <TouchableOpacity
                onPress={() => {
                  video.current?.setPositionAsync(
                    videoStatus.positionMillis - 10000
                  );
                }}
                style={{
                  alignSelf: "center",
                  backgroundColor: colors.card,
                  padding: 5,
                  borderRadius: 10,
                  margin: 5,
                }}
              >
                <Icon
                  dark={require("../../../assets/icons/back-10-sec.png")}
                  light={require("../../../assets/icons/back-10-sec.png")}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  video.current?.setPositionAsync(
                    videoStatus.positionMillis + 30000
                  );
                }}
                style={{
                  alignSelf: "center",
                  backgroundColor: colors.card,
                  padding: 5,
                  borderRadius: 10,
                  margin: 5,
                }}
              >
                <Icon
                  dark={require("../../../assets/icons/skip-icon.png")}
                  light={require("../../../assets/icons/skip-icon.png")}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setIsVideoMute(!isVideoMute)}
                style={{
                  alignSelf: "center",
                  backgroundColor: colors.card,
                  padding: 5,
                  borderRadius: 10,
                  margin: 5,
                }}
              >
                {isVideoMute ? (
                  <Icon
                    dark={require("../../../assets/icons/voice-icon-mute.png")}
                    light={require("../../../assets/icons/voice-icon-mute.png")}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <Icon
                    dark={require("../../../assets/icons/voice-icon.png")}
                    light={require("../../../assets/icons/voice-icon.png")}
                    style={{ width: 20, height: 20 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </Row>
        </View>

        <Video
          onLoad={(e) => {
            if (videoStatus.playableDurationMillis > 5000) setIsLoaded(true);
          }}
          ref={video}
          style={{
            width: windowWidth,
            height: isFullScreen ? windowHeight : windowHeight / 3,
            marginTop: 10,
            zIndex: 1,
          }}
          source={{
            uri: uri ? uri : videoBase64 ? videoBase64 : url,
          }}
          onPlaybackStatusUpdate={(playbackStatus) => {
            _onPlaybackStatusUpdate(playbackStatus);
            setVideoStatus(playbackStatus);
          }}
          isMuted={isVideoMute}
          onFullscreenUpdate={async (e) => {
            if (e.fullscreenUpdate === 1) {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
              );
            } else {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
              );
            }
          }}
          collapsable
          shouldPlay={true}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
        />
      </View>
    </View>
  );
};
export default VideoPlayerComponent;
