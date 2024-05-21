import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import PageWrapper from "../../components/loading/PageWrapper";
import { useContext, useEffect, useState } from "react";
import { getUserScoresService } from "../../service/UserScore";
import UsersScoresComponent from "../../components/tournament/UsersScoresComponent";
import CustomText from "../../components/text/CustomText";
import HeaderComponent from "../../components/layout/HeaderComponent";
import UserScoreItemComponent from "../../components/tournament/UserScoreItemComponent";
import { CenterStyled } from "../../style/uiUtil";
import GameFilterComponent from "../../components/tournament/GameFilterComponent";
import CustomInput from "../../components/CustomInput/CustomInput";
import SpaceStyle from "../../style/SpaceStyle";
import TopPlayerComponent from "../../components/tournament/TopPlayerComponent";
import { useTheme } from "@react-navigation/native";
import { Icon } from "../../appsetting/icons";
import { RootContext } from "../../context/RootContext";
import LeaderProfile from "../../components/LeaderProfile/LeaderProfile";
import NavbarSh from "../../components/NavbarComponent";
import GoBack from "../../components/GoBack";
import { StatusBar } from "expo-status-bar";

const LeaderboardPage = ({ navigation }) => {
  const { colors } = useTheme();
  const width = Dimensions.get("screen").width;
  const [isLoading, setIsLoading] = useState(true);
  const [gameId, setGameId] = useState();
  const [topDownloadGames, setTopDownloadGames] = useState([]);
  const {user} = useContext(RootContext)
  console.log('leaders context: ',user)
  const [topDownloadGamesShow, setTopDownloadGamesShow] = useState([]);
  const [usersScores, setUsersScores] = useState([]);
  const [yourScore, setYourScore] = useState({});
  const [topUsers, setTopUsers] = useState([]);
  const [isFinishPages, setIsFinishPages] = useState(false);
  const [usersScoresFilter, setUsersScoresFilter] = useState({
    pageId: 1,
    eachPerPage: 15,
    gameId,
  });
  useEffect(() => {
    getData();
  }, [usersScoresFilter]);

  useEffect(() => {
    setTopDownloadGamesShow(topDownloadGames)
  }, [topDownloadGames]);

  useEffect(() => {
    setUsersScoresFilter({ ...usersScoresFilter, ...{ gameId, pageId: 1 } });
  }, [gameId]);
  const getData = async () => {
    if (usersScoresFilter.pageId === 1) setUsersScores([]);
    try {
      const {
        data: { data: res },
      } = await getUserScoresService(usersScoresFilter);

      if (usersScoresFilter.pageId == 1) {
        setUsersScores(res?.usersScores);
        setYourScore(res?.yourScore);
        setIsFinishPages(false);
      } else {
        let mergeLists = res.usersScores.concat(usersScores);
        setIsFinishPages(res?.usersScores?.length === 0);
        setUsersScores(mergeLists);
      }
      setTopUsers(res?.topUser);
      setTopDownloadGames([
        ...[
          {
            title: "LifeLands",
          },
        ],
        ...res.topGames,
      ]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View isLoadingState={isLoading} style={{paddingTop: 30,paddingBottom:60}}>
      <StatusBar backgroundColor="black" hidden={false} />
      <NavbarSh rightChile={<View style={{flexDirection:"row"}}>
        <Text style={{color:"white",fontFamily:"vazir",marginHorizontal:4}}>تابلو  رهبران</Text>
        <GoBack />
      </View>} />
      <ScrollView style={{height: Dimensions.get('window').height}}>
        <GameFilterComponent
          gameId={gameId}
          games={topDownloadGames}
          setGameId={setGameId}
          setTopDownloadGamesShow={setTopDownloadGamesShow}
          topDownloadGamesShow={topDownloadGamesShow}
        />
        <SpaceStyle top={1} bottom={10}>
          <TopPlayerComponent topUsers={topUsers} />
        </SpaceStyle>
        {usersScores.length > 0 && (
          <SpaceStyle right={10} left={10} styles={{ overflow: "hidden" }}>
            <LeaderProfile
              selfMode={true}
              item={user}
              index={0}
              profile={user}
              customWidth={width - 20}
              imageSize={6}
            />
          </SpaceStyle>
        )}
        <View>
          <SpaceStyle styles={{ flexDirection: "row", backgroundColor: '#252528', borderRadius: 10 }} right={10} left={10} top={10} bottom={10}>
            <CustomInput
              align="right"
              value={usersScoresFilter.searchValue}
              minWidth={width - 55}
              onChangeText={(value) => {
                setUsersScoresFilter({
                  ...usersScoresFilter,
                  ...{ searchValue: value, pageId: 1 },
                });
              }}
              placeholder={"جستجو ..."}
            />
            <Icon
              dark={require("../../../assets/icons/search.png")}
              light={require("../../../assets/icons/search.png")}
              style={{ width: 20, height: 20, marginVertical: 12 }}
            />
          </SpaceStyle>
          <UsersScoresComponent usersScores={usersScores} />
          {isFinishPages ? (
            <View>
              <CustomText style={{ alignSelf: "center" }}>
                تموم شد :(
              </CustomText>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setUsersScoresFilter({
                    ...usersScoresFilter,
                    ...{ pageId: usersScoresFilter.pageId + 1 },
                  });
                }}
              >
                <CustomText fontSize={14} style={{ alignSelf: "center", color: "#8878EF", marginVertical: 15 }}>
                  مشاهده افراد بیشتر
                </CustomText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default LeaderboardPage;
