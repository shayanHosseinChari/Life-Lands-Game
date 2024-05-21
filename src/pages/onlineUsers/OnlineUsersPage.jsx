import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomCard from "../../components/CustomCard/CustomCard";
import CustomImage from "../../components/CustomImage/CustomImage";
import CustomText from "../../components/text/CustomText";
import { SocketContext } from "../../context/SocketContext";
import { Row, SpaceBetween } from "../../style/uiUtil";
import SpaceStyle from "../../style/SpaceStyle";
import { Icon } from "../../appsetting/icons";
import HeaderComponent from "../../components/layout/HeaderComponent";
import { useTheme } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { border } from "../../appsetting/styleSetting";
import { BottomSheet } from "react-native-btr";
import { getGameAPI } from "../../service/APIs";
import {
  getAllGamesService,
  getGameAPIService,
} from "../../service/PostService";
import CustomInput from "../../components/CustomInput/CustomInput";
import { RootContext } from "../../context/RootContext";
import SampleGame from "../SampleGame";
import { OpenToast } from "../../components/share/OpenToast";
import OnlineUsersListComponent from "../../components/onlineUser/OnlineUsersListComponent";

const OnlineUsersPage = ({ navigation }) => {
  const { users, addChallenge, setCompetition } = useContext(SocketContext);
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  const { colors } = useTheme();
  const [setNumber, setSetNumber] = useState();
  const style = StyleSheet.create({
    center: {
      alignSelf: "center",
    },
    top: {
      alignSelf: "flex-start",
    },
    boldText: {
      fontSize: 12,
    },
    simpleText: {
      fontSize: 8,
      color: colors.lightTextColor,
      alignSelf: "flex-end",
    },
    challangeBtn: {
      backgroundColor: "#2e2226",
      borderWidth: 2,
      borderColor: "#753a3c",
      borderRadius: border,
      justifyContent: "center",
      alignSelf: "center",
      alignContent: "center",
      paddingHorizontal: 10,
      height: 40,
    },
    gameView: {
      width: width / 2.4,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(250,250,250,0.4)",
      alignSelf: "center",
      margin: 5,
      borderRadius: 10,
      padding: 10,
    },
    gameViewActive: {
      width: width / 2.4,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(250,250,250,0.4)",
      alignSelf: "center",
      margin: 5,
      borderRadius: 10,
      padding: 10,
      backgroundColor: colors.primary,
    },
  });
  const [startTournamentVisible, setStartTournamentVisible] = useState(false);
  const [games, setGames] = useState([]);
  const [singleGame, setSingleGame] = useState({});
  const [singleUser, setSingleUser] = useState({});
  const { user } = useContext(RootContext);
  useEffect(() => {
    getGames();
  }, []);
  const getGames = async () => {
    const {
      data: { data: res },
    } = await getAllGamesService();
    setGames(res);
    console.log(users);
  };
  return (
    <View>
      <HeaderComponent
        hasBack={true}
        darkIcon={require("../../../assets/icons/onlineUserIcon.png")}
        lightIcon={require("../../../assets/icons/onlineUserIcon.png")}
        navigation={navigation}
        title="Users"
        rightSide={
          <TouchableOpacity
            onPress={() => navigation.navigate("Game Selection Page")}
          >
            <Icon
              dark={require("../../../assets/icons/game-icon.png")}
              light={require("../../../assets/icons/game-icon.png")}
              style={{
                width: 30,
                height: 30,
                marginLeft: 40,
                marginBottom: 5,
              }}
            />
          </TouchableOpacity>
        }
      />
      {/* <CustomButton onClick={() => navigation.navigate("Game Selection Page")}>
        ساخت اتاق بازی
      </CustomButton> */}
      <ScrollView>
        <SpaceStyle bottom={100}>
          <OnlineUsersListComponent
            onPress={(item) => {
              setSingleUser(item);
              setStartTournamentVisible(true);
            }}
            // activeUsers={users}
          />
        </SpaceStyle>
      </ScrollView>
      <BottomSheet
        onBackdropPress={() => setStartTournamentVisible(false)}
        onBackButtonPress={() => setStartTournamentVisible(false)}
        visible={startTournamentVisible}
      >
        <View>
          <View
            style={{
              maxHeight: height - 150,
              paddingTop: 20,
              backgroundColor: colors.background,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <SpaceStyle bottom={5}>
              <Row>
                <View style={{ alignSelf: "center" }}>
                  <CustomButton
                    onClick={() => {
                      if (!setNumber && setNumber <= 0) {
                        OpenToast(
                          "خطا رخ داد",
                          "لطفا تعداد ست ها را وارد کنید"
                        );
                        return;
                      }
                      if (!singleGame?._id) {
                        OpenToast("خطا رخ داد", "لطفا بازی را وارد کنید");
                        return;
                      }
                      setCompetition({});
                      addChallenge(
                        singleUser.userId,
                        setNumber,
                        singleGame._id
                      );

                      navigation.navigate("Start Tournament Page", {
                        sender: users.filter(
                          (usr) => usr.userId === user._id
                        )[0],
                        reciever: singleUser,
                        game: singleGame,
                      });
                    }}
                    width={width / 4}
                  >
                    ارسال درخواست
                  </CustomButton>
                </View>
                <View style={{ alignSelf: "center" }}>
                  <CustomInput
                    value={setNumber}
                    placeholder={"تعداد  ست ها را وارد کنید..."}
                    width={width / 2}
                    style={{ alignSelf: "center" }}
                    keyboardType="numeric"
                    onChangeText={(text) => setSetNumber(Number(text))}
                    maxLength={1}
                  />
                </View>
              </Row>
            </SpaceStyle>
            <ScrollView>
              <FlatList
                  showsHorizontalScrollIndicator={false}

                numColumns={2}
                data={games}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSingleGame(item);
                    }}
                  >
                    <View
                      style={
                        item._id === singleGame._id
                          ? style.gameViewActive
                          : style.gameView
                      }
                    >
                      <SpaceBetween>
                        <View
                          style={{
                            justifyContent: "center",
                          }}
                        >
                          <CustomText width={4}>{item.title}</CustomText>
                        </View>
                        <View>
                          <CustomImage
                            image={item.image}
                            width={10}
                            aspect={1 / 1}
                          />
                        </View>
                      </SpaceBetween>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};
export default OnlineUsersPage;
