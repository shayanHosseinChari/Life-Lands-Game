import React, { createRef, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { primaryColor } from "../../appsetting/appsettingColor";
import { border } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import { Row, SpaceBetween } from "../../style/uiUtil";
import CustomCard from "../CustomCard/CustomCard";
import CustomImage from "../CustomImage/CustomImage";
import LeaderboardComponent from "../posts/game/LeaderboardsComponent";
import CustomText from "../text/CustomText";
import GameFilterComponent from "../tournament/GameFilterComponent";
import CustomInput from "../CustomInput/CustomInput";
import UsersScoresComponent from "../tournament/UsersScoresComponent";
import { getUserScoresService } from "../../service/UserScore";

const HomePageLeaderboards = ({ navigation }) => {
  const [gameId, setGameId] = useState();
  const [topDownloadGames, setTopDownloadGames] = useState([]);
  const [usersScores, setUsersScores] = useState([]);
  const [usersScoresFilter, setUsersScoresFilter] = useState({
    pageId: 1,
    eachPerPage: 20,
    gameId,
  });
  useEffect(() => {
    getData();
  }, [usersScoresFilter]);
  useEffect(() => {
    setUsersScoresFilter({ ...usersScoresFilter, ...{ gameId, pageId: 1 } });
  }, [gameId]);
  const getData = async () => {
    if (usersScoresFilter.pageId === 1) setUsersScores([]);
    const {
      data: { data: res },
    } = await getUserScoresService(usersScoresFilter);

    setUsersScores(res?.usersScores);
    setTopDownloadGames([
      ...[
        {
          title: "LifeLands",
        },
      ],
      ...res.topGames,
    ]);
  };
  return (
    <View>
      <SpaceStyle right={20} left={20} top={30}>
        <SpaceBetween>
          <SpaceStyle top={10}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Leaderboard Page");
              }}
            >
              <CustomText>مشاهده همه</CustomText>
            </TouchableOpacity>
          </SpaceStyle>
          <Row>
            <CustomText style={{ marginRight: 10, marginBottom: 4 }}>
              لیدربرد
            </CustomText>
            <Image
              source={require("../../../assets/icons/leaderboard.png")}
              style={{ width: 30, height: 30 }}
            />
          </Row>
        </SpaceBetween>
      </SpaceStyle>

      <GameFilterComponent
        gameId={gameId}
        games={topDownloadGames}
        setGameId={setGameId}
      />
      <UsersScoresComponent usersScores={usersScores} />
    </View>
  );
};
export default HomePageLeaderboards;
