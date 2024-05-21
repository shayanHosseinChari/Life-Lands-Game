import Slider from "@react-native-community/slider";
import { useTheme } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { primaryColor } from "../../appsetting/appsettingColor";
import { getValueFor } from "../../appsetting/storeConfig";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { msToTime } from "../../utility/TimeUtilities";

const VoicePlayer = ({
  navigation,
  item,
  book,
  hasNextAction,
  onNextAction,
  forceValue,
  hasBackAction,
  onBackAction,
  dynamicWidth,
  onSecondProssessListener = () => {},
  stopEv,
  onDrag,
  playerAction,
}) => {
  const widthWindow = Dimensions.get("window").width;
  const { colors } = useTheme();

  useEffect(() => {
    soundAction(playerAction);
  }, [playerAction]);
  const style = StyleSheet.create({
    slider: {
      width: "75%",
      height: 40,
    },
    icon: {
      width: 30,
      height: 30,
      marginHorizontal: 10,
      marginTop: 5,
    },
    largeIcon: {
      width: 40,
      height: 40,
      marginHorizontal: 10,
    },
    changePage: {
      fontSize: 8,
      backgroundColor: 'transparent',
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginHorizontal: 10,
    },
  });
  const [lastVoiceState, setLastVoiceState] = useState({});
  const [soundVoice, setSoundVoice] = useState();
  useEffect(() => {
    if (!getValueFor()) navigation.navigate("AlertScreen");
    playSound();
  }, []);
  useEffect(() => {
    if (forceValue || forceValue === 0) {
      setForceValue();
    }
  }, [forceValue]);
  const setForceValue = async () => {
    let isPlaying = lastVoiceState.isPlaying;
    await soundVoice?.sound.playFromPositionAsync(forceValue * 1000);
    if (!isPlaying) soundAction("pause");
  };

  useEffect(() => {
    if (stopEv) stopEveryThings();
  }, [stopEv]);
  const stopEveryThings = async () => {
    soundAction("pause");
    await soundVoice?.sound?.unloadAsync();
    setLastVoiceState({});
    setSoundVoice(null);
    // navigation.goBack();
  };
  const playSound = async () => {
    setSoundVoice(
      await Audio.Sound.createAsync(
        {
          uri: item.audioFile,
        },
        undefined,
        (e) => {
          setLastVoiceState(e);

          onSecondProssessListener(e?.positionMillis);
        }
      )
    );
  };
  const soundAction = async (type) => {
    switch (type) {
      case "play":
        await soundVoice?.sound.playAsync();
        break;
      case "pause":
        await soundVoice?.sound?.pauseAsync();
        break;
      case "stop":
        await soundVoice?.sound?.stopAsync();
        break;
      case "next":
        await soundVoice?.sound.playFromPositionAsync(
          lastVoiceState.positionMillis + 5000
        );
        break;
      case "back":
        await soundVoice?.sound.playFromPositionAsync(
          lastVoiceState.positionMillis - 5000
        );
        break;
      case "mute":
        await soundVoice?.sound.setIsMutedAsync(!lastVoiceState.isMuted);
        break;
      case "rate":
        await soundVoice?.sound.setRateAsync(
          lastVoiceState?.rate > 2 ? 1 : lastVoiceState?.rate + 0.2
        );
        break;
    }
  };
  const chnageVoicePosition = async (number) => {
    let isPlaying = lastVoiceState.isPlaying;
    await soundVoice?.sound.playFromPositionAsync(number);
    console.log(number);
    if (onDrag) onDrag(number);
    if (!isPlaying) soundAction("pause");
  };

  return (
    <View right={10} left={10} style={{marginHorizontal:10}}>
      <View >
        <View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "space-between",
              alignSelf: "center",
              flexDirection: "row",
              width: dynamicWidth || widthWindow,
              alignItems: "center",
            }}
          >
            {hasBackAction && hasNextAction && (
              <View style={{ width: 0 }}></View>
            )}
            <View style={{ width: widthWindow - 60 }}>
              <SpaceBetween>
              <View style={{width:"100%",flexDirection:'row',justifyContent:"center"}}>
                    {hasBackAction && (
                      <View>
                        <SpaceStyle top={10}>
                          <TouchableOpacity
                            onPress={() => {
                              onBackAction();
                            }}
                          >
                            <CustomText style={style.changePage}>
                              صفحه قبلی
                            </CustomText>
                          </TouchableOpacity>
                        </SpaceStyle>
                      </View>
                    )}
                    <View>
                      <SpaceStyle top={10}>
                        <TouchableOpacity
                          onPress={() => {
                            soundAction("mute");
                          }}
                        >
                          {lastVoiceState?.isMuted ? (
                            <Image
                              source={require("../../../assets/icons/voice-icon-mute.png")}
                              width={20}
                              style={{ width: 20, height: 20 }}
                              height={20}
                            />
                          ) : (
                            <Image
                              source={require("../../../assets/icons/voice-icon.png")}
                              width={20}
                              style={{ width: 20, height: 20 }}
                              height={20}
                            />
                          )}
                        </TouchableOpacity>
                      </SpaceStyle>
                    </View>

                    <View>
                      <Row>
                        <TouchableOpacity onPress={() => soundAction("back")}>
                          <Image
                            style={style.icon}
                            source={require("../../../assets/icons/next5.png")}
                          />
                        </TouchableOpacity>
                        {lastVoiceState.isPlaying ? (
                          <TouchableOpacity
                            onPress={() => soundAction("pause")}
                          >
                            <Image
                              style={style.largeIcon}
                              source={require("../../../assets/icons/pose_e.png")}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={() => soundAction("play")}>
                            <Image
                              style={style.largeIcon}
                              source={require("../../../assets/icons/play_e.png")}
                            />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => soundAction("next")}>
                          <Image
                            style={style.icon}
                            source={require("../../../assets/icons/back5.png")}
                          />
                        </TouchableOpacity>
                      </Row>
                    </View>

                    <View>
                      <SpaceStyle top={10}>
                        <TouchableOpacity
                          onPress={() => {
                            soundAction("rate");
                          }}
                        >
                          {lastVoiceState.rate && (
                            <CustomText style={{ fontSize: 15 }}>
                              {(lastVoiceState.rate + "").substring(0, 3)} X
                            </CustomText>
                          )}
                        </TouchableOpacity>
                      </SpaceStyle>
                    </View>

                    {hasNextAction && (
                      <View>
                        <SpaceStyle top={10}>
                          <TouchableOpacity
                            onPress={() => {
                              onNextAction();
                            }}
                          >
                            <CustomText style={style.changePage}>
                              صفحه بعدی
                            </CustomText>
                          </TouchableOpacity>
                        </SpaceStyle>
                      </View>
                    )}
                  </View>

                {book && (
                  <View>
                    <SpaceStyle right={-20} top={0}>
                      <View style={{ width: 150 }}>
                        <Row>
                          <View>
                            <SpaceStyle right={5} top={5}>
                              <CustomText width={4}>{book.title}</CustomText>
                              <CustomText
                                style={{ fontSize: 8 }}
                                color={colors.lightTextColor}
                                width={6}
                              >
                                نویسنده : {book.author}
                              </CustomText>
                            </SpaceStyle>
                          </View>
                          <CustomImage
                            image={book.image}
                            aspect={3 / 4}
                            radius={0}
                            width={24}
                          />
                        </Row>
                      </View>
                    </SpaceStyle>
                  </View>
                )}
              </SpaceBetween>
            </View>
          </View>
        </View>
        {soundVoice && (
          <View style={{flexDirection:"row"}}>
            <View style={{ marginTop: 10 }}>
              <CustomText>
                {msToTime(lastVoiceState?.positionMillis || 0)}
              </CustomText>
            </View>
            <Slider
              style={style.slider}
              value={lastVoiceState?.positionMillis}
              minimumValue={0}
              onSlidingComplete={chnageVoicePosition}
              maximumValue={lastVoiceState?.durationMillis}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor="#2f3035"
              thumbTintColor={primaryColor}
            />
            <View style={{ width: "12%", marginTop: 10 }}>
              <CustomText>
                {msToTime(lastVoiceState?.durationMillis || 0)}
              </CustomText>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export default VoicePlayer;
