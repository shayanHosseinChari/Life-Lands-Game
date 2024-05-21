import { Fragment, useEffect, useState } from "react";
import { getFileService } from "../../service/FileService";
import VoicePlayer from "./VoicePlayer";
import * as ScreenOrientation from "expo-screen-orientation";
import CustomText from "../../components/text/CustomText";
import {
  BackHandler,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Row, SpaceAround } from "../../style/uiUtil";
import { LOAD_FILE } from "../../service/APIs";
import { getBookAPIService } from "../../service/PostService";
import SpaceStyle from "../../style/SpaceStyle";
import { Icon } from "../../appsetting/icons";
import { useTheme } from "@react-navigation/native";
import { border } from "../../appsetting/styleSetting";

const CustomizeBookReader = ({
  navigation,
  route: {
    params: { customizeBookId },
  },
}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { colors } = useTheme();
  const [pageNumberText, setPageNumberText] = useState("");
  const [isControllerHide, setIsControllerHide] = useState(false);
  const [forceValue, setForceValue] = useState();
  const [stopEv, setStopEv] = useState();
  const [book, setBook] = useState({});
  const [customizedBook, setCustomizedBook] = useState({});
  const [firstPageObject, setFirstPageObject] = useState({});

  const [playerAction, setPlayerAction] = useState();
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  useEffect(() => {
    getData();
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }, []);
  useEffect(() => {
    return () => {
      setDataBeforBack();
    };
  }, []);
  const setDataBeforBack = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };
  const getData = async () => {
    const {
      data: { data: res },
    } = await getFileService(customizeBookId, "book");
    const {
      data: { data: bookRes },
    } = await getBookAPIService(customizeBookId, { pageId: 1, eachPerPage: 1 });

    console.log(res);
    setBook(bookRes.book);
    setCustomizedBook(res);
    setFirstPageObject(res.customizePages[firstIndex]);
  };
  const changePage = (isNext) => {
    if (isNext && firstIndex + 1 > customizedBook.customizePages?.length) {
      setForceValue(0);
      return;
    }
    if (!isNext && firstIndex === 0) {
      setForceValue(0);
      return;
    }
    let first = isNext ? firstIndex + 1 : firstIndex - 1;
    setFirstIndex(first);
    setFirstPageObject(customizedBook.customizePages[first]);

    setForceValue(customizedBook?.customizePages[first]?.second);

    if (firstIndex >= 0) {
      setPageNumberText(
        `صفحه ی  ${customizedBook.customizePages[first]?.pageNumber} از ${
          customizedBook.customizePages[
            customizedBook.customizePages.length - 1
          ].pageNumber
        } صفحه `
      );
    }
  };
  const pageRule = (second) => {
    let index = customizedBook?.customizePages?.findIndex(
      (element) => Number(element.second) == Number(second)
    );
    if (index >= 0) {
      setFirstPageObject(customizedBook.customizePages[index]);
      setPageNumberText(
        `صفحه ی  ${customizedBook.customizePages[index]?.pageNumber} از ${
          customizedBook.customizePages[
            customizedBook.customizePages.length - 1
          ].pageNumber
        } صفحه `
      );
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      changeStopEvState
    );

    return () => {
      backHandler.remove();
      changeStopEvState();
    };
  }, []);
  const changeStopEvState = () => {
    setStopEv(Date.now());
  };
  const onDrag = (number) => {
    let lastPage;
    let lastPageIndex;
    let second = (number.toFixed(0) / 1000).toFixed(0);
    for (let i = 0; i < customizedBook.customizePages.length; i++) {
      const element = customizedBook.customizePages[i];
      if (element.second <= second) {
        lastPage = element;
        lastPageIndex = i;
      } else break;
    }
    setFirstPageObject(lastPage);
    setFirstIndex(lastPageIndex);
    setPageNumberText(
      `صفحه ی  ${customizedBook.customizePages[lastPageIndex]?.pageNumber} از ${
        customizedBook.customizePages[customizedBook.customizePages.length - 1]
          .pageNumber
      } صفحه `
    );
  };
  return (
    <View>
      {firstPageObject?._id && book?._id && (
        <View>
          <View
            style={{
              width: 30,
              height: 30,
              alignSelf: "center",
              zIndex: 100,
              position: "absolute",
              left: 0,
              top: "40%",
            }}
          >
            <TouchableOpacity onPress={() => changePage(false)}>
              <Icon
                dark={require("../../../assets/icons/back.png")}
                light={require("../../../assets/icons/back.png")}
                style={{
                  width: 25,
                  height: 25,

                  transform: [{ rotate: "181deg" }],
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 30,
              height: 30,
              alignSelf: "center",
              zIndex: 100,
              position: "absolute",
              right: 0,
              top: "40%",
            }}
          >
            <TouchableOpacity onPress={() => changePage(true)}>
              <Icon
                dark={require("../../../assets/icons/back.png")}
                light={require("../../../assets/icons/back.png")}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "rgba(52, 52, 52, 0)",
              position: "absolute",
              marginTop: 20,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              width: 60,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                changeStopEvState();
                navigation.goBack();
              }}
            >
              <View
                style={{
                  backgroundColor: "rgb(52,52,52)",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <Row>
                  <Icon
                    style={{
                      ...{ width: 10, height: 10, alignSelf: "center" },
                      ...{ transform: [{ rotate: "180deg" }] },
                    }}
                    dark={require("../../../assets/icons/back.png")}
                    light={require("../../../assets/icons/Light/backlight3.png")}
                  />
                  <CustomText
                    color={"white"}
                    style={{ padding: 5, alignSelf: "center" }}
                  >
                    بازگشت
                  </CustomText>
                </Row>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "rgba(52, 52, 52, 0)",
              position: "absolute",
              marginTop: 20,
              top: 0,
              bottom: 0,
              right: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(52,52,52)",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            >
              <CustomText
                color={"white"}
                style={{ padding: 5, alignSelf: "center" }}
              >
                {pageNumberText}
              </CustomText>
            </View>
          </View>

          <View>
            <SpaceAround>
              <Image
                source={{
                  uri: `${
                    firstPageObject?.pageImage?.includes("http") ||
                    firstPageObject?.pageImage?.includes("file:")
                      ? ""
                      : LOAD_FILE
                  }${firstPageObject?.pageImage}`,
                }}
                height={
                  customizedBook?.voiceUrl && !isControllerHide
                    ? windowHeight - 130
                    : windowHeight
                }
                width={windowWidth - 100}
                style={{
                  height:
                    customizedBook?.voiceUrl && !isControllerHide
                      ? windowHeight - 130
                      : windowHeight,
                  width: windowWidth - 100,
                  resizeMode: "contain",
                  zIndex: 1,
                }}
              />
            </SpaceAround>
          </View>
          <SpaceStyle top={-60}>
            <TouchableOpacity
              style={{ zIndex: 50 }}
              onPress={() => {
                setIsControllerHide(!isControllerHide);
              }}
            >
              <View
                style={{
                  backgroundColor: colors.card,
                  width: 150,
                  alignSelf: "flex-end",
                  justifyContent: "center",
                  padding: 5,
                  borderRadius: border,
                  alignContent: "center",
                  flexDirection: "row",
                }}
              >
                <CustomText right={10} style={{ alignSelf: "center" }}>
                  {isControllerHide ? "نمایش کنترل" : "تمام صفحه"}
                </CustomText>
                {isControllerHide && (
                  <Row>
                    <TouchableOpacity onPress={() => setPlayerAction("play")}>
                      <Image
                        style={{ width: 30, marginRight: 8, height: 30 }}
                        source={require("../../../assets/icons/play_e.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPlayerAction("pause")}>
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require("../../../assets/icons/pose_e.png")}
                      />
                    </TouchableOpacity>
                  </Row>
                )}
              </View>
            </TouchableOpacity>
          </SpaceStyle>
          {customizedBook?.voiceUrl && book?._id && (
            <View
              style={{
                width: isControllerHide ? 0 : windowWidth,
                height: isControllerHide ? 0 : 95,
                marginTop: 30,
              }}
            >
              <SpaceStyle top={5}>
                <VoicePlayer
                  stopEv={stopEv}
                  navigation={navigation}
                  item={{ audioFile: LOAD_FILE + customizedBook?.voiceUrl }}
                  book={book}
                  forceValue={forceValue}
                  onDrag={onDrag}
                  playerAction={playerAction}
                  onSecondProssessListener={(e) => {
                    let second = (e / 1000).toFixed(0);
                    pageRule(second);
                  }}
                  hasBackAction={true}
                  hasNextAction={true}
                  onBackAction={() => changePage(false)}
                  onNextAction={() => changePage(true)}
                />
              </SpaceStyle>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
export default CustomizeBookReader;
