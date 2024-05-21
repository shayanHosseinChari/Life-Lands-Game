import { StyleSheet, View } from "react-native";
import CategoryItem from "../home/CategoryItem";
import {
  CenterStyled,
  Row,
  SpaceAround,
  SpaceBetween,
} from "../../style/uiUtil";
import WGamesMenuItemComponent from "./WGamesMenuItemComponent";

export const WGamesTopMenu = ({ navigation }) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: "#191a1e",
      paddingBottom: 15,
    },
  });
  return (
    <View style={style.container}>
      <CenterStyled>
        <Row>
          <WGamesMenuItemComponent
            darkIcon={require("../../../assets/icons/wgames/user.png")}
            lightIcon={require("../../../assets/icons/wgames/user.png")}
            title={"کاربران آنلاین"}
            target="Online Users"
          />
          <WGamesMenuItemComponent
            darkIcon={require("../../../assets/icons/wgames/logic-data-types.png")}
            lightIcon={require("../../../assets/icons/wgames/logic-data-types.png")}
            title={"رقابت"}
            target="Tournament Page"
          />
          <WGamesMenuItemComponent
            darkIcon={require("../../../assets/icons/wgames/leaderboard.png")}
            lightIcon={require("../../../assets/icons/wgames/leaderboard.png")}
            title={"لیدربرد"}
            target="Leaderboard Page"
          />
          <WGamesMenuItemComponent
            darkIcon={require("../../../assets/icons/wgames/saw-blade.png")}
            lightIcon={require("../../../assets/icons/wgames/saw-blade.png")}
            title={"wSpin"}
            target="Online Users"
          />
        </Row>
      </CenterStyled>
      <CenterStyled>
        <Row>
          <WGamesMenuItemComponent
            darkIcon={require("../../../assets/icons/wgames/shopping.png")}
            lightIcon={require("../../../assets/icons/wgames/shopping.png")}
            title={"wStores"}
            target="Online Users"
          />
          <WGamesMenuItemComponent
            darkIcon={require("../../../assets/icons/wgames/inventory.png")}
            lightIcon={require("../../../assets/icons/wgames/inventory.png")}
            title={"wInventory"}
            target="Online Users"
          />
          <WGamesMenuItemComponent
            darkIcon={require("../../../assets/icons/wgames/win.png")}
            lightIcon={require("../../../assets/icons/wgames/win.png")}
            title={"wAwards"}
            target="Online Users"
          />
          <WGamesMenuItemComponent
            darkIcon={require("../../../assets/icons/wgames/quote.png")}
            lightIcon={require("../../../assets/icons/wgames/quote.png")}
            title={"Comments"}
            target="Comments Page"
          />
        </Row>
      </CenterStyled>
    </View>
  );
};
export default WGamesTopMenu;
