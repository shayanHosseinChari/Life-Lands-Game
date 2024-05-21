import { useTheme } from "@react-navigation/native";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { border, postBorder } from "../../appsetting/styleSetting";
import SpaceStyle from "../../style/SpaceStyle";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import { Row, SpaceBetween } from "../../style/uiUtil";
import { LOAD_FILE } from "../../service/APIs";
import NavigateActionComponent from "./NavigateActionComponent";
import MiniGameComponent from "../wgames/MiniGameComponent";
import MainGamesComponent from "../wgames/MainGamesComponent";
import ConsoleGamesComponent from "../wgames/ConsoleGamesComponent";

const GamesComponent = ({
  games,
  navigation,
  title,
  consoleGames,
  mainGames,
  miniGames,
}) => {
  return (
    <>
      {title && (
        <SpaceBetween>
          <SpaceStyle left={20} top={13}>
            <NavigateActionComponent
              target={"WGame"}
              optons={{ hasBack: true }}
            >
              صفحه اصلی
            </NavigateActionComponent>
          </SpaceStyle>
          <SpaceStyle right={25} bottom={5}>
            <Image
              source={require("../../../assets/wgames.png")}
              style={{
                width: 70,
                height: 28,
                marginBottom: 10,
                alignSelf: "center",
              }}
            />
          </SpaceStyle>
        </SpaceBetween>
      )}

      <MiniGameComponent
        games={miniGames}
        navigation={navigation}
        isHorizontal={true}
      />
      <MainGamesComponent
        games={mainGames}
        navigation={navigation}
        isHorizontal={true}
      />
      <ConsoleGamesComponent
        games={consoleGames}
        navigation={navigation}
        isHorizontal={true}
      />
    </>
  );
};
export default GamesComponent;
