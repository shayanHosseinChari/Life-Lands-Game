import { View } from "react-native";
import SpaceStyle from "../../style/SpaceStyle";
import { CenterStyled, Row, SpaceAround } from "../../style/uiUtil";
import CustomImage from "../CustomImage/CustomImage";
import CustomText from "../text/CustomText";
import ChampienItemComponent from "./ChampienItemComponent";
import CopyRightComponent from "./CopyRightComponent";

const TopPlayerComponent = ({ topUsers }) => {
  return (
    <CenterStyled>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <SpaceAround minus={50}>
          {topUsers?.length >= 2 && (
            <ChampienItemComponent
              chmpImage={require("../../../assets/icons/num2.png")}
              usersScore={topUsers[1]}
              number="two"
            />
          )}
          {topUsers?.length >= 1 && (
            <ChampienItemComponent
              chmpImage={require("../../../assets/icons/num1.png")}
              number="one"
              usersScore={topUsers[0]}
            />
          )}
          {topUsers?.length >= 3 && (
            <ChampienItemComponent
              chmpImage={require("../../../assets/icons/num3.png")}
              usersScore={topUsers[2]}
              number="three"
            />
          )}
        </SpaceAround>
      </View>
    </CenterStyled>
  );
};
export default TopPlayerComponent;
