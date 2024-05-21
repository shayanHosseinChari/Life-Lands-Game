import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import VideoPlayerComponent from "../../components/game/VideoPlayerComponent";
import CustomText from "../../components/text/CustomText";
import * as ScreenOrientation from "expo-screen-orientation";

const VideoPlayer = ({ route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isInit, setIsInit] = useState(false);
  const [uri, setUri] = useState();
  const item = route?.params?.item;
  //console.log(item);
  useEffect(() => {
    initPage();
  }, []);
  useEffect(() => {
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setIsInit(false);
    };
  }, []);

  const initPage = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
    setTimeout(() => {
      setIsInit(true);
    }, 100);
  };
  const style = StyleSheet.create({
    videoPlayer: {
      flex: 1,
      width: windowWidth,
      height: windowHeight,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginTop: -100,
    },
  });

  return (
    <>
      {item.file && isInit ? (
        <View style={style.videoPlayer}>
          <VideoPlayerComponent
            isFullScreen={true}
            uri={item.file}
            onFinish={() => {}}
          />
        </View>
      ) : (
        <View style={style.container}>
          <CustomText>در حال بارگیری از حافظه...</CustomText>
        </View>
      )}
    </>
  );
};
export default VideoPlayer;
