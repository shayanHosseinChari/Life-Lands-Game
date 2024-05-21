import { Fragment, useContext, useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator

} from "react-native";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import { CenterStyled, Row } from "../../style/uiUtil";
import SpaceStyled from "../../style/SpaceStyle";
import { LOAD_FILE, profileAPI } from "../../service/APIs";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SocketContext } from "../../context/SocketContext";
import { yellowColor } from "../../appsetting/appsettingColor";
import { RootContext } from "../../context/RootContext";
import SocketContextProvider from "../../context/SoketContextProvider";
import RootContextProvider from "../../context/RootContextProvider";
import { getProfileService } from "../../service/UserService";
import axios from "axios";
import { getValueFor } from "../../appsetting/storeConfig";
// import { socket } from "../../context/SoketContextProvider";
import CustomButton from "../../components/CustomButton/CustomButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import { io } from "socket.io-client";

const StartTournamentPage = ({route: {
params: { sender, reciever, game, item, roomInfo },
  },
  navigation,
}) => {
  // const DeviceInfo = NativeModules.DeviceInfo;
  const [clients, setClients] = useState([]);
  const [chalangeSender, setChalangeSender] = useState({});
  const [user, setUser] = useState({});
  let socket = io("https://lifelands.ir/", {
    reconnection: true
,
    extraHeaders: {
      token: `${getValueFor()}`,
    },
    query: {
      flag: "Home Web Site Page",
    },
    autoConnect: true,
  });
  const [isLoading,setIsLoading] = useState(false)
  // console.log(roomInfo);
  const getProfile = async () => {
    setIsLoading(true)

    await axios
      .get(profileAPI, {
        headers: {
          token: getValueFor(),
        },
      })
      .then((response) => {
        setIsLoading(false)
        console.log(response.data);
        setUser(response.data.data);
      });
      setIsLoading(false)
  };

  // useEffect(()=>{
  //   socket?.on('')
  // },[])
  useEffect(() => {
    getProfile();
  }, []);

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

  const { lastRoom,setLastRoom } = useContext(SocketContext);
  setLastRoom(roomInfo)
  // const {user} = useContext(SocketContextProvider)
  // console.log(user)

  const [status, setStatus] = useState("waiting");

  const startMultiRoomFunc = 
   () => {
    console.log('alan shorosh mikonam')
    
     socket.emit("startMultiRoom", {
      lastRoom: roomInfo,
    });
    socket.on("multiPlayerUrl", 
     (data) => {
      navigation.navigate("Luncher", { url: data.url });
    });
  };
  useEffect(() => {
    
  }, []);
  // console.log(roomInfo)
  
  // useEffect(() => {
  //   if (competition?.status === "accepted") {
  //     setTimeout(() => {
  //       navigation.navigate("Sample Game", {
  //         userId:
  //           reciever?.userId === user._id ? sender?.userId : reciever?.userId,
  //       });
  //     }, 1000);
  //   }
  // }, [competition]);
  // useEffect(() => {
  //   console.log("///////////////////////////////////");
  //   if (competition?.competitionId) {
  //     console.log("***");
  //     console.log(competition);
  //     console.log(reciever);
  //     console.log(sender);
  //     console.log(competition?.reciever?.userId);
  //     console.log(reciever?.userId.toString());
  //     console.log(competition?.sender?.userId.toString());
  //     console.log(sender?.userId.toString());
  //     if (
  //       competition?.reciever?.userId?.toString() ==
  //         reciever?.userId.toString() &&
  //       competition?.sender?.userId.toString() == sender?.userId.toString()
  //     ) {
  //       setStatus(competition?.status);
  //       if (competition?.status === "accepted") {
  //         setTimeout(() => {
  //           navigation.navigate("Sample Game", {
  //             userId:
  //               reciever?.userId === user._id
  //                 ? sender?.userId
  //                 : reciever?.userId,
  //           });
  //         }, 2000);
  //       }
  //     } else {
  //       setStatus("waiting");
  //     }
  //   } else {
  //     console.log("///////");
  //     console.log(item);
  //     console.log(reciever);
  //     console.log(sender);
  //     console.log(item?.reciever?.userId?.toString());
  //     console.log(reciever?.userId.toString());
  //     console.log(item?.sender?.userId.toString());
  //     console.log(sender?.userId.toString());
  //     if (
  //       item?.reciever?.userId?.toString() == reciever?.userId.toString() &&
  //       item?.sender?.userId.toString() == sender?.userId.toString()
  //     ) {
  //       setStatus(item?.status);
  //       if (item?.status === "accepted") {
  //         setTimeout(() => {
  //           navigation.navigate("Sample Game", {
  //             userId:
  //               reciever?.userId === user._id
  //                 ? sender?.userId
  //                 : reciever?.userId,
  //           });
  //         }, 2000);
  //       }
  //     } else {
  //       setStatus("waiting");
  //     }
  //   }

  //   // if (
  //   //   item?.reciever?.userId === receiver?.userId &&
  //   //   item?.sender?.userrId === sender?.userId
  //   // ) {
  //   //   if (item?.status) setStatus(item?.status);

  //   // }
  // }, [item, competition]);

  // useEffect(() => {
  //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       "hardwareBackPress",
  //       handleBackButtonClick
  //     );
  //   };
  // }, []);
  // const handleBackButtonClick = () => {
  //   setStatus("waiting");
  //   setCompetition({});

  //   // navigation.goBack();
  // };
  return (
   <>
   {
    isLoading?<View style={{flex:1,justifyContent:'center',alignItems:"center",width: Dimensions.get('window').width,height: Dimensions.get('window').height}}>
        <ActivityIndicator color={'white'} size={RFPercentage(3)} />
    </View>: <View>
    <CustomImage
      image={require("../../../assets/start-tournament-bg.png")}
      isBackground={true}
      isLocalAsset={true}
      height={height}
      width={1}
    >
      <CustomImage
        image={roomInfo.game.image}
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
              image={roomInfo.creator.profile}
              width={12}
              styles={style.profileImage}
              aspect={1 / 1}
              height={150}
            />
            <CustomText style={style.fullNameStyle}>
              {roomInfo.creator.fullName}
            </CustomText>
            <CustomText style={style.yellowText}>درخواست کننده</CustomText>
          </View>
          <Image
            source={require("../../../assets/icons/vs.png")}
            width={90}
            style={{ width: 90, height: 90 }}
            height={90}
          />
          <View>
            <CustomImage
              image={roomInfo.usersReceivers[0]?.profile}
              width={4}
              styles={style.profileImage}
              aspect={1 / 1}
              height={150}
            />
            <View>
              <CustomText style={style.fullNameStyle}>
                {roomInfo.usersReceivers[0]?.fullName}
              </CustomText>
              <CustomText style={style.yellowText}>دریافتی</CustomText>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              {roomInfo.usersReceivers.length >= 3 ? (
                <CustomText textAlign={"center"}>
                  و {roomInfo.usersReceivers?.length - 2} نفر دیگر
                </CustomText>
              ) : null}
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
                    {roomInfo.creator?.winCount}
                  </CustomText>
                  <CustomText style={style.winText}>Win</CustomText>
                </View>
                <View style={style.greenCircle}>
                  <CustomText style={style.winCount}>
                    {roomInfo.usersReceivers[0]?.winCount}
                  </CustomText>
                  <CustomText style={style.winText}>Win</CustomText>
                </View>
              </Row>
            </CenterStyled>
          </LinearGradient>
        </SpaceStyled>
        <SpaceStyled top={20} bottom={20}>
          <CenterStyled>
            <CustomText style={{ fontSize: 20 }} color={yellowColor}>
              {roomInfo.game?.title}
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
                status === "accepted" ? "#00b034" : "#c32222",
                "transparent",
              ]}
            >
              <CenterStyled>
                <View style={{ padding: 18 }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (status === "accepted") {
                        navigation.navigate("Sample Game", {
                          userId:
                            roomInfo.usersReceivers[0]?.userId === user._id
                              ? roomInfo.creator?.userId
                              : roomInfo.usersReceivers[0]?.userId,
                        });
                      }
                    }}
                  >
                    <CustomText
                      style={{
                        fontSize: 17,
                        color: "white",
                      }}
                    >
                      {status === "waiting"
                        ? "در انتظار پذیرش"
                        : status === "accepted"
                        ? "قبول کرد الان بازی شروع میشه"
                        : "رد کرد:("}
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </CenterStyled>
              {roomInfo.creator.userId == user._id ? (
                <TouchableOpacity
                  onPress={startMultiRoomFunc}
                  // disabled={lastRoom.waitingUsers?.length !== 0}
                  styles={{
                    position: "absolute",
                    bottom: 0,
                    backgroundColor:"#d400ff"
                  }}
                >
                  <Text style={{color:"white",fontFamily:"vazir"}}>
                  شروع بازی 
                  </Text>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
            </LinearGradient>
          </SpaceStyled>
        </View>
      </View>
    </CustomImage>
  </View>
   }
   </>
  );
};
export default StartTournamentPage;
