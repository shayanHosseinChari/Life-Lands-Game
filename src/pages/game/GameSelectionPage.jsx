import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SpaceBetween } from "../../style/uiUtil";
import CustomText from "../../components/text/CustomText";
import CustomImage from "../../components/CustomImage/CustomImage";
import { useTheme } from "@react-navigation/native";
import { getAllGamesService } from "../../service/PostService";
import CustomButton from "../../components/CustomButton/CustomButton";
import { OpenToast } from "../../components/share/OpenToast";
import HeaderComponent from "../../components/layout/HeaderComponent";

const GameSelectionPage = ({ navigation }) => {
  const width = Dimensions.get("window").width;
  const [games, setGames] = useState([]);
  const [singleGame, setSingleGame] = useState({});
  const { colors } = useTheme();
  const style = StyleSheet.create({
    gameView: {
      width: width / 2.1,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(250,250,250,0.4)",
      alignSelf: "center",
      margin: 5,
      borderRadius: 10,
      padding: 10,
    },
    gameViewActive: {
      width: width / 2.1,
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
  useEffect(() => {
    getGames();
  }, []);
  const getGames = async () => {
    const {
      data: { data: res },
    } = await getAllGamesService();
    setGames(res);
  };
  const onSelectGame = () => {
    if (!singleGame?._id) {
      OpenToast("خطا رخ داد", "لطفا بازی را انتخاب کنید", "error");
      return;
    }
    navigation.navigate("Make Room Page", { gameId: singleGame?._id });
  };
  return (
    <View>
      <HeaderComponent hasBack={true} title={"انتخاب بازی"} />
      <CustomButton onClick={onSelectGame}>انتخاب</CustomButton>
      <ScrollView>
        <FlatList
            showsHorizontalScrollIndicator={false}

          numColumns={2}
          data={games}
          style={{ alignSelf: "center" }}
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
                    <CustomImage image={item.image} width={10} aspect={1 / 1} />
                  </View>
                </SpaceBetween>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};
export default GameSelectionPage;
