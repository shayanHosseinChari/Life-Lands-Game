import { View } from "react-native";
import SpaceStyle from "../../../style/SpaceStyle";
import { CenterStyled, Row } from "../../../style/uiUtil";
import CustomButton from "../../CustomButton/CustomButton";
import LeaderboardComponent from "./LeaderboardsComponent";
import TournamentComponent from "./TournamentComponent";

const TournamentAndLeaderboardsSwitchComponent = ({
  game,
  navigation,
  isLeaderboard,
  setIsLeaderboard,
}) => {
  return (
    <View>
      <View>
        <CenterStyled>
          <Row>
            <SpaceStyle right={10} left={10}>
              <CustomButton
                onClick={() => {
                  setIsLeaderboard(false);
                }}
                color={isLeaderboard ? "#11100F" : undefined}
              >
                Tournament
              </CustomButton>
            </SpaceStyle>
            <SpaceStyle left={10} right={10}>
              <CustomButton
                onClick={() => {
                  setIsLeaderboard(true);
                }}
                color={isLeaderboard ? undefined : "#11100F"}
              >
                Leaderboard
              </CustomButton>
            </SpaceStyle>
          </Row>
        </CenterStyled>
      </View>
      {isLeaderboard ? (
        <LeaderboardComponent game={game} />
      ) : (
        <TournamentComponent game={game} navigation={navigation} />
      )}
    </View>
  );
};
export default TournamentAndLeaderboardsSwitchComponent;
