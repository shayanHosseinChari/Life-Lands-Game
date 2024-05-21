import { StatusBar, StyleSheet, View } from "react-native";
import { navbarColor } from "../../appsetting/appsettingColor";
import { CenterStyled, SpaceAround } from "../../style/uiUtil";
import { Icon } from "../../appsetting/icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavbarComponent = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <SpaceAround>
      <TouchableOpacity onPress={() => navigation.navigate("Category Page", { department: "game" })}>
        <Icon
          dark={require("../../../assets/icons/category-2.png")}
          light={"../../../assets/icons/category-2.png"}
          style={{ width: 24, height: 24 }}
        />
        </TouchableOpacity>
        <CenterStyled minus={200}>
          <Icon
            dark={require("../../../assets/lifelands-wgame-logo.png")}
            light={"../../../assets/lifelands-wgame-logo.png"}
            style={{ width: 157, height: 15, marginTop: 3 }}
          />
        </CenterStyled>
        <TouchableOpacity onPress={() => navigation.navigate("Search Page", "games")}>
          <Icon
            dark={require("../../../assets/icons/search-normal.png")}
            light={"../../../assets/icons/search-normal.png"}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </SpaceAround>
    </View>
  );
};
export default NavbarComponent;
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: navbarColor,
    // backgroundColor:"red",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    // height: ,
    width: "100%",
    borderBottomColor:'#5f5f5f',
    borderBottomWidth: 1
  },
});
