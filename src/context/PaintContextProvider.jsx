import { PaintContext } from "./PaintContext";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { getValueFor } from "../appsetting/storeConfig";
import { LOAD_FILE } from "../service/APIs";

const PaintContextProvider = ({ children }) => {
  const [singlePaint, setSinglePaint] = useState({});

  const [lastVoiceState, setLastVoiceState] = useState({});
  const [soundVoice, setSoundVoice] = useState();
  const [forceValue] = useState();
  const [isShowNotifcation,setIsShowNotifcation] = useState(false)

  const [stopEv, setStopEv] = useState();
  useEffect(() => {
    // if (!getValueFor()) navigation.navigate("AlertScreen");
    // playSound();
  }, []);
  useEffect(() => {
    if (forceValue || forceValue === 0) {
      setForceValue();
    }
  }, [forceValue]);
  const setForceValue = async () => {
    await soundVoice?.sound.playFromPositionAsync(forceValue * 1000);
  };

  useEffect(() => {
    if (stopEv) stopEveryThings();
  }, [stopEv]);
  const stopEveryThings = async () => {
    soundAction("pause");
    await soundVoice?.sound?.unloadAsync();
    setLastVoiceState({});
    setSoundVoice(null);
    navigation.goBack();
  };
  const playSound = async (audioUrl) => {
    setSoundVoice(
      await Audio.Sound.createAsync(
        {
          uri: audioUrl,
        },
        undefined,
        (e) => {
          // if (e.didJustFinish) moveVoice(true);
          setLastVoiceState(e);
          soundAction("play");

          // onSecondProssessListener(e?.positionMillis);r
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
  const playVoiceHandler = async (item) => {
    if (!lastVoiceState || !lastVoiceState?.isPlaying) {
      setSinglePaint(item);
      playSound(`${LOAD_FILE}${item.voice}`);
    }
  };
  return (
    <PaintContext.Provider
      value={{
        singlePaint,
        playVoiceHandler,
        isShowNotifcation,
        setIsShowNotifcation
      }}
    >
      {children}
    </PaintContext.Provider>
  );
};
export default PaintContextProvider;
