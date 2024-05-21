import GamesComponent from "../GamesComponent";
import { SpecialView } from "react-native-scroll-to-element";

const GameHomeRoot = ({
  navigation,
  miniGames,
  mainGames,
  consoleGames,
  gameRef,
}) => {
  return (
    <GamesComponent
      navigation={navigation}
      miniGames={miniGames}
      mainGames={mainGames}
      consoleGames={consoleGames}
      title={"wGames"}
    />
  );
};
export default GameHomeRoot;
