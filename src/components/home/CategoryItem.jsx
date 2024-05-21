import { useTheme } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { primaryColor } from "../../appsetting/appsettingColor";
import { Icon } from "../../appsetting/icons";
import { border } from "../../appsetting/styleSetting";
import { CenterStyled } from "../../style/uiUtil";
import CustomText from "../text/CustomText";

const CategoryItem = ({
  children,
  onPress,
  darkIcon,
  lightIcon,
  isActive = false,
  isCurrent,
  width = 5.2,
}) => {
  const { colors } = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const style = StyleSheet.create({
    container: {
      borderRadius: 0,
      width: windowWidth / width,
      // backgroundColor: isActive || isCurrent ? colors.primary : colors.card,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      textAlign: "center",
      paddingBottom: 5,
      aspectRatio: 1 / 1,
      borderBottomWidth: 2,
      borderBottomColor: isActive || isCurrent ? "#7590fa" : "#343434",
    },
    root: {
      color: "white",
      paddingTop: 10,
      paddingBottom: 5,
    },
  });
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.container}>
        <View style={style.root}>
          <Icon
            style={{ width: 30, height: 30 }}
            dark={darkIcon}
            light={lightIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CategoryItem;
