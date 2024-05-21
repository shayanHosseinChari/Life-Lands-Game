import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import CustomText from "../text/CustomText";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Row } from "../../style/uiUtil";
import { Dimensions } from "react-native";

const WGamesMenuItemComponent = ({ title, darkIcon, lightIcon, target }) => {
  const navigation = useNavigation();
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      borderRadius: 10,
      justifyContent: "center",
      alignSelf: "center",
      backgroundColor: colors.card,
      width: width / 4.7,
      marginTop: 10,
      marginHorizontal: 4,
      paddingVertical: 10,
    },
    icon: {
      width: 18,
      height: 18,
      marginRight: 7,
    },
    text: {
      alignItems: "center",
      alignSelf: "center",
      fontSize: 9,
    },
  });
  return (
    <TouchableOpacity onPress={() => navigation.navigate(target)}>
      <View>
        <View style={style.container}>
          <Row>
            <CustomText
              fontSize={7}
              color={colors.lightTextColor}
              right={5}
              style={style.text}
            >
              {title}
            </CustomText>
            <Icon dark={darkIcon} light={lightIcon} style={style.icon} />
          </Row>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default WGamesMenuItemComponent;
