import { useContext, useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import { CenterStyled, Row } from "../../style/uiUtil";
import SpaceStyled from "../../style/SpaceStyle";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SocketContext } from "../../context/SocketContext";
import { yellowColor } from "../../appsetting/appsettingColor";
import { RootContext } from "../../context/RootContext";
import { getCompetitionService } from "../../service/Competition";
import { Icon } from "../../appsetting/icons";
const EndTournamentPage = ({
  route: {
    params: { id },
  },
  navigation,
}) => {
  const [competition, setCompetition] = useState({});
  const { user } = useContext(RootContext);
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  const style = StyleSheet.create({
    profileImage: {
      borderRadius: 100,
      borderColor: colors.primary,
      borderWidth: 3,
      marginHorizontal: 10,
      width: 90,
      height: 90,
    },
    fullNameStyle: {
      alignSelf: "center",
      justifyContent: "center",
      color: "#f7fbf7",
      marginTop: 10,
      alignContent: "center",
      alignSelf: "center",
    },
    yellowText: {
      color: "#fff000",
      alignSelf: "center",
      shadowColor: "#fff000",
      shadowOffset: {
        width: 0,
        height: 18,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20.0,
      elevation: 24,
      fontSize: 7,
      marginTop: 5,
    },
    greenCircle: {
      backgroundColor: "#00b034",
      borderColor: "white",
      width: 80,
      height: 80,
      borderWidth: 3,
      borderRadius: 500,
      alignSelf: "center",
      justifyContent: "center",
      alignContent: "center",
      marginHorizontal: 20,
      marginVertical: -5,
    },
    redCircle: {
      backgroundColor: "#c02323",
      borderColor: "white",
      width: 80,
      height: 80,
      borderWidth: 3,
      borderRadius: 500,
      alignSelf: "center",
      justifyContent: "center",
      alignContent: "center",
      marginHorizontal: 20,
      marginVertical: -5,
    },
    winCount: {
      alignSelf: "center",
      justifyContent: "center",
      alignContent: "center",
      fontSize: 30,
      color: "white",
    },
    winText: {
      alignSelf: "center",
      justifyContent: "center",
      alignContent: "center",
      fontSize: 10,
      marginTop: -10,
      color: "white",
    },
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const {
      data: { data: res },
    } = await getCompetitionService(id);
    setCompetition(res);
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    setCompetition({});
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }, { name: "Online Users" }],
    });
  };
  return (
    <View>
      <CustomImage
        image={require("../../../assets/start-tournament-bg.png")}
        isBackground={true}
        isLocalAsset={true}
        height={height}
        width={1}
      >
        <CustomImage
          image={competition?.gameId?.image}
          width={1}
          height={130}
          styles={{ resizeMode: "contain" }}
        />

        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            height: height - 250,
            width,
            alignItems: "center",
          }}
        >
          <Row>
            <View>
              <CustomImage
                image={competition?.winnerUserId?.profileImage}
                linkUserId={competition?.winnerUserId?._id}
                width={12}
                styles={style.profileImage}
                aspect={1 / 1}
                height={150}
              />
              <CustomText style={style.fullNameStyle}>
                {competition?.winnerUserId?.fullName}
              </CustomText>
              <CustomText style={style.yellowText}>برنده</CustomText>
            </View>
            <Image
              source={require("../../../assets/icons/vs.png")}
              width={90}
              style={{ width: 90, height: 90 }}
              height={90}
            />
            <View>
              <CustomImage
                image={competition?.losserUserId?.profileImage}
                linkUserId={competition?.losserUserId?._id}
                width={4}
                styles={style.profileImage}
                aspect={1 / 1}
                height={150}
              />
              <View>
                <CustomText style={style.fullNameStyle}>
                  {competition?.losserUserId?.fullName}
                </CustomText>
                <CustomText style={style.yellowText}>بازنده</CustomText>
              </View>
            </View>
          </Row>

          <SpaceStyled top={40}>
            <LinearGradient
              start={[0, 1]}
              end={[1, 0]}
              colors={["transparent", "#164626", "transparent"]}
            >
              <CenterStyled>
                <Row>
                  <View style={style.greenCircle}>
                    <CustomText style={style.winCount}>
                      {competition?.winnerScore}
                    </CustomText>
                    <CustomText style={style.winText}>Win Set</CustomText>
                  </View>
                  <View style={style.redCircle}>
                    <CustomText style={style.winCount}>
                      {competition?.losserScore}
                    </CustomText>
                    <CustomText style={style.winText}>Win Set</CustomText>
                  </View>
                </Row>
              </CenterStyled>
            </LinearGradient>
          </SpaceStyled>
          <SpaceStyled top={20} bottom={20}>
            <CenterStyled>
              <CustomText style={{ fontSize: 20 }} color={yellowColor}>
                {competition?.gameId?.title}
              </CustomText>
            </CenterStyled>
          </SpaceStyled>
          <View
            style={{
              alignSelf: "flex-end",
              position: "absolute",
              bottom: 0,
            }}
          >
            <SpaceStyled>
              <LinearGradient
                start={[0, 1]}
                end={[1, 0]}
                colors={[
                  "transparent",
                  competition?.winnerUserId?._id === user._id
                    ? "#00b034"
                    : "#c32222",
                  "transparent",
                ]}
              >
                <CenterStyled>
                  <View style={{ padding: 18 }}>
                    <CustomText
                      style={{
                        fontSize: 17,
                        color: "white",
                      }}
                    >
                      {competition?.winnerUserId?._id === user._id
                        ? "شما بردید!"
                        : "باختی"}
                    </CustomText>
                  </View>
                </CenterStyled>
              </LinearGradient>
            </SpaceStyled>
          </View>
        </View>
        <CenterStyled>
          <SpaceStyled top={10}>
            <TouchableOpacity
              onPress={() => {
                setCompetition({});
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }}
            >
              <Row>
                <CustomText fontSize={16}>بستن</CustomText>
                <Icon
                  dark={require("../../../assets/icons/close.png")}
                  light={require("../../../assets/icons/Light/backlight3.png")}
                  style={{
                    width: 15,
                    height: 15,
                    marginLeft: 10,
                    alignSelf: "center",
                  }}
                />
              </Row>
            </TouchableOpacity>
          </SpaceStyled>
        </CenterStyled>
      </CustomImage>
    </View>
  );
};
export default EndTournamentPage;
