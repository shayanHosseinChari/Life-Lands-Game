import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import { Row } from "../../style/uiUtil";
import CustomText from "../text/CustomText";

const TabItem = ({ darkIcon, lightIcon, text, isSelected, width, onClick }) => {
  const { colors } = useTheme();
  const style = StyleSheet.create({
    container: {
      backgroundColor: isSelected ? colors.primary : colors.card,
      borderRadius: 20,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width,
    },
    icon: {
      width: 30,
      height: 30,
      padding: 10,
    },
    text: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      padding: 10,
    },
  });
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onClick}>
        <Row>
          <CustomText style={style.text}>{text}</CustomText>
          <Icon style={style.icon} dark={darkIcon} light={lightIcon} />
        </Row>
      </TouchableOpacity>
    </View>
  );
};
export default TabItem;
