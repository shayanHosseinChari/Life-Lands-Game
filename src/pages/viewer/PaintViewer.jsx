import { useEffect, useState } from "react";
import PageWrapper from "../../components/loading/PageWrapper";
import { paintService } from "../../service/paintService";
import CustomImage from "../../components/CustomImage/CustomImage";
import * as ScreenOrientation from "expo-screen-orientation";
import { BackHandler, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CenterStyled, Row } from "../../style/uiUtil";
import CustomText from "../../components/text/CustomText";
import SpaceStyle from "../../style/SpaceStyle";
import VoicePlayer from "./VoicePlayer";
import { LOAD_FILE } from "../../service/APIs";
import { border } from "../../appsetting/styleSetting";

const PaintViewer = ({ route, navigation }) => {
  const [forceValue, setForceValue] = useState();
  const [stopEv, setStopEv] = useState();
  const [isExpande, setIsExpande] = useState(false);

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    controllerContainer: {
      backgroundColor: colors.card,
      height: "20%",
    },
    justifyCenter: {
      justifyContent: "center",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [paint, setPaint] = useState();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      changeStopEvState
    );

    return () => {
      changeStopEvState().then(() => {
        backHandler.remove();
      });
    };
  }, []);
  const changeStopEvState = () => {
    setDataBeforBack().then(() => {
      setStopEv(Date.now());
    });
  };
  // useEffect(() => {
  //   return () => {
  //     setDataBeforBack();
  //   };
  // }, []);
  const setDataBeforBack = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };
  useEffect(() => {
    getData();
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }, []);

  const getData = async () => {
    const {
      data: { data: response },
    } = await paintService(route?.params?.id);
    setPaint(response);
    setIsLoading(false);
  };
  return (
    <PageWrapper isLoadingState={isLoading}>
      <View
        style={{
          backgroundColor: "#0000006f",
          position: "absolute",
          bottom: 72,
          left: 0,
          right: 0,
          borderTopRightRadius: border,
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <CustomText
          right={30}
          top={10}
          styles={{
            backgroundColor: "#0000002f",
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          {paint?.userId?.firstName} {paint?.userId?.lastName} ( سن {paint?.age}
          )
        </CustomText>
        <View>
          <CustomText
            lines={isExpande ? 1000 : 2}
            width={1.1}
            selfCenter
            textAlign={"center"}
            bottom={10}
            styles={{
              backgroundColor: "#0000002f",
            }}
          >
            {paint?.description}
          </CustomText>
        </View>
        {paint?.description?.length > 200 && (
          <CustomText onClick={() => setIsExpande(!isExpande)}>
            {isExpande ? "نمایش کمتر" : "نمایش بیشتر"}
          </CustomText>
        )}
      </View>
      <View style={{ backgroundColor: "#fff" }}>
        <TouchableOpacity
          onPress={() => {
            changeStopEvState();
            setTimeout(() => {
              navigation.goBack();
            }, 1000);
          }}
          style={{
            backgroundColor: colors.primary,
            position: "absolute",
            top: 30,
            left: 0,
            borderTopRightRadius: border,
            borderBottomRightRadius: border,
            paddingHorizontal: 10,
            zIndex: 100,
            paddingVertical: 5,
          }}
        >
          <CustomText>بازگشت</CustomText>
        </TouchableOpacity>

        <CustomImage
          width={1}
          radius={0}
          height={"80%"}
          styles={{
            resizeMode: "contain",
          }}
          image={paint?.image}
        />
        <View style={styles.controllerContainer}>
          <View>
            <Row>
              <View style={styles.justifyCenter}>
                <SpaceStyle right={10}>
                  <CustomText>{paint?.title}</CustomText>
                  <CustomText color={colors.lightTextColor} fontSize={7}>
                    {paint?.createdAt}
                  </CustomText>
                </SpaceStyle>
              </View>
              <View>
                <CustomImage
                  aspect={1 / 1}
                  image={paint?.userId?.profileImage}
                  // linkUserId={paint?.userId?._id}
                  // onClick={async () => {
                  //   await ScreenOrientation.lockAsync(
                  //     ScreenOrientation.OrientationLock.PORTRAIT_UP
                  //   );
                  // }}
                  width={1}
                  height={40}
                  radius={100}
                />
                <CustomText color={colors.darkGreen} fontSize={7}>
                  {paint?.userId?.userName}
                </CustomText>
              </View>
            </Row>
          </View>
          <View style={{ marginTop: -50 }}>
            {paint?.voice && (
              <CenterStyled>
                <VoicePlayer
                  dynamicWidth={undefined}
                  hasBackAction={false}
                  stopEv={stopEv}
                  hasNextAction={false}
                  item={{ audioFile: LOAD_FILE + paint?.voice }}
                  forceValue={forceValue}
                  onSecondProssessListener={(e) => {
                    console.log(e);
                  }}
                />
              </CenterStyled>
            )}
          </View>
        </View>
      </View>
    </PageWrapper>
  );
};
export default PaintViewer;
