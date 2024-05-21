import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import { border } from "../../appsetting/styleSetting";
import { SpaceAround } from "../../style/uiUtil";
import CustomText from "../text/CustomText";
import MenuItemComponent from "./MenuItemComponent";

const TournamentMenuComponent = () => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: 10,
      borderRadius: border,
      marginHorizontal: 10,
    },
  });
  return (
    <View>
      <View style={style.container}>
        <SpaceAround minus={35}>
          <MenuItemComponent
            width={6}
            darkIcon={require("../../../assets/icons/online-users.png")}
            lightIcon={require("../../../assets/icons/Light/online-users.png")}
            title="کاربران آنلاین"
            destination={"Online Users"}
          />
          <MenuItemComponent
            width={6}
            darkIcon={require("../../../assets/icons/comment-icon.png")}
            lightIcon={require("../../../assets/icons/Light/comment-icon.png")}
            title="کامنت ها"
            destination={"Comments Page"}
          />
          <MenuItemComponent
            width={6}
            darkIcon={require("../../../assets/icons/cups.png")}
            lightIcon={require("../../../assets/icons/Light/cups.png")}
            title="جوایز"
            destination={"Awards Page"}
          />
          <MenuItemComponent
            width={6}
            darkIcon={require("../../../assets/icons/game-doing.png")}
            lightIcon={require("../../../assets/icons/Light/game-doing.png")}
            title="درخواست ها"
            destination={"Tournament History Page"}
          />
          <MenuItemComponent
            width={6}
            darkIcon={require("../../../assets/icons/door.png")}
            lightIcon={require("../../../assets/icons/Light/door.png")}
            title="اتاق ها"
            destination={"Rooms Page"}
          />
        </SpaceAround>
      </View>
    </View>
  );
};
export default TournamentMenuComponent;
