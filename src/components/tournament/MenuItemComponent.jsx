import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../../appsetting/icons";
import { border } from "../../appsetting/styleSetting";
import CustomText from "../text/CustomText";

const MenuItemComponent = ({
  title,
  darkIcon,
  lightIcon,
  destination,
  width = 4.2,
}) => {
  const widthDimensions = Dimensions.get("screen").width;
  const style = StyleSheet.create({
    item: {
      backgroundColor: "#17181a",
      width: widthDimensions / width,
      aspectRatio: 1 / 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      borderRadius: border,
    },
    text: {
      color: "#585959",
      alignSelf: "center",
      fontSize: 8,
      marginTop: 5,
    },
  });
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(destination);
      }}
    >
      <View style={style.item}>
        <Icon
          dark={darkIcon}
          light={lightIcon}
          style={{ width: 20, height: 20 }}
        />
        <CustomText style={style.text}>{title}</CustomText>
      </View>
    </TouchableOpacity>
  );
};
export default MenuItemComponent;
