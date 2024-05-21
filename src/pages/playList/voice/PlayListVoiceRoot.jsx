import Slider from "@react-native-community/slider";
import { getFileService } from "../../../service/FileService";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CustomImage from "../../../components/CustomImage/CustomImage";
import CustomText from "../../../components/text/CustomText";
import { getPublicPlayListsVoicesServer } from "../../../service/PlayListService";
import { followService } from "../../../service/UserService";
import SpaceStyle from "../../../style/SpaceStyle";
import { Audio } from "expo-av";
import { getValueFor } from "../../../appsetting/storeConfig";
import { LOAD_FILE } from "../../../service/APIs";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CenterStyled, Hr, Row } from "../../../style/uiUtil";
import { TouchableOpacity } from "react-native";
import { msToTime } from "../../../utility/TimeUtilities";
import { primaryColor } from "../../../appsetting/appsettingColor";
import PostActionComponent from "../../../components/share/PostActionComponent";
import VoiceActionComponent from "../../../components/playList/voice/VoiceActionComponent";
import MainVoiceActionComponent from "../../../components/playList/voice/MainVoiceActionComponent";
import LoadingDialog from "../../../components/share/LoadingDialog";
import PageWrapper from "../../../components/loading/PageWrapper";
import { border } from "../../../appsetting/styleSetting";
import { useTheme } from "@react-navigation/native";
const PlayListVoiceRoot = ({ navigation, route }) => {
  console.log(route.params.voiceId)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      Unload2
    );

    return async () => {
      backHandler.remove();
    };
  }, []);

  const { colors } = useTheme();
  const [isLoadingState, setIsLoadingState] = useState(true);
  const item = route.params.item;
  const windowHeight = Dimensions.get("window").height;
  const [soundVoice, setSoundVoice] = useState();
  const [lastVoiceState, setLastVoiceState] = useState({});
  const [url, setUrl] = useState();
  const [playList, setPlayList] = useState({});
  const [stopEv, setStopEv] = useState();

  const [voice, setVoice] = useState({});
  const [voiceId, setVoiceId] = useState(
    route.params.voiceId ? route.params.voiceId : "0"
  );
  const [isFollowed, setIsFollowed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  useEffect(() => {
    if (item) {
      setUrl(item?.file);
      playSound(item?.file);
      setIsLoadingState(false);
    } else {
      initVoiceSetting().then(() => {
        if (!getValueFor()) navigation.navigate("AlertScreen");
        getPlayList();

        if (getValueFor() && voiceId != "0") getVoiceUrl();
      });
    }
  }, [voiceId]);
  const initVoiceSetting = async () => {
    if (soundVoice) {
      await soundVoice?.sound?.stopAsync();
      await soundVoice?.sound?.unloadAsync();
      setLastVoiceState({});
    }
    setSoundVoice(null);
    setUrl(null);
  };

  const getPlayList = async () => {
    if (route.params.id) {
      setIsLoadingState(true);
      const {
        data: { data },
      } = await getPublicPlayListsVoicesServer(route.params.id, voiceId, {
        pageId: 1,
        eachPerPage: 12,
      });
      console.log(data.voice.voice);
      setPlayList(data.playList);
      data.voice.voice.playlistTitle = data?.playList?.title;
      setVoice(data.voice);
      setVoiceId(data.voiceId);

      setIsFollowed(data?.voice?.isFollowed);
      setIsLoadingState(false);
    } else {
      setIsLoadingState(false);
      setVoice(route.params.voice);
      setVoiceId(route.params.voiceId);
    }
  };
  const getVoiceUrl = async () => {
    console.log(voiceId);
    try {
      const { data } = await getFileService(
        voiceId,
        "voice",
        undefined,
        undefined
      );
      setUrl(data?.data?.url);
      playSound(data?.data?.url);
    } catch (error) {
      //console.log(error);
    }
  };
  const styled = StyleSheet.create({
    playListContainer: {
      backgroundColor: "rgba(0,0,0,0.4)",
      marginHorizontal: 10,
    },
    centerStyle: {
      alignSelf: "center",
    },
  });
  const moveVoice = (isNext) => {
    let itemIndex = playList.voiceIds?.findIndex(
      (item) => item._id === voiceId
    );
    //console.log(itemIndex);
    if (itemIndex >= playList.voiceIds?.length - 1 && isNext) return;
    if (itemIndex === 0 && !isNext) return;
    setVoiceId(playList?.voiceIds[isNext ? itemIndex + 1 : itemIndex - 1]._id);
  };

  const playSound = async (urlData) => {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
    setSoundVoice(
      await Audio.Sound.createAsync(
        {
          uri: item?._id ? urlData : LOAD_FILE + urlData,
        },
        undefined,
        (e) => {
          if (e.didJustFinish) moveVoice(true);

          setLastVoiceState(e);
        }
      )
    );
  };

  const soundAction = async (type) => {
    switch (type) {
      case "play":
        await soundVoice.sound.playAsync();
        break;
      case "pause":
        await soundVoice?.sound?.pauseAsync();
        break;
      case "stop":
        await soundVoice?.sound?.stopAsync();
        break;
      case "next":
        await soundVoice?.sound.playFromPositionAsync(
          lastVoiceState?.positionMillis + 30000
        );
        break;
      case "back":
        await soundVoice?.sound.playFromPositionAsync(
          lastVoiceState?.positionMillis - 10000
        );
        break;
      case "mute":
        await soundVoice?.sound.setIsMutedAsync(!lastVoiceState?.isMuted);
        break;
      case "rate":
        await soundVoice?.sound.setRateAsync(
          lastVoiceState?.rate > 2 ? 1 : lastVoiceState?.rate + 0.2
        );
        break;
    }
  };
  const chnageVoicePosition = async (number) => {
    await soundVoice?.sound.playFromPositionAsync(number);
  };
  const Unload2 = async () => {
    console.log("dddddddddddddddd");

    console.log("eeeeeeeeeee");
  };
  const Unload = async () => {
    console.log("dddddddddddddddd");
    await Audio.setAudioModeAsync({
      staysActiveInBackground: false,
    });
    await soundAction("pause");
    await soundVoice?.sound?.unloadAsync();
    setLastVoiceState(null);
    setSoundVoice(null);
    console.log("eeeeeeeeeee");
  };
  return (
    <PageWrapper isLoadingState={isLoadingState}>
      <CustomImage
        isBackground={true}
        image={item?._id ? item?.image : playList.coverImage || voice?.image}
        width={1}
        height={windowHeight}
        blur={20}
      >
        <LoadingDialog visibleValue={isDownloading} />
        <ScrollView>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              minHeight: windowHeight,
            }}
          >
            <SpaceStyle top={40} left={10}>
              <TouchableOpacity
                onPress={async () => {
                  await Unload();
                  navigation.goBack();
                }}
              >
                <Image
                  source={require("../../../../assets/icons/back.png")}
                  width={15}
                  height={15}
                  style={{
                    width: 15,
                    height: 15,
                    transform: [{ rotate: "180deg" }],
                  }}
                />
              </TouchableOpacity>
            </SpaceStyle>
            <ScrollView>
              {(playList._id || item?.title || voice?._id) && (
                <SpaceStyle top={10}>
                  <View style={styled.centerStyle}>
                    <CustomImage
                      width={1.5}
                      aspect={1 / 1}
                      image={
                        item?._id
                          ? item?.image
                          : voice?.voice?.image || voice?.image
                      }
                    />
                  </View>
                  <SpaceStyle top={10}>
                    <CustomText style={styled.centerStyle}>
                      {playList.title}
                    </CustomText>
                    <CustomText
                      color={colors.lightTextColor}
                      style={styled.centerStyle}
                    >
                      {voice?.voice?.title}
                    </CustomText>
                    {lastVoiceState?.isLoaded ? (
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          minHeight: 500,
                          borderTopRightRadius: 20,
                          borderTopLeftRadius: 20,
                        }}
                      >
                        <SpaceStyle bottom={10} top={10}>
                          <CenterStyled>
                            <View
                              style={{
                                backgroundColor: primaryColor,
                                borderRadius: border,
                                paddingHorizontal: 15,
                                paddingVertical: 3,
                              }}
                            >
                              <CustomText>
                                {msToTime(lastVoiceState?.positionMillis || 0)}{" "}
                                /{" "}
                                {msToTime(lastVoiceState?.durationMillis || 0)}
                              </CustomText>
                            </View>
                          </CenterStyled>
                        </SpaceStyle>
                        <Hr color={"rgba(250,250,250,0.1)"} />
                        <SpaceStyle right={20} left={20}>
                          {!item?._id && (
                            <PostActionComponent
                              department={"voice"}
                              isLike={(voice?.voice || voice).isLiked}
                              onDownloadAction={(e) => {
                                // setIsDownloading(!e);
                              }}
                              post={voice?.voice || voice}
                            />
                          )}
                        </SpaceStyle>

                        <VoiceActionComponent
                          item={item}
                          soundAction={soundAction}
                          moveVoice={moveVoice}
                          lastVoiceState={lastVoiceState}
                        />
                        <Slider
                          style={{ width: "100%", height: 40 }}
                          value={lastVoiceState?.positionMillis}
                          minimumValue={0}
                          onSlidingComplete={(e) => {
                            chnageVoicePosition(e);
                          }}
                          maximumValue={lastVoiceState?.durationMillis}
                          minimumTrackTintColor={primaryColor}
                          maximumTrackTintColor="#2f3035"
                          thumbTintColor={primaryColor}
                        />
                        <MainVoiceActionComponent
                          lastVoiceState={lastVoiceState}
                          soundAction={soundAction}
                        />
                        <CustomText right={10} left={10} top={10} lines={1000}>
                          {voice?.voice?.description}
                        </CustomText>
                      </View>
                    ) : (
                      <SpaceStyle top={80}>
                        <CenterStyled>
                          <CustomText>در حال بارگیری...</CustomText>
                        </CenterStyled>
                      </SpaceStyle>
                    )}
                  </SpaceStyle>
                </SpaceStyle>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </CustomImage>
    </PageWrapper>
  );
};
export default PlayListVoiceRoot;
